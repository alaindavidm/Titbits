import { t } from "../i18n.js";
import { db } from "../db.js";
import { navigate } from "../router.js";

export async function render(root, user) {
  const state = {
    step: 1,
    salary: user.salary || "",
    pay_frequency: user.pay_frequency || "monthly",
    ef_balance: "",
    avg_expense: "",
    holdings: [],
    notif: { channel_inapp: true, channel_email: false, channel_push: false }
  };

  function draw() {
    root.innerHTML = `
      <div class="container-narrow">
        <div class="step-indicator">
          ${[1, 2, 3, 4].map((s) => `<div class="step-dot ${s <= state.step ? "done" : ""}"></div>`).join("")}
        </div>
        <div class="card">
          <h2>${t("onboarding.title")}</h2>
          <div id="step-body"></div>
        </div>
      </div>`;
    const body = root.querySelector("#step-body");
    if (state.step === 1) drawStep1(body);
    if (state.step === 2) drawStep2(body);
    if (state.step === 3) drawStep3(body);
    if (state.step === 4) drawStep4(body);
  }

  function drawStep1(body) {
    body.innerHTML = `
      <label>${t("onboarding.salary_label")}</label>
      <input type="number" min="0" step="0.01" id="salary" value="${state.salary}" />
      <p class="field-help">${t("onboarding.salary_help")}</p>
      <label>${t("onboarding.pay_frequency_label")}</label>
      <select id="freq">
        <option value="monthly" ${state.pay_frequency === "monthly" ? "selected" : ""}>${t("onboarding.freq_monthly")}</option>
        <option value="biweekly" ${state.pay_frequency === "biweekly" ? "selected" : ""}>${t("onboarding.freq_biweekly")}</option>
        <option value="weekly" ${state.pay_frequency === "weekly" ? "selected" : ""}>${t("onboarding.freq_weekly")}</option>
      </select>
      <div class="form-actions">
        <button class="btn btn-primary" id="next">${t("onboarding.next")}</button>
      </div>`;
    body.querySelector("#next").addEventListener("click", () => {
      state.salary = Number(body.querySelector("#salary").value || 0);
      state.pay_frequency = body.querySelector("#freq").value;
      state.step = 2;
      draw();
    });
  }

  function drawStep2(body) {
    body.innerHTML = `
      <label>${t("onboarding.ef_label")}</label>
      <input type="number" min="0" step="0.01" id="ef" value="${state.ef_balance}" />
      <p class="field-help">${t("onboarding.ef_help")}</p>
      <label>${t("onboarding.avg_expense_label")}</label>
      <input type="number" min="0" step="0.01" id="avgexp" value="${state.avg_expense}" />
      <p class="field-help">${t("onboarding.avg_expense_help")}</p>
      <div class="form-actions">
        <button class="btn btn-ghost" id="back">${t("onboarding.back")}</button>
        <button class="btn btn-primary" id="next">${t("onboarding.next")}</button>
      </div>`;
    body.querySelector("#back").addEventListener("click", () => { state.step = 1; draw(); });
    body.querySelector("#next").addEventListener("click", () => {
      state.ef_balance = Number(body.querySelector("#ef").value || 0);
      state.avg_expense = Number(body.querySelector("#avgexp").value || 0);
      state.step = 3;
      draw();
    });
  }

  function drawStep3(body) {
    body.innerHTML = `
      <h3>${t("onboarding.holdings_title")}</h3>
      <div id="holdings-rows"></div>
      <button type="button" class="btn btn-ghost btn-sm" id="add-holding">+ ${t("inv.add_holding")}</button>
      <div class="form-actions" style="margin-top:20px">
        <button class="btn btn-ghost" id="back">${t("onboarding.back")}</button>
        <button class="btn btn-primary" id="next">${t("onboarding.next")}</button>
      </div>`;
    const rowsEl = body.querySelector("#holdings-rows");

    function drawRows() {
      rowsEl.innerHTML = state.holdings
        .map(
          (h, i) => `
        <div class="card" style="margin-bottom:12px; padding:14px">
          <div class="grid-2">
            <div><label>${t("inv.holding_type")}</label>
              <select data-i="${i}" data-f="type">
                <option value="stock" ${h.type === "stock" ? "selected" : ""}>${t("inv.stock")}</option>
                <option value="etf" ${h.type === "etf" ? "selected" : ""}>${t("inv.etf")}</option>
                <option value="bond" ${h.type === "bond" ? "selected" : ""}>${t("inv.bond")}</option>
                <option value="other" ${h.type === "other" ? "selected" : ""}>${t("inv.other")}</option>
              </select>
            </div>
            <div><label>${t("inv.name_ticker")}</label>
              <input data-i="${i}" data-f="name_or_ticker" value="${h.name_or_ticker || ""}" />
            </div>
          </div>
          <div class="grid-2">
            <div><label>${t("inv.cost_basis")}</label>
              <input type="number" data-i="${i}" data-f="cost_basis" value="${h.cost_basis || ""}" />
            </div>
            <div><label>${t("inv.current_value")}</label>
              <input type="number" data-i="${i}" data-f="current_value" value="${h.current_value || ""}" />
            </div>
          </div>
          <button type="button" class="btn btn-danger btn-sm" data-remove="${i}">${t("entry.delete")}</button>
        </div>`
        )
        .join("");
      rowsEl.querySelectorAll("[data-f]").forEach((el) => {
        el.addEventListener("input", (e) => {
          const i = Number(e.target.dataset.i);
          const f = e.target.dataset.f;
          state.holdings[i][f] = e.target.value;
        });
      });
      rowsEl.querySelectorAll("[data-remove]").forEach((el) => {
        el.addEventListener("click", (e) => {
          state.holdings.splice(Number(e.target.dataset.remove), 1);
          drawRows();
        });
      });
    }
    drawRows();

    body.querySelector("#add-holding").addEventListener("click", () => {
      state.holdings.push({ type: "stock", name_or_ticker: "", quantity: 1, cost_basis: "", current_value: "" });
      drawRows();
    });
    body.querySelector("#back").addEventListener("click", () => { state.step = 2; draw(); });
    body.querySelector("#next").addEventListener("click", () => { state.step = 4; draw(); });
  }

  function drawStep4(body) {
    body.innerHTML = `
      <h3>${t("onboarding.notif_title")}</h3>
      <p class="field-help">${t("onboarding.notif_help")}</p>
      <div class="checkbox-row"><input type="checkbox" id="c-inapp" checked disabled /> <label style="margin:0">${t("settings.channel_inapp")}</label></div>
      <div class="checkbox-row"><input type="checkbox" id="c-email" ${state.notif.channel_email ? "checked" : ""} /> <label style="margin:0">${t("settings.channel_email")}</label></div>
      <div class="checkbox-row"><input type="checkbox" id="c-push" ${state.notif.channel_push ? "checked" : ""} /> <label style="margin:0">${t("settings.channel_push")}</label></div>
      <div class="form-actions">
        <button class="btn btn-ghost" id="back">${t("onboarding.back")}</button>
        <button class="btn btn-accent" id="finish">${t("onboarding.finish")}</button>
      </div>`;
    body.querySelector("#back").addEventListener("click", () => { state.step = 3; draw(); });
    body.querySelector("#finish").addEventListener("click", () => {
      state.notif.channel_email = body.querySelector("#c-email").checked;
      state.notif.channel_push = body.querySelector("#c-push").checked;
      finishOnboarding();
    });
  }

  function finishOnboarding() {
    db.update("users", user.id, {
      salary: state.salary,
      pay_frequency: state.pay_frequency,
      onboarded: true,
      notification_preferences: state.notif
    });

    const existingEf = db.where("emergencyFunds", (f) => f.user_id === user.id)[0];
    if (existingEf) {
      db.update("emergencyFunds", existingEf.id, {
        current_balance: state.ef_balance,
        target_monthly_expense_figure: state.avg_expense
      });
    } else {
      db.insert("emergencyFunds", {
        user_id: user.id,
        current_balance: state.ef_balance,
        target_monthly_expense_figure: state.avg_expense,
        target_multiple: 6,
        last_updated: new Date().toISOString()
      });
    }

    for (const h of state.holdings) {
      if (!h.name_or_ticker) continue;
      db.insert("investmentHoldings", {
        user_id: user.id,
        type: h.type,
        name_or_ticker: h.name_or_ticker,
        quantity: Number(h.quantity || 1),
        cost_basis: Number(h.cost_basis || 0),
        current_value: Number(h.current_value || 0),
        date_acquired: new Date().toISOString(),
        last_updated: new Date().toISOString()
      });
    }

    navigate("/dashboard");
  }

  draw();
}
