import { t } from "./i18n.js";
import {
  monthlyExpensesByBucket, getEmergencyFund, emergencyFundTarget,
  investmentTargetForMonth, monthlyInvestmentContributions, periodProgress, budgetAllowances
} from "./finance.js";

const BUCKET_LABEL_KEY = { needs: "dashboard.needs", wants: "dashboard.wants", savings: "dashboard.savings" };

export function getAlertContent(alert, user) {
  if (alert.type === "budget") {
    const bucket = alert.trigger_data.period.split(":")[1] || "needs";
    const label = t(BUCKET_LABEL_KEY[bucket]);
    const allowance = budgetAllowances(user)[bucket];
    const spent = monthlyExpensesByBucket(user)[bucket];
    const daysLeft = periodProgress(user).daysLeft;
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
    const contributed = monthlyInvestmentContributions(user);
    const remaining = Math.max(0, target - contributed);
    const daysLeft = periodProgress(user).daysLeft;
    return {
      title: t("alerts.invest_title"),
      why: t("alerts.invest_why", { contributed: contributed.toFixed(0), target: target.toFixed(0), days: daysLeft }),
      suggestion: t("alerts.invest_suggestion", { remaining: remaining.toFixed(0) })
    };
  }
  return { title: alert.message, why: "", suggestion: alert.suggested_action || "" };
}
