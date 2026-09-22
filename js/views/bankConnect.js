import { t } from "../i18n.js";

export async function render(root) {
  root.innerHTML = `
    <div class="container-narrow">
      <h2>${t("bank.title")}</h2>
      <div class="card">
        <p>${t("bank.body")}</p>
        <p class="form-note" style="margin-bottom:20px">${t("bank.manual_note")}</p>
        <div class="grid-2">
          <button class="btn btn-ghost" disabled>${t("bank.connect_bank")}</button>
          <button class="btn btn-ghost" disabled>${t("bank.connect_moncash")}</button>
        </div>
      </div>
    </div>`;
}
