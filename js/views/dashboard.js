import { t } from "../i18n.js";
import {
  monthlyIncomeTotal, monthlyExpensesByBucket, BUDGET_TARGETS, getEmergencyFund, emergencyFundTarget,
  investmentTargetForMonth, monthlyInvestmentContributions, recomputeAlerts, getAlerts
} from "../finance.js";
import { db } from "../db.js";
import { progressBar, budgetBars } from "../charts.js";
import { getAlertContent } from "../alertContent.js";

export async function render(root, user) {
  recomputeAlerts(user);

  const hasAnyData =
    db.where("incomeEntries", (e) => e.user_id === user.id).length ||
    db.where("expenseEntries", (e) => e.user_id === user.id).length;

  const income = monthlyIncomeTotal(user.id) || Number(user.salary || 0);
  const spent = monthlyExpensesByBucket(user.id);
  const ef = getEmergencyFund(user.id);
  const efTarget = emergencyFundTarget(ef);
  const efPct = efTarget > 0 ? (Number(ef.current_balance) / efTarget) * 100 : 0;

  const invTarget = investmentTargetForMonth(user);
  const invContributed = monthlyInvestmentContributions(user.id);
  const invPct = invTarget > 0 ? (invContributed / invTarget) * 100 : 0;

  const alerts = getAlerts(user.id).slice(0, 3);

  root.innerHTML = `
    <div class="container">
      <h2>${t("dashboard.title")}</h2>
      ${!hasAnyData ? `
        <div class="card empty-state">
          <h3>${t("dashboard.empty_title")}</h3>
          <p>${t("dashboard.empty_body")}</p>
          <a href="#/add-entry" class="btn btn-accent">${t("dashboard.quick_add")}</a>
        </div>` : ""}

      <div class="grid-3" style="margin-top:20px">
        <div class="card">
          <div class="card-title">${t("dashboard.budget_title")}</div>
          ${budgetBars([
            { label: t("dashboard.needs"), spent: spent.needs, allowance: income * BUDGET_TARGETS.needs, of: t("dashboard.of"), target: t("dashboard.target"), colorVar: "--forest-600" },
            { label: t("dashboard.wants"), spent: spent.wants, allowance: income * BUDGET_TARGETS.wants, of: t("dashboard.of"), target: t("dashboard.target"), colorVar: "--purple-500" },
            { label: t("dashboard.savings"), spent: spent.savings, allowance: income * BUDGET_TARGETS.savings, of: t("dashboard.of"), target: t("dashboard.target"), colorVar: "--forest-500" }
          ])}
        </div>

        <div class="card">
          <div class="card-title">${t("dashboard.ef_title")}</div>
          <div class="stat-value">$${Number(ef.current_balance).toLocaleString()}</div>
          <div class="stat-sub">${Math.round(efPct)}% ${t("dashboard.ef_progress")} ($${efTarget.toLocaleString()})</div>
          <div style="margin-top:10px">${progressBar(efPct, "--forest-600")}</div>
          <a href="#/emergency-fund" class="btn btn-ghost btn-sm" style="margin-top:14px">${t("nav.emergency_fund")}</a>
        </div>

        <div class="card">
          <div class="card-title">${t("dashboard.invest_title")}</div>
          <div class="stat-value">$${invContributed.toLocaleString()}</div>
          <div class="stat-sub">${Math.round(invPct)}% ${t("dashboard.invest_progress")} ($${invTarget.toLocaleString()})</div>
          <div style="margin-top:10px">${progressBar(invPct, "--purple-500")}</div>
          <a href="#/investments" class="btn btn-ghost btn-sm" style="margin-top:14px">${t("nav.investments")}</a>
        </div>
      </div>

      <div class="card" style="margin-top:20px">
        <div class="card-title">${t("dashboard.recent_alerts")}</div>
        ${alerts.length ? renderAlertSnippets(alerts, user) : `<p>${t("dashboard.no_alerts")}</p>`}
        ${alerts.length ? `<a href="#/alerts" class="btn btn-ghost btn-sm">${t("dashboard.view_all_alerts")}</a>` : ""}
      </div>

      <div class="form-actions" style="margin-top:20px">
        <a href="#/add-entry" class="btn btn-accent">${t("dashboard.quick_add")}</a>
        <a href="#/add-entry" class="btn btn-ghost">${t("dashboard.quick_add_income")}</a>
      </div>
    </div>`;
}

function renderAlertSnippets(alerts, user) {
  return alerts
    .map((a) => {
      const content = getAlertContent(a, user);
      return `
    <div class="alert-item ${a.status === "unread" ? "unread" : ""}">
      <div class="alert-item-head">
        <span class="alert-type-tag">${t(`alerts.types.${a.type}`)}</span>
        <span class="alert-time">${new Date(a.created_at).toLocaleDateString()}</span>
      </div>
      <div class="alert-message">${content.title}</div>
    </div>`;
    })
    .join("");
}
