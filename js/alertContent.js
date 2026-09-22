import { t } from "./i18n.js";
import {
  monthlyIncomeTotal, monthlyExpensesByBucket, BUDGET_TARGETS, getEmergencyFund, emergencyFundTarget,
  investmentTargetForMonth, monthlyInvestmentContributions, daysInMonth, dayOfMonth
} from "./finance.js";

const BUCKET_LABEL_KEY = { needs: "dashboard.needs", wants: "dashboard.wants", savings: "dashboard.savings" };

export function getAlertContent(alert, user) {
  if (alert.type === "budget") {
    const bucket = alert.trigger_data.period.split(":")[1] || "needs";
    const label = t(BUCKET_LABEL_KEY[bucket]);
    const income = monthlyIncomeTotal(user.id) || Number(user.salary || 0);
    const allowance = income * BUDGET_TARGETS[bucket];
    const spent = monthlyExpensesByBucket(user.id)[bucket];
    const daysLeft = daysInMonth(new Date()) - dayOfMonth(new Date());
    const pct = Math.round((spent / (allowance || 1)) * 100);
    return {
      title: t("alerts.budget_title", { bucket: label, pct }),
      why: t("alerts.budget_why", { spent: spent.toFixed(0), allowance: allowance.toFixed(0), bucket: label.toLowerCase(), days: daysLeft }),
      suggestion: t(`alerts.budget_suggestion_${bucket}`, { bucket: label.toLowerCase() })
    };
  }
  if (alert.type === "ef") {
    const ef = getEmergencyFund(user.id);
    const target = emergencyFundTarget(ef);
    const gap = Math.max(0, target - Number(ef.current_balance));
    return {
      title: t("alerts.ef_title"),
      why: t("alerts.ef_why", { gap: gap.toFixed(0), target: target.toFixed(0) }),
      suggestion: t("alerts.ef_suggestion")
    };
  }
  if (alert.type === "invest") {
    const target = investmentTargetForMonth(user);
    const contributed = monthlyInvestmentContributions(user.id);
    const remaining = Math.max(0, target - contributed);
    const daysLeft = daysInMonth(new Date()) - dayOfMonth(new Date());
    return {
      title: t("alerts.invest_title"),
      why: t("alerts.invest_why", { contributed: contributed.toFixed(0), target: target.toFixed(0), days: daysLeft }),
      suggestion: t("alerts.invest_suggestion", { remaining: remaining.toFixed(0) })
    };
  }
  return { title: alert.message, why: "", suggestion: alert.suggested_action || "" };
}
