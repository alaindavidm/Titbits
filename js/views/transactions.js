import { t } from "../i18n.js";
import { db } from "../db.js";
import { categoryDisplayLabel } from "../budget.js";

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function monthInputValue(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export async function render(root, user) {
  let month = monthInputValue(new Date());
  let typeFilter = "all";

  function draw() {
    const all = [
      ...db.where("incomeEntries", (e) => e.user_id === user.id).map((e) => ({
        date: e.date, kind: "income",
        category: t(`entry.income_sources.${e.source}`) + (e.is_extra ? ` (${t("dashboard.add_extra_income")})` : ""),
        note: null, amount: Number(e.amount)
      })),
      ...db.where("expenseEntries", (e) => e.user_id === user.id).map((e) => ({
        date: e.date, kind: "expense", category: categoryDisplayLabel(user, e.category), note: e.note || null, amount: Number(e.amount)
      }))
    ].filter((row) => monthInputValue(row.date) === month && (typeFilter === "all" || row.kind === typeFilter))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalIncome = all.filter((r) => r.kind === "income").reduce((s, r) => s + r.amount, 0);
    const totalExpenses = all.filter((r) => r.kind === "expense").reduce((s, r) => s + r.amount, 0);

    root.innerHTML = `
      <div class="container" id="report-root">
        <div class="no-print">
          <h2>${t("transactions.title")}</h2>
          <p class="field-help">${t("transactions.subtitle")}</p>
          <div class="card" style="margin-bottom:20px">
            <div class="form-actions" style="align-items:flex-end">
              <div>
                <label>${t("transactions.filter_month")}</label>
                <input type="month" id="month-input" value="${month}" />
              </div>
              <div class="tabs" style="margin-bottom:0">
                <button class="tab-btn ${typeFilter === "all" ? "active" : ""}" data-filter="all">${t("transactions.all_types")}</button>
                <button class="tab-btn ${typeFilter === "income" ? "active" : ""}" data-filter="income">${t("transactions.income_only")}</button>
                <button class="tab-btn ${typeFilter === "expense" ? "active" : ""}" data-filter="expense">${t("transactions.expense_only")}</button>
              </div>
              <button class="btn btn-ghost" id="download-csv">${t("transactions.download_csv")}</button>
              <button class="btn btn-ghost" id="print-report">${t("transactions.print_report")}</button>
            </div>
          </div>
        </div>

        <div class="grid-3 print-summary" style="margin-bottom:20px">
          <div class="card"><div class="card-title">${t("transactions.total_income")}</div><div class="stat-value" style="color:var(--success)">$${totalIncome.toFixed(2)}</div></div>
          <div class="card"><div class="card-title">${t("transactions.total_expenses")}</div><div class="stat-value">$${totalExpenses.toFixed(2)}</div></div>
          <div class="card"><div class="card-title">${t("transactions.net")}</div><div class="stat-value" style="color:${totalIncome - totalExpenses >= 0 ? "var(--success)" : "var(--danger)"}">$${(totalIncome - totalExpenses).toFixed(2)}</div></div>
        </div>

        <div class="card">
          <h3 class="print-title">Titbits — ${month}</h3>
          ${all.length ? renderTable(all) : `<p>${t("transactions.no_transactions")}</p>`}
        </div>
      </div>`;

    root.querySelector("#month-input").addEventListener("change", (e) => {
      month = e.target.value;
      draw();
    });
    root.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        typeFilter = b.dataset.filter;
        draw();
      })
    );
    root.querySelector("#print-report").addEventListener("click", () => window.print());
    root.querySelector("#download-csv").addEventListener("click", () => downloadCsv(all, month));
  }

  function renderTable(rows) {
    return `<table class="report-table">
      <thead><tr><th>${t("transactions.date")}</th><th>${t("transactions.category")}</th><th>${t("transactions.type")}</th><th style="text-align:right">${t("transactions.amount")}</th></tr></thead>
      <tbody>
        ${rows
          .map(
            (r) => `<tr>
          <td>${r.date}</td>
          <td>${escapeHtml(r.category)}${r.note ? `<div class="entry-meta">${escapeHtml(r.note)}</div>` : ""}</td>
          <td>${r.kind === "income" ? t("entry.income") : t("entry.expense")}</td>
          <td style="text-align:right" class="${r.kind === "income" ? "amount-income" : "amount-expense"}">${r.kind === "income" ? "+" : "−"}$${r.amount.toFixed(2)}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  }

  function downloadCsv(rows, monthLabel) {
    const header = ["Date", "Category", "Type", "Amount"];
    const lines = [header.join(",")];
    for (const r of rows) {
      const cat = `"${String(r.category).replace(/"/g, '""')}"`;
      lines.push([r.date, cat, r.kind, r.amount.toFixed(2)].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `titbits-transactions-${monthLabel}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  draw();
}
