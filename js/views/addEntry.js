import { t } from "../i18n.js";
import { db } from "../db.js";
import { INCOME_SOURCES, todayLocal } from "../finance.js";
import { BUDGET_GROUPS, getBudgetLines, budgetLineLabel, legacyBucketForCategory, categoryDisplayLabel } from "../budget.js";

export async function render(root, user) {
  let type = "expense";

  function draw() {
    const entries = [
      ...db.where("incomeEntries", (e) => e.user_id === user.id).map((e) => ({ ...e, _kind: "income" })),
      ...db.where("expenseEntries", (e) => e.user_id === user.id).map((e) => ({ ...e, _kind: "expense" }))
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 12);

    root.innerHTML = `
      <div class="container-narrow">
        <h2>${t("entry.title")}</h2>
        <div class="card">
          <div class="tabs">
            <button class="tab-btn ${type === "expense" ? "active" : ""}" data-type="expense">${t("entry.expense")}</button>
            <button class="tab-btn ${type === "income" ? "active" : ""}" data-type="income">${t("entry.income")}</button>
          </div>
          <div id="err"></div>
          <form id="entry-form">${type === "expense" ? expenseFields() : incomeFields()}
            <button class="btn btn-primary btn-block" type="submit">${t("entry.save")}</button>
          </form>
          <a href="#/dashboard" class="btn btn-ghost btn-block" style="margin-top:10px">${t("common.back_to_dashboard")}</a>
        </div>

        <div class="card" style="margin-top:20px">
          <div class="card-title">${t("entry.recent_entries")}</div>
          ${entries.length ? renderEntryList(entries) : `<p>${t("entry.no_entries")}</p>`}
        </div>
      </div>`;

    root.querySelectorAll(".tab-btn").forEach((b) =>
      b.addEventListener("click", () => {
        type = b.dataset.type;
        draw();
      })
    );

    root.querySelector("#entry-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const amount = Number(fd.get("amount"));
      const date = fd.get("date") || todayLocal();
      if (!amount || amount <= 0) return;

      if (type === "expense") {
        const category = fd.get("category");
        db.insert("expenseEntries", {
          user_id: user.id,
          amount,
          date,
          category,
          subcategory: null,
          note: fd.get("note") || null,
          is_recurring: fd.get("recurring") === "on",
          is_one_off_flag: fd.get("one_off") === "on",
          budget_bucket: legacyBucketForCategory(user, category)
        });
      } else {
        db.insert("incomeEntries", {
          user_id: user.id,
          amount,
          date,
          source: fd.get("source"),
          is_recurring: fd.get("recurring") === "on",
          recurrence_rule: null
        });
      }
      draw();
    });

    root.querySelectorAll("[data-delete]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const { kind, id } = btn.dataset;
        db.remove(kind === "income" ? "incomeEntries" : "expenseEntries", id);
        draw();
      })
    );
  }

  function expenseFields() {
    const today = todayLocal();
    const lines = getBudgetLines(user);
    return `
      <label>${t("entry.amount")}</label>
      <input type="number" step="0.01" min="0.01" name="amount" required />
      <label>${t("entry.date")}</label>
      <input type="date" name="date" value="${today}" required />
      <label>${t("entry.category")}</label>
      <select name="category" required>
        ${BUDGET_GROUPS.map((group) => {
          const groupLines = lines.filter((l) => l.group === group).sort((a, b) => budgetLineLabel(a).localeCompare(budgetLineLabel(b)));
          if (!groupLines.length) return "";
          return `<optgroup label="${t(`budget.group_${group}`)}">
            ${groupLines.map((l) => `<option value="${l.key}">${budgetLineLabel(l)}</option>`).join("")}
          </optgroup>`;
        }).join("")}
      </select>
      <label>${t("entry.note")}</label>
      <input type="text" name="note" />
      <div class="checkbox-row"><input type="checkbox" name="recurring" id="rec" /><label for="rec" style="margin:0">${t("entry.recurring")}</label></div>
      <div class="checkbox-row"><input type="checkbox" name="one_off" id="oneoff" /><label for="oneoff" style="margin:0">${t("entry.one_off")}</label></div>
    `;
  }

  function incomeFields() {
    const today = todayLocal();
    return `
      <label>${t("entry.amount")}</label>
      <input type="number" step="0.01" min="0.01" name="amount" required />
      <label>${t("entry.date")}</label>
      <input type="date" name="date" value="${today}" required />
      <label>${t("entry.source")}</label>
      <select name="source" required>
        ${INCOME_SOURCES.map((s) => `<option value="${s}">${t(`entry.income_sources.${s}`)}</option>`).join("")}
      </select>
      <div class="checkbox-row"><input type="checkbox" name="recurring" id="rec2" /><label for="rec2" style="margin:0">${t("entry.recurring")}</label></div>
    `;
  }

  function renderEntryList(entries) {
    return `<ul class="entry-list">
      ${entries
        .map((e) => {
          const isIncome = e._kind === "income";
          const label = isIncome ? t(`entry.income_sources.${e.source}`) : categoryDisplayLabel(user, e.category);
          return `
        <li class="entry-row">
          <div class="entry-main">
            <span class="entry-cat">${label}${e.is_one_off_flag ? `<span class="tag-pill">${t("entry.one_off").split(" /")[0]}</span>` : ""}</span>
            <span class="entry-meta">${e.date}${e.note ? " — " + escapeHtml(e.note) : ""}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="entry-amount ${isIncome ? "income" : "expense"}">${isIncome ? "+" : "−"}$${Number(e.amount).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" data-delete data-kind="${e._kind}" data-id="${e.id}">${t("entry.delete")}</button>
          </div>
        </li>`;
        })
        .join("")}
    </ul>`;
  }

  draw();
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
