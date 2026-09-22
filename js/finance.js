import { db } from "./db.js";
import { t } from "./i18n.js";

export const CATEGORY_BUCKETS = {
  rent: "needs", utilities: "needs", groceries: "needs", transportation: "needs",
  insurance: "needs", debt: "needs", healthcare: "needs", other_needs: "needs",
  dining: "wants", entertainment: "wants", shopping: "wants", travel: "wants",
  subscriptions: "wants", hobbies: "wants", other_wants: "wants",
  emergency_fund: "savings", investment: "savings", extra_debt: "savings", other_savings: "savings"
};

export const CATEGORIES_BY_BUCKET = {
  needs: ["rent", "utilities", "groceries", "transportation", "insurance", "debt", "healthcare", "other_needs"],
  wants: ["dining", "entertainment", "shopping", "travel", "subscriptions", "hobbies", "other_wants"],
  savings: ["emergency_fund", "investment", "extra_debt", "other_savings"]
};

export const INCOME_SOURCES = ["salary", "freelance", "bonus", "gift", "other_income"];

export const BUDGET_TARGETS = { needs: 0.5, wants: 0.3, savings: 0.2 };

export function todayLocal() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function daysInMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function dayOfMonth(date) {
  return new Date(date).getDate();
}

export function monthlyIncomeTotal(userId, key = monthKey(new Date())) {
  return db
    .where("incomeEntries", (e) => e.user_id === userId && monthKey(e.date) === key)
    .reduce((sum, e) => sum + Number(e.amount), 0);
}

export function monthlyExpensesByBucket(userId, key = monthKey(new Date())) {
  const entries = db.where("expenseEntries", (e) => e.user_id === userId && monthKey(e.date) === key);
  const totals = { needs: 0, wants: 0, savings: 0 };
  for (const e of entries) {
    const bucket = e.budget_bucket || CATEGORY_BUCKETS[e.category] || "needs";
    totals[bucket] += Number(e.amount);
  }
  return totals;
}

export function averageMonthlyExpenses(userId, monthsBack = 6) {
  const entries = db.where("expenseEntries", (e) => e.user_id === userId);
  if (!entries.length) return null;
  const byMonth = {};
  for (const e of entries) {
    const k = monthKey(e.date);
    byMonth[k] = (byMonth[k] || 0) + Number(e.amount);
  }
  const keys = Object.keys(byMonth).sort().slice(-monthsBack);
  if (!keys.length) return null;
  const total = keys.reduce((s, k) => s + byMonth[k], 0);
  return total / keys.length;
}

export function getEmergencyFund(userId) {
  let ef = db.where("emergencyFunds", (f) => f.user_id === userId)[0];
  if (!ef) {
    ef = db.insert("emergencyFunds", {
      user_id: userId,
      current_balance: 0,
      target_monthly_expense_figure: 0,
      target_multiple: 6,
      last_updated: new Date().toISOString()
    });
  }
  return ef;
}

export function emergencyFundTarget(ef) {
  return Number(ef.target_monthly_expense_figure || 0) * Number(ef.target_multiple || 6);
}

export function logEmergencyFundTransaction(userId, amount, type, note) {
  const ef = getEmergencyFund(userId);
  const delta = type === "withdrawal" ? -Math.abs(amount) : Math.abs(amount);
  const newBalance = Number(ef.current_balance) + delta;
  db.insert("emergencyFundTransactions", { emergency_fund_id: ef.id, amount: Math.abs(amount), type, date: new Date().toISOString(), note: note || null });
  db.update("emergencyFunds", ef.id, { current_balance: newBalance, last_updated: new Date().toISOString() });
  return getEmergencyFund(userId);
}

export function getHoldings(userId) {
  return db.where("investmentHoldings", (h) => h.user_id === userId);
}

export function portfolioSummary(userId) {
  const holdings = getHoldings(userId);
  const totalValue = holdings.reduce((s, h) => s + Number(h.current_value), 0);
  const totalCost = holdings.reduce((s, h) => s + Number(h.cost_basis), 0);
  const byType = {};
  for (const h of holdings) byType[h.type] = (byType[h.type] || 0) + Number(h.current_value);
  return { totalValue, totalCost, gainLoss: totalValue - totalCost, byType, count: holdings.length };
}

export function monthlyInvestmentContributions(userId, key = monthKey(new Date())) {
  return db
    .where("investmentContributions", (c) => c.user_id === userId && monthKey(c.date) === key)
    .reduce((sum, c) => sum + Number(c.amount), 0);
}

