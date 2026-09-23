import { t } from "../i18n.js";
import {
  monthlyExpensesByBucket, budgetAllowances, getEmergencyFund, emergencyFundTarget,
  investmentTargetForMonth, monthlyInvestmentContributions, recomputeAlerts, getAlerts,
  addExtraIncome, todayLocal, ALLOCATION_BUCKETS
} from "../finance.js";
import { db } from "../db.js";
import { progressBar, budgetBars } from "../charts.js";
import { getAlertContent } from "../alertContent.js";

export async function render(root, user) {
  recomputeAlerts(user);

  function draw() {
    const hasAnyData =
      db.where("incomeEntries", (e) => e.user_id === user.id).length ||
      db.where("expenseEntries", (e) => e.user_id === user.id).length;

    const spent = monthlyExpensesByBucket(user);
    const allowances = budgetAllowances(user);
    const ef = getEmergencyFund(user.id);
    const efTarget = emergencyFundTarget(ef);
    const efPct = efTarget > 0 ? (Number(ef.current_balance) / efTarget) * 100 : 0;

    const invTarget = investmentTargetForMonth(user);
    const invContributed = monthlyInvestmentContributions(user);
    const invPct = invTarget > 0 ? (invContributed / invTarget) * 100 : 0;

    const alerts = getAlerts(user.id).slice(0, 3);

    root.innerHTML = `
      <div class="container">
        <h2>${t("dashboard.title")}</h2>

        <div class="card income-header-card" style="margin-bottom:20px">
          <div class="income-header-row">
            <div>
              <div class="card-title">${t("onboarding.salary_label")}</div>
              <div class="stat-value">$${Number(user.salary || 0).toLocaleString()}</div>
            </div>
            <button class="btn btn-accent btn-round" id="add-extra-income" title="${t("dashboard.add_extra_income")}">+</button>
            <div class="income-header-cycle">
              <label style="margin-bottom:4px">${t("dashboard.cycle_label")}</label>
              <select id="cycle-select">
                ${[15, 30].map((d) => `<option value="${d}" ${Number(user.cycle_length_days || 30) === d ? "selected" : ""}>${t("dashboard.cycle_option", { days: d })}</option>`).join("")}
              </select>
            </div>
          </div>
          <p class="field-help" style="margin:8px 0 0">${t("dashboard.cycle_help")}</p>
        </div>

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
              { label: t("dashboard.needs"), spent: spent.needs, allowance: allowances.needs, of: t("dashboard.of"), target: t("dashboard.target") },
              { label: t("dashboard.wants"), spent: spent.wants, allowance: allowances.wants, of: t("dashboard.of"), target: t("dashboard.target") },
              { label: t("dashboard.savings"), spent: spent.savings, allowance: allowances.savings, of: t("dashboard.of"), target: t("dashboard.target") }
            ])}
            <a href="#/transactions" class="btn btn-ghost btn-sm" style="margin-top:14px">${t("transactions.view_link")}</a>
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
          <a href="#/transactions" class="btn btn-ghost">${t("transactions.title")}</a>
        </div>
      </div>

      <div class="modal-backdrop" id="extra-income-modal" hidden>
        <div class="modal card">
          <h3>${t("dashboard.extra_income_modal_title")}</h3>
          <form id="extra-income-form">
            <label>${t("entry.amount")}</label>
            <input type="number" name="amount" min="0.01" step="0.01" required />
            <label>${t("entry.date")}</label>
            <input type="date" name="date" value="${todayLocal()}" required />
            <label>${t("dashboard.choose_bucket")}</label>
            <div class="allocation-rows">
              ${ALLOCATION_BUCKETS.map(
                (b) => `
                <div class="allocation-row">
                  <span>${t(`dashboard.alloc_${b}`)}</span>
                  <input type="number" name="alloc_${b}" min="0" max="100" step="1" value="${b === "needs" ? 100 : 0}" class="alloc-input" />
                  <span>%</span>
                </div>`
              ).join("")}
            </div>
            <p class="field-help" id="alloc-total-help">${t("dashboard.total_must_equal_100")}</p>
            <div id="alloc-err"></div>
            <div class="form-actions">
              <button type="button" class="btn btn-ghost" id="cancel-extra-income">${t("common.cancel")}</button>
              <button type="submit" class="btn btn-accent">${t("dashboard.save_allocation")}</button>
            </div>
          </form>
        </div>
      </div>`;

    root.querySelector("#cycle-select").addEventListener("change", (e) => {
      db.update("users", user.id, { cycle_length_days: Number(e.target.value) });
      user.cycle_length_days = Number(e.target.value);
      draw();
    });

    const modal = root.querySelector("#extra-income-modal");
    root.querySelector("#add-extra-income").addEventListener("click", () => {
      modal.hidden = false;
    });
    root.querySelector("#cancel-extra-income").addEventListener("click", () => {
      modal.hidden = true;
    });

    root.querySelector("#extra-income-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const allocation = {};
      let total = 0;
      for (const b of ALLOCATION_BUCKETS) {
        const v = Number(fd.get(`alloc_${b}`) || 0);
        allocation[b] = v;
        total += v;
      }
      const errBox = root.querySelector("#alloc-err");
      if (total !== 100) {
        errBox.innerHTML = `<div class="form-error">${t("dashboard.total_must_equal_100")}</div>`;
        return;
      }
      addExtraIncome(user, Number(fd.get("amount")), fd.get("date"), allocation);
      modal.hidden = true;
      draw();
    });
  }

  draw();
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
