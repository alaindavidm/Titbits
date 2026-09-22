import { t } from "../i18n.js";
import { db } from "../db.js";
import { getAlerts, recomputeAlerts } from "../finance.js";
import { getAlertContent } from "../alertContent.js";

export async function render(root, user) {
  recomputeAlerts(user);
  let filter = "all";

  function draw() {
    const all = getAlerts(user.id);
    const shown = filter === "unread" ? all.filter((a) => a.status === "unread") : all;

    root.innerHTML = `
      <div class="container">
        <h2>${t("alerts.title")}</h2>
        <div class="tabs">
          <button class="tab-btn ${filter === "all" ? "active" : ""}" data-filter="all">${t("alerts.filter_all")}</button>
          <button class="tab-btn ${filter === "unread" ? "active" : ""}" data-filter="unread">${t("alerts.filter_unread")}</button>
        </div>
        <div class="card">
          ${shown.length ? shown.map((a) => renderAlert(a)).join("") : `<p>${t("alerts.no_alerts")}</p>`}
        </div>
      </div>`;

    root.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        filter = b.dataset.filter;
        draw();
      })
    );
    root.querySelectorAll("[data-read]").forEach((b) =>
      b.addEventListener("click", () => {
        db.update("alerts", b.dataset.read, { status: "read" });
        draw();
      })
    );
    root.querySelectorAll("[data-dismiss]").forEach((b) =>
      b.addEventListener("click", () => {
        db.update("alerts", b.dataset.dismiss, { status: "dismissed" });
        draw();
      })
    );
  }

  function renderAlert(a) {
    const content = getAlertContent(a, user);
    return `
      <div class="alert-item ${a.status === "unread" ? "unread" : ""}">
        <div class="alert-item-head">
          <span class="alert-type-tag">${t(`alerts.types.${a.type}`)}</span>
          <span class="alert-time">${new Date(a.created_at).toLocaleString()}</span>
        </div>
        <div class="alert-message">${content.title}</div>
        ${content.why ? `<div class="alert-why"><strong>${t("alerts.why")}:</strong> ${content.why}</div>` : ""}
        ${content.suggestion ? `<div class="alert-suggestion"><strong>${t("alerts.suggestion")}:</strong> ${content.suggestion}</div>` : ""}
        <div class="alert-actions">
          ${a.status === "unread" ? `<button class="btn btn-ghost btn-sm" data-read="${a.id}">${t("alerts.mark_read")}</button>` : ""}
          ${a.status !== "dismissed" ? `<button class="btn btn-ghost btn-sm" data-dismiss="${a.id}">${t("alerts.dismiss")}</button>` : ""}
        </div>
      </div>`;
  }

  draw();
}
