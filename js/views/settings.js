import { t } from "../i18n.js";
import { db, exportUserData, deleteUserData } from "../db.js";
import { logout } from "../auth.js";
import { navigate } from "../router.js";
import { COUNTRIES } from "../countries.js";

export async function render(root, user) {
  root.innerHTML = `
    <div class="container-narrow">
      <h2>${t("settings.title")}</h2>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">${t("settings.account")}</div>
        <p><strong>${t("settings.email_label")}:</strong> ${user.email} ${user.email_verified ? "✓" : ""}</p>
        <div class="grid-2">
          <div><label>${t("auth.first_name")}</label><input type="text" id="first-name-input" value="${user.first_name || ""}" /></div>
          <div><label>${t("auth.last_name")}</label><input type="text" id="last-name-input" value="${user.last_name || ""}" /></div>
        </div>
        <div class="grid-2">
          <div><label>${t("auth.date_of_birth")}</label><input type="date" id="dob-input" value="${user.date_of_birth || ""}" /></div>
          <div><label>${t("auth.country")}</label>
            <select id="country-input">
              ${COUNTRIES.map((c) => `<option value="${c}" ${user.country === c ? "selected" : ""}>${c}</option>`).join("")}
            </select>
          </div>
        </div>
        <p><strong>${t("settings.currency")}:</strong> ${user.currency} <span class="form-note">(${t("settings.currency_note")})</span></p>
        <label>${t("onboarding.salary_label")}</label>
        <input type="number" id="salary-input" value="${user.salary}" min="0" step="0.01" />
        <button class="btn btn-ghost btn-sm" id="save-profile">${t("common.save")}</button>
        <div class="form-actions" style="margin-top:20px">
          <button class="btn btn-ghost" id="export-data">${t("settings.export_data")}</button>
          <button class="btn btn-danger" id="delete-account">${t("settings.delete_account")}</button>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">${t("settings.notif_prefs")}</div>
        <p class="field-help">${t("settings.channel_note")}</p>
        <div class="checkbox-row"><input type="checkbox" id="c-inapp" checked disabled /><label style="margin:0">${t("settings.channel_inapp")}</label></div>
        <div class="checkbox-row"><input type="checkbox" id="c-email" ${user.notification_preferences?.channel_email ? "checked" : ""} /><label style="margin:0">${t("settings.channel_email")}</label></div>
        <div class="checkbox-row"><input type="checkbox" id="c-push" ${user.notification_preferences?.channel_push ? "checked" : ""} /><label style="margin:0">${t("settings.channel_push")}</label></div>
        <button class="btn btn-ghost btn-sm" id="save-notif">${t("common.save")}</button>
      </div>
    </div>`;

  root.querySelector("#save-profile").addEventListener("click", () => {
    db.update("users", user.id, {
      first_name: root.querySelector("#first-name-input").value,
      last_name: root.querySelector("#last-name-input").value,
      date_of_birth: root.querySelector("#dob-input").value,
      country: root.querySelector("#country-input").value,
      salary: Number(root.querySelector("#salary-input").value || 0)
    });
    navigate("/settings");
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
