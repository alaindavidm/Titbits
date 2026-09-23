import { t } from "../i18n.js";
import {
  BUDGET_GROUPS, getBudgetLines, budgetLineLabel, addCustomBudgetLine,
  updateBudgetLineAmount, removeBudgetLine, budgetComparison, generateAdvice
} from "../budget.js";

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

export async function render(root, user) {
  function draw() {
    const lines = getBudgetLines(user);
    const comparison = budgetComparison(user);
    const advice = generateAdvice(user, comparison);

    root.innerHTML = `
      <div class="container">
        <h2>${t("budget.title")}</h2>
        <p class="field-help">${t("budget.subtitle")}</p>

        <div class="stack">
          ${BUDGET_GROUPS.map((group) => renderGroupCard(group, lines)).join("")}
        </div>

        <div class="form-actions" style="margin-top:10px">
          <button class="btn btn-primary" id="save-budget">${t("budget.save")}</button>
        </div>

        <div class="card" style="margin-top:28px">
          <div class="card-title">${t("budget.vs_reality_title")}</div>
          ${renderComparisonTable(comparison)}
        </div>

        <div class="card" style="margin-top:20px">
          <div class="card-title">${t("budget.advice_title")}</div>
          ${advice.map((a) => `<div class="alert-item ${a.tone === "warn" ? "unread" : ""}"><div class="alert-message">${escapeHtml(a.text)}</div></div>`).join("")}
        </div>
      </div>`;

    root.querySelectorAll("[data-amount-for]").forEach((input) => {
      input.addEventListener("change", () => {
        updateBudgetLineAmount(input.dataset.amountFor, input.value);
      });
    });

    root.querySelectorAll("[data-remove-line]").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeBudgetLine(btn.dataset.removeLine);
        draw();
      });
    });

    root.querySelectorAll("[data-add-custom]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const label = prompt(t("budget.custom_line_prompt"));
        if (label && label.trim()) {
          addCustomBudgetLine(user, btn.dataset.addCustom, label.trim(), 0);
          draw();
        }
      });
    });

    root.querySelector("#save-budget").addEventListener("click", () => {
      root.querySelectorAll("[data-amount-for]").forEach((input) => {
        updateBudgetLineAmount(input.dataset.amountFor, input.value);
      });
      draw();
      const btn = root.querySelector("#save-budget");
      const original = btn.textContent;
      btn.textContent = t("budget.saved");
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    });
  }

  function renderGroupCard(group, lines) {
    const groupLines = lines.filter((l) => l.group === group).sort((a, b) => budgetLineLabel(a).localeCompare(budgetLineLabel(b)));
    const total = groupLines.reduce((s, l) => s + (Number(l.planned_amount) || 0), 0);
    return `
      <div class="card">
        <div class="card-title">${t(`budget.group_${group}`)} <span style="float:right">${t("budget.total")}: $${total.toFixed(0)}</span></div>
        ${
          groupLines.length
            ? `<ul class="entry-list">
              ${groupLines
                .map(
                  (l) => `
                <li class="entry-row">
                  <div class="entry-main"><span class="entry-cat">${escapeHtml(budgetLineLabel(l))}</span></div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span>$</span>
                    <input type="number" min="0" step="1" value="${l.planned_amount}" data-amount-for="${l.id}" style="width:110px;margin-bottom:0" />
                    <button class="btn btn-danger btn-sm" data-remove-line="${l.id}">${t("budget.remove")}</button>
                  </div>
                </li>`
                )
                .join("")}
            </ul>`
            : `<p>${t("budget.no_lines")}</p>`
        }
        <button type="button" class="btn btn-ghost btn-sm" style="margin-top:12px" data-add-custom="${group}">${t("budget.add_custom")}</button>
      </div>`;
  }

  function renderComparisonTable(comparison) {
    const rows = [];
    for (const group of BUDGET_GROUPS) {
      const g = comparison.byGroup[group];
      if (!g.lines.length) continue;
      rows.push(`<tr><td colspan="4" style="font-weight:800;color:var(--forest-800);padding-top:16px">${t(`budget.group_${group}`)}</td></tr>`);
      for (const r of g.lines) {
        const over = r.diff < 0;
        rows.push(`<tr>
          <td>${escapeHtml(r.label)}</td>
          <td style="text-align:right">$${r.planned.toFixed(0)}</td>
          <td style="text-align:right">$${r.actual.toFixed(0)}</td>
          <td style="text-align:right" class="${over ? "over-budget" : ""}">${over ? "−" : "+"}$${Math.abs(r.diff).toFixed(0)}</td>
        </tr>`);
      }
      rows.push(`<tr style="font-weight:700">
        <td>${t("budget.total")}</td>
        <td style="text-align:right">$${g.plannedTotal.toFixed(0)}</td>
        <td style="text-align:right">$${g.actualTotal.toFixed(0)}</td>
        <td style="text-align:right" class="${g.actualTotal > g.plannedTotal ? "over-budget" : ""}">${g.actualTotal > g.plannedTotal ? "−" : "+"}$${Math.abs(g.plannedTotal - g.actualTotal).toFixed(0)}</td>
      </tr>`);
    }
    if (!rows.length) return `<p>${t("budget.no_lines")}</p>`;
    return `<table class="report-table">
      <thead><tr><th></th><th style="text-align:right">${t("budget.planned")}</th><th style="text-align:right">${t("budget.actual")}</th><th style="text-align:right">${t("budget.difference")}</th></tr></thead>
      <tbody>
        ${rows.join("")}
        <tr style="font-weight:800;border-top:2px solid var(--silver-300)">
          <td>${t("budget.total")}</td>
          <td style="text-align:right">$${comparison.grandPlanned.toFixed(0)}</td>
          <td style="text-align:right">$${comparison.grandActual.toFixed(0)}</td>
          <td style="text-align:right" class="${comparison.grandActual > comparison.grandPlanned ? "over-budget" : ""}">${comparison.grandActual > comparison.grandPlanned ? "−" : "+"}$${Math.abs(comparison.grandPlanned - comparison.grandActual).toFixed(0)}</td>
        </tr>
      </tbody>
    </table>`;
  }

  draw();
}
