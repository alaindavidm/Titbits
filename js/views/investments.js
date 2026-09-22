import { t } from "../i18n.js";
import { db } from "../db.js";
import { getHoldings, portfolioSummary, monthlyInvestmentContributions, investmentTargetForMonth, todayLocal } from "../finance.js";
import { pieChart, progressBar } from "../charts.js";

const TYPE_COLORS = { stock: "var(--forest-600)", etf: "var(--purple-500)", bond: "var(--forest-500)", other: "var(--silver-600)" };

export async function render(root, user) {
  function draw() {
    const holdings = getHoldings(user.id);
    const summary = portfolioSummary(user.id);
    const contributions = db
      .where("investmentContributions", (c) => c.user_id === user.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const target = investmentTargetForMonth(user);
    const contributedThisMonth = monthlyInvestmentContributions(user.id);
    const adherence = target > 0 ? Math.min(100, (contributedThisMonth / target) * 100) : 0;

    const segments = Object.entries(summary.byType).map(([type, value]) => ({
      label: t(`inv.${type}`),
      value,
      color: TYPE_COLORS[type] || "var(--silver-600)"
    }));

    root.innerHTML = `
      <div class="container">
        <h2>${t("inv.title")}</h2>
        <div class="grid-3">
          <div class="card">
            <div class="card-title">${t("inv.total_value")}</div>
            <div class="stat-value">$${summary.totalValue.toLocaleString()}</div>
            <div class="stat-sub">${t("inv.total_contributed")}: $${summary.totalCost.toLocaleString()}</div>
          </div>
          <div class="card">
            <div class="card-title">${t("inv.gain_loss")}</div>
            <div class="stat-value" style="color:${summary.gainLoss >= 0 ? "var(--success)" : "var(--danger)"}">
              ${summary.gainLoss >= 0 ? "+" : "−"}$${Math.abs(summary.gainLoss).toLocaleString()}
            </div>
            <div class="stat-sub">${t("inv.stale_note")}</div>
          </div>
          <div class="card">
            <div class="card-title">${t("inv.allocation")}</div>
            <div style="display:flex;align-items:center;gap:16px">
              ${pieChart(segments, 96)}
              <div class="legend" style="flex-direction:column;gap:6px">
                ${segments.map((s) => `<div class="legend-item"><span class="legend-swatch" style="background:${s.color}"></span>${s.label}</div>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="grid-2" style="margin-top:20px">
          <div class="card">
            <div class="card-title">${t("inv.add_holding")}</div>
            <form id="holding-form">
              <label>${t("inv.holding_type")}</label>
              <select name="type">
                <option value="stock">${t("inv.stock")}</option>
                <option value="etf">${t("inv.etf")}</option>
                <option value="bond">${t("inv.bond")}</option>
                <option value="other">${t("inv.other")}</option>
              </select>
              <label>${t("inv.name_ticker")}</label>
              <input type="text" name="name_or_ticker" required />
              <label>${t("inv.quantity")}</label>
              <input type="number" name="quantity" min="0" step="0.0001" value="1" />
              <label>${t("inv.cost_basis")}</label>
              <input type="number" name="cost_basis" min="0" step="0.01" required />
              <label>${t("inv.current_value")}</label>
              <input type="number" name="current_value" min="0" step="0.01" required />
              <label>${t("inv.date_acquired")}</label>
              <input type="date" name="date_acquired" value="${todayLocal()}" />
              <button class="btn btn-primary btn-block" type="submit">${t("common.save")}</button>
            </form>
          </div>

          <div class="card">
            <div class="card-title">${t("inv.contribution_title")}</div>
            <div class="stat-value">$${contributedThisMonth.toFixed(0)} / $${target.toFixed(0)}</div>
            <div style="margin:10px 0">${progressBar(adherence, "--purple-500")}</div>
            <div class="stat-sub">${Math.round(adherence)}% ${t("inv.adherence")}</div>
            <form id="contrib-form" style="margin-top:16px">
              <label>${t("inv.contribution_amount")}</label>
              <input type="number" name="amount" min="0.01" step="0.01" required />
              <button class="btn btn-accent btn-block" type="submit">${t("inv.log_contribution")}</button>
            </form>
          </div>
        </div>

        <div class="card" style="margin-top:20px">
          <div class="card-title">${t("inv.holdings_list")}</div>
          ${holdings.length ? renderHoldings(holdings) : `<p>${t("inv.no_holdings")}</p>`}
        </div>

        <div class="card" style="margin-top:20px">
          <div class="card-title">${t("inv.contribution_history")}</div>
          ${contributions.length ? renderContributions(contributions) : `<p>${t("entry.no_entries")}</p>`}
        </div>
      </div>`;

    root.querySelector("#holding-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      db.insert("investmentHoldings", {
        user_id: user.id,
        type: fd.get("type"),
        name_or_ticker: fd.get("name_or_ticker"),
        quantity: Number(fd.get("quantity") || 1),
        cost_basis: Number(fd.get("cost_basis")),
        current_value: Number(fd.get("current_value")),
        date_acquired: fd.get("date_acquired"),
        last_updated: new Date().toISOString()
      });
      draw();
    });

    root.querySelector("#contrib-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      db.insert("investmentContributions", {
        user_id: user.id,
        amount: Number(fd.get("amount")),
        date: new Date().toISOString(),
        target_percentage: 15,
        against_salary_amount: user.salary
      });
      draw();
    });

    root.querySelectorAll("[data-delete-holding]").forEach((btn) =>
      btn.addEventListener("click", () => {
        db.remove("investmentHoldings", btn.dataset.deleteHolding);
        draw();
      })
    );
  }

  function renderHoldings(holdings) {
    return `<ul class="entry-list">
      ${holdings
        .map(
          (h) => `
        <li class="entry-row">
          <div class="entry-main">
            <span class="entry-cat">${escapeHtml(h.name_or_ticker)} <span class="tag-pill">${t(`inv.${h.type}`)}</span></span>
            <span class="entry-meta">${t("inv.quantity")}: ${h.quantity} — ${t("inv.cost_basis")}: $${Number(h.cost_basis).toFixed(2)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="entry-amount">$${Number(h.current_value).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" data-delete-holding="${h.id}">${t("entry.delete")}</button>
          </div>
        </li>`
        )
        .join("")}
    </ul>`;
  }

  function renderContributions(contributions) {
    return `<ul class="entry-list">
      ${contributions
        .map(
          (c) => `
        <li class="entry-row">
          <div class="entry-main">
            <span class="entry-cat">${t("ef.contribution")}</span>
            <span class="entry-meta">${new Date(c.date).toLocaleDateString()}</span>
          </div>
          <span class="entry-amount income">+$${Number(c.amount).toFixed(2)}</span>
        </li>`
        )
        .join("")}
    </ul>`;
  }

  draw();
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