export function investmentTargetForMonth(user) {
  return Number(user.salary || 0) * 0.15;
}

const ALERT_DEDUPE_WINDOW_DAYS = 3;

function shouldSkipDuplicateAlert(userId, type, period) {
  const recent = db.where(
    "alerts",
    (a) => a.user_id === userId && a.type === type && a.trigger_data && a.trigger_data.period === period
  );
  if (!recent.length) return false;
  const cutoff = Date.now() - ALERT_DEDUPE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return recent.some((a) => new Date(a.created_at).getTime() > cutoff);
}

function createAlert(userId, type, message, suggested_action, period) {
  if (shouldSkipDuplicateAlert(userId, type, period)) return null;
  return db.insert("alerts", {
    user_id: userId,
    type,
    message,
    suggested_action,
    trigger_data: { period },
    channels_sent: ["inapp"],
    status: "unread"
  });
}

export function recomputeAlerts(user) {
  const userId = user.id;
  const now = new Date();
  const period = monthKey(now);
  const daysTotal = daysInMonth(now);
  const dayNow = dayOfMonth(now);
  const fractionElapsed = dayNow / daysTotal;
  const fractionRemaining = 1 - fractionElapsed;

  const income = monthlyIncomeTotal(userId, period) || Number(user.salary || 0);
  const spent = monthlyExpensesByBucket(userId, period);
  const oneOffTotalsByBucket = { needs: 0, wants: 0, savings: 0 };
  const oneOffEntries = db.where(
    "expenseEntries",
    (e) => e.user_id === userId && monthKey(e.date) === period && e.is_one_off_flag
  );
  for (const e of oneOffEntries) {
    const bucket = e.budget_bucket || CATEGORY_BUCKETS[e.category] || "needs";
    oneOffTotalsByBucket[bucket] += Number(e.amount);
  }

  if (income > 0) {
    for (const bucket of ["needs", "wants", "savings"]) {
      const allowance = income * BUDGET_TARGETS[bucket];
      const countedSpend = spent[bucket] - oneOffTotalsByBucket[bucket];
      if (allowance > 0 && countedSpend / allowance >= 0.8 && fractionRemaining > 0.25) {
        createAlert(
          userId,
          "budget",
          t(`alerts.types.budget`) + ": " + t(`dashboard.${bucket}`),
          null,
          `${period}:${bucket}`
        );
      }
    }
  }

  const ef = getEmergencyFund(userId);
  const target = emergencyFundTarget(ef);
  if (target > 0 && Number(ef.current_balance) < target) {
    const monthTx = db.where(
      "emergencyFundTransactions",
      (tx) => tx.emergency_fund_id === ef.id && monthKey(tx.date) === period && tx.type === "contribution"
    );
    if (!monthTx.length && dayNow >= Math.floor(daysTotal * 0.66)) {
      createAlert(userId, "ef", "ef_trajectory", null, period);
    }
  }

  const invTarget = investmentTargetForMonth(user);
  const contributed = monthlyInvestmentContributions(userId, period);
  if (invTarget > 0 && contributed < invTarget && fractionRemaining < 0.35 && fractionRemaining > 0) {
    createAlert(userId, "invest", "invest_at_risk", null, period);
  }

  return getAlerts(userId);
}

export function getAlerts(userId) {
  return db.where("alerts", (a) => a.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function simulateGrowth(currentCapital, monthlyContribution, annualRatePct, years) {
  const r = annualRatePct / 100 / 12;
  const months = years * 12;
  const points = [];
  let value = Number(currentCapital);
  for (let m = 0; m <= months; m++) {
    if (m > 0) {
      value = value * (1 + r) + Number(monthlyContribution);
    }
    if (m % 12 === 0) points.push({ year: m / 12, value });
  }
  const totalContributed = Number(currentCapital) + Number(monthlyContribution) * months;
  return { points, finalValue: value, totalContributed, growthFromReturns: value - totalContributed };
}

const RISK_ALLOCATIONS = {
  conservative: { stock: 20, bond: 70, other: 10 },
  moderate: { stock: 50, bond: 40, other: 10 },
  aggressive: { stock: 70, bond: 20, other: 10 }
};

export function suggestAllocation(riskTolerance) {
  return RISK_ALLOCATIONS[riskTolerance] || RISK_ALLOCATIONS.moderate;
}

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

export function mockSentimentForType(type) {
  const rand = seededRandom(type + monthKey(new Date()));
  const score = rand();
  if (score > 0.6) return "bullish";
  if (score > 0.35) return "neutral";
  return "bearish";
}
