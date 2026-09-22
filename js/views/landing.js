import { t } from "../i18n.js";

export async function render(root) {
  root.innerHTML = `
    <section class="hero">
      <h1>${t("landing.hero_title")}</h1>
      <p>${t("landing.hero_sub")}</p>
      <div class="hero-actions">
        <a href="#/signup" class="btn btn-accent">${t("landing.cta_start")}</a>
        <a href="#/login" class="btn btn-ghost">${t("landing.cta_login")}</a>
      </div>
    </section>
    <div class="features">
      ${feature("⚡", "f1_title", "f1_body")}
      ${feature("📊", "f2_title", "f2_body")}
      ${feature("🔔", "f3_title", "f3_body")}
      ${feature("📈", "f4_title", "f4_body")}
    </div>
    <p class="privacy-strip">${t("landing.privacy_note")}</p>
  `;
}

function feature(icon, titleKey, bodyKey) {
  return `
    <div class="card feature-card">
      <div class="feature-icon">${icon}</div>
      <h3>${t(`landing.${titleKey}`)}</h3>
      <p>${t(`landing.${bodyKey}`)}</p>
    </div>`;
}
