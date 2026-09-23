import { db } from "./db.js";
import { t } from "./i18n.js";
import { currentPeriodKey, periodKeyForDate } from "./finance.js";

export const BUDGET_GROUPS = ["needs", "wants", "savings", "investments", "debts"];

// Group -> legacy 3-way bucket used by the dashboard's 50/30/20 view.
export const GROUP_TO_LEGACY_BUCKET = {
  needs: "needs", wants: "wants", savings: "savings", investments: "savings", debts: "needs"
};

// Every default line's key doubles as its expense-entry `category` value,
// and as its i18n key under `entry.categories.*`, so budgeted lines and
// logged expenses always speak the same language.
export const DEFAULT_BUDGET_LINES = {
  needs: ["rent", "electricity", "water", "groceries", "transportation", "school_fees", "insurance", "phone_internet", "healthcare"],
  wants: ["dining", "entertainment", "shopping", "travel", "subscriptions", "hobbies"],
  savings: ["emergency_fund", "general_savings"],
  investments: ["investment_contributions", "retirement", "real_estate", "stocks_etfs"],
  debts: ["credit_card", "student_loan", "car_loan", "personal_loan"]
};

function slugify(text) {
  return "custom_" + text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40) + "_" + Math.random().toString(36).slice(2, 6);
}

export function ensureDefaultBudgetLines(user) {
  const existing = db.where("budgetLines", (l) => l.user_id === user.id);
  if (existing.length) return existing;
  const rows = [];
  for (const group of BUDGET_GROUPS) {
    for (const key of DEFAULT_BUDGET_LINES[group]) {
      rows.push(
        db.insert("budgetLines", {
          user_id: user.id,
          group,
          key,
          is_custom: false,
          custom_label: null,
          planned_amount: 0
        })
      );
    }
  }
  return rows;
}

export function getBudgetLines(user) {
  return ensureDefaultBudgetLines(user).length
    ? db.where("budgetLines", (l) => l.user_id === user.id)
    : [];
}

export function budgetLineLabel(line) {
  return line.is_custom ? line.custom_label : t(`entry.categories.${line.key}`);
}

export function categoryDisplayLabel(user, key) {
  const line = db.where("budgetLines", (l) => l.user_id === user.id && l.key === key)[0];
  if (line) return budgetLineLabel(line);
  return t(`entry.categories.${key}`);
}

export function addCustomBudgetLine(user, group, label, plannedAmount) {
  return db.insert("budgetLines", {
    user_id: user.id,
    group,
    key: slugify(label),
    is_custom: true,
    custom_label: label,
    planned_amount: Number(plannedAmount) || 0
  });
}

export function updateBudgetLineAmount(lineId, amount) {
  return db.update("budgetLines", lineId, { planned_amount: Number(amount) || 0 });
}

export function removeBudgetLine(lineId) {
  db.remove("budgetLines", lineId);
}

export function legacyBucketForCategory(user, categoryKey) {
  const line = db.where("budgetLines", (l) => l.user_id === user.id && l.key === categoryKey)[0];
  if (line) return GROUP_TO_LEGACY_BUCKET[line.group] || "needs";
  return "needs";
}

export function actualSpendForLine(user, line, periodKey = currentPeriodKey(user)) {
  return db
    .where(
      "expenseEntries",
      (e) => e.user_id === user.id && e.category === line.key && periodKeyForDate(user, e.date) === periodKey
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);
}

export function budgetComparison(user, periodKey = currentPeriodKey(user)) {
  const lines = getBudgetLines(user);
  const byGroup = {};
  for (const group of BUDGET_GROUPS) {
    const groupLines = lines
      .filter((l) => l.group === group)
      .map((l) => {
        const planned = Number(l.planned_amount) || 0;
        const actual = actualSpendForLine(user, l, periodKey);
        return { line: l, label: budgetLineLabel(l), planned, actual, diff: planned - actual };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    const plannedTotal = groupLines.reduce((s, r) => s + r.planned, 0);
    const actualTotal = groupLines.reduce((s, r) => s + r.actual, 0);
    byGroup[group] = { lines: groupLines, plannedTotal, actualTotal };
  }
  const grandPlanned = BUDGET_GROUPS.reduce((s, g) => s + byGroup[g].plannedTotal, 0);
  const grandActual = BUDGET_GROUPS.reduce((s, g) => s + byGroup[g].actualTotal, 0);
  return { byGroup, grandPlanned, grandActual };
}

const ADVICE_OVERSPEND_THRESHOLD = 1.1;
const ADVICE_UNDERSPEND_THRESHOLD = 0.6;

export function generateAdvice(user, comparison) {
  const tips = [];

  for (const group of BUDGET_GROUPS) {
    const { lines, plannedTotal, actualTotal } = comparison.byGroup[group];
    if (plannedTotal <= 0) continue;
    const ratio = actualTotal / plannedTotal;
    if (ratio >= ADVICE_OVERSPEND_THRESHOLD) {
      tips.push({
        tone: "warn",
        text: t("budget.advice_group_over", { group: t(`budget.group_${group}`), pct: Math.round(ratio * 100) })
      });
    }
    const overLines = lines.filter((l) => l.planned > 0 && l.actual > l.planned * ADVICE_OVERSPEND_THRESHOLD);
    for (const l of overLines.slice(0, 2)) {
      tips.push({
        tone: "warn",
        text: t("budget.advice_line_over", { label: l.label, over: (l.actual - l.planned).toFixed(0) })
      });
    }
    const underLines = lines.filter((l) => l.planned > 0 && l.actual < l.planned * ADVICE_UNDERSPEND_THRESHOLD && l.actual > 0);
    for (const l of underLines.slice(0, 1)) {
      tips.push({ tone: "good", text: t("budget.advice_line_under", { label: l.label, under: (l.planned - l.actual).toFixed(0) }) });
    }
  }

  const investActual = comparison.byGroup.investments.actualTotal;
  const investPlanned = comparison.byGroup.investments.plannedTotal;
  if (investPlanned > 0 && investActual === 0) {
    tips.push({ tone: "warn", text: t("budget.advice_no_investment") });
  }

  const debtActual = comparison.byGroup.debts.actualTotal;
  if (debtActual > 0 && comparison.grandActual > 0 && debtActual / comparison.grandActual > 0.3) {
    tips.push({ tone: "warn", text: t("budget.advice_high_debt") });
  }

  if (comparison.grandPlanned > 0 && comparison.grandActual <= comparison.grandPlanned) {
    tips.push({ tone: "good", text: t("budget.advice_on_track") });
  }

  if (!tips.length) {
    tips.push({ tone: "good", text: t("budget.advice_none") });
  }

  return tips.slice(0, 6);
}
