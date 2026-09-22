import { t } from "../i18n.js";
import { db } from "../db.js";
import { getEmergencyFund, emergencyFundTarget, logEmergencyFundTransaction, averageMonthlyExpenses } from "../finance.js";
import { progressBar } from "../charts.js";

export async function render(root, user) {
  function draw() {
    const ef = getEmergencyFund(user.id);
    const target = emergencyFundTarget(ef);
    const pct = target > 0 ? (Number(ef.current_balance) / target) * 100 : 0;
    const monthsCovered = ef.target_monthly_expense_figure > 0 ? Number(ef.current_balance) / ef.target_monthly_expense_figure : 0;
    const history = db
      .where("emergencyFundTransactions", (tx) => tx.emergency_fund_id === ef.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const suggestion = averageMonthlyExpenses(user.id);

    root.innerHTML = `
      <div class="container">
        <h2>${t("ef.title")}</h2>
        <div class="grid-2">
          <div class="card">
            <div class="card-title">${t("ef.current_balance")}</div>
            <div class="stat-value">$${Number(ef.current_balance).toLocaleString()}</div>
            <div class="stat-sub">${Math.round(pct)}% ${t("dashboard.ef_progress")}</div>
            <div style="margin:12px 0">${progressBar(pct, "--forest-600")}</div>
            <div class="stat-sub">${monthsCovered.toFixed(1)} ${t("ef.months_covered")}</div>

            <h4 style="margin-top:20px">${t("ef.edit_target")}</h4>
            <label>${t("ef.monthly_expense_figure")}</label>
            <input type="number" id="target-figure" value="${ef.target_monthly_expense_figure}" min="0" step="0.01" />
            <div class="form-actions">
              <button class="btn btn-ghost btn-sm" id="save-target">${t("common.save")}</button>
              ${suggestion ? `<button class="btn btn-accent btn-sm" id="auto-suggest">${t("ef.auto_suggest")} ($${suggestion.toFixed(0)})</button>` : ""}
            </div>
          </div>

          <div class="card">
            <div class="card-title">${t("ef.log_transaction")}</div>
            <form id="tx-form">
              <label>${t("entry.amount")}</label>
              <input type="number" name="amount" min="0.01" step="0.01" required />
              <label>${t("entry.type")}</label>
              <select name="type">
                <option value="contribution">${t("ef.contribution")}</option>
                <option value="withdrawal">${t("ef.withdrawal")}</option>
              </select>
              <label>${t("entry.note")}</label>
              <input type="text" name="note" />
              <button class="btn btn-primary btn-block" type="submit">${t("common.save")}</button>
            </form>
          </div>
        </div>

        <div class="card" style="margin-top:20px">
          <div class="card-title">${t("ef.history")}</div>
          ${history.length ? renderHistory(history) : `<p>${t("ef.no_history")}</p>`}
        </div>
      </div>`;

    root.querySelector("#save-target").addEventListener("click", () => {
      const val = Number(root.querySelector("#target-figure").value || 0);
      db.update("emergencyFunds", ef.id, { target_monthly_expense_figure: val, last_updated: new Date().toISOString() });
      draw();
    });

    const autoBtn = root.querySelector("#auto-suggest");
    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        db.update("emergencyFunds", ef.id, { target_monthly_expense_figure: suggestion, last_updated: new Date().toISOString() });
        draw();
      });
    }

    root.querySelector("#tx-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      logEmergencyFundTransaction(user.id, Number(fd.get("amount")), fd.get("type"), fd.get("note"));
      draw();
    });
  }

  function renderHistory(history) {
    return `<ul class="entry-list">
      ${history
        .map(
          (tx) => `
        <li class="entry-row">
          <div class="entry-main">
            <span class="entry-cat">${tx.type === "contribution" ? t("ef.contribution") : t("ef.withdrawal")}</span>
            <span class="entry-meta">${new Date(tx.date).toLocaleDateString()}${tx.note ? " — " + tx.note : ""}</span>
          </div>
          <span class="entry-amount ${tx.type === "contribution" ? "income" : "expense"}">${tx.type === "contribution" ? "+" : "−"}$${Number(tx.amount).toFixed(2)}</span>
        </li>`
        )
        .join("")}
    </ul>`;
  }

  draw();
}
