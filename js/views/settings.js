import { t, setLang, getLang, availableLangs } from "../i18n.js";
import { db, exportUserData, deleteUserData } from "../db.js";
import { logout } from "../auth.js";
import { navigate } from "../router.js";

export async function render(root, user) {
  root.innerHTML = `
    <div class="container-narrow">
      <h2>${t("settings.title")}</h2>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">${t("settings.language")}</div>
        <select id="lang-select">
          ${availableLangs.map((l) => `<option value="${l.code}" ${getLang() === l.code ? "selected" : ""}>${l.label}</option>`).join("")}
        </select>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">${t("settings.notif_prefs")}</div>
        <p class="field-help">${t("settings.channel_note")}</p>
        <div class="checkbox-row"><input type="checkbox" id="c-inapp" checked disabled /><label style="margin:0">${t("settings.channel_inapp")}</label></div>
        <div class="checkbox-row"><input type="checkbox" id="c-email" ${user.notification_preferences?.channel_email ? "checked" : ""} /><label style="margin:0">${t("settings.channel_email")}</label></div>
        <div class="checkbox-row"><input type="checkbox" id="c-push" ${user.notification_preferences?.channel_push ? "checked" : ""} /><label style="margin:0">${t("settings.channel_push")}</label></div>
        <button class="btn btn-ghost btn-sm" id="save-notif">${t("common.save")}</button>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">${t("settings.account")}</div>
        <p><strong>${t("settings.email_label")}:</strong> ${user.email}</p>
        <p><strong>${t("settings.currency")}:</strong> ${user.currency} <span class="form-note">(${t("settings.currency_note")})</span></p>
        <label>${t("onboarding.salary_label")}</label>
        <input type="number" id="salary-input" value="${user.salary}" min="0" step="0.01" />
        <button class="btn btn-ghost btn-sm" id="save-salary">${t("common.save")}</button>
        <div class="form-actions" style="margin-top:20px">
          <button class="btn btn-ghost" id="export-data">${t("settings.export_data")}</button>
          <button class="btn btn-danger" id="delete-account">${t("settings.delete_account")}</button>
        </div>
      </div>
    </div>`;

  root.querySelector("#lang-select").addEventListener("change", (e) => {
    setLang(e.target.value);
    render(root, user);
    document.dispatchEvent(new CustomEvent("lang-changed"));
  });

  root.querySelector("#save-notif").addEventListener("click", () => {
    db.update("users", user.id, {
      notification_preferences: {
        channel_inapp: true,
        channel_email: root.querySelector("#c-email").checked,
        channel_push: root.querySelector("#c-push").checked
      }
    });
  });

  root.querySelector("#save-salary").addEventListener("click", () => {
    db.update("users", user.id, { salary: Number(root.querySelector("#salary-input").value || 0) });
  });

  root.querySelector("#export-data").addEventListener("click", () => {
    const data = exportUserData(user.id);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "titbits-data.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  root.querySelector("#delete-account").addEventListener("click", () => {
    if (confirm(t("settings.delete_confirm"))) {
      deleteUserData(user.id);
      logout();
      navigate("/");
    }
  });
}
