import { t, setLang, getLang, availableLangs } from "./i18n.js";
import { getCurrentUser, logout } from "./auth.js";
import { getAlerts } from "./finance.js";
import { registerRoute, setOnRouteChange, handleRoute, navigate } from "./router.js";

import { render as landing } from "./views/landing.js";
import { renderLogin, renderSignup } from "./views/authViews.js";
import { render as onboarding } from "./views/onboarding.js";
import { render as dashboard } from "./views/dashboard.js";
import { render as addEntry } from "./views/addEntry.js";
import { render as emergencyFund } from "./views/emergencyFund.js";
import { render as investments } from "./views/investments.js";
import { render as simulation } from "./views/simulation.js";
import { render as investmentProfile } from "./views/investmentProfile.js";
import { render as marketSentiment } from "./views/marketSentiment.js";
import { render as alertsCenter } from "./views/alertsCenter.js";
import { render as settings } from "./views/settings.js";
import { render as bankConnect } from "./views/bankConnect.js";

document.documentElement.lang = getLang();

registerRoute("/", landing);
registerRoute("/login", renderLogin);
registerRoute("/signup", renderSignup);
registerRoute("/onboarding", onboarding, { protected: true });
registerRoute("/dashboard", dashboard, { protected: true });
registerRoute("/add-entry", addEntry, { protected: true });
registerRoute("/emergency-fund", emergencyFund, { protected: true });
registerRoute("/investments", investments, { protected: true });
registerRoute("/simulation", simulation, { protected: true });
registerRoute("/investment-profile", investmentProfile, { protected: true });
registerRoute("/sentiment", marketSentiment, { protected: true });
registerRoute("/alerts", alertsCenter, { protected: true });
registerRoute("/settings", settings, { protected: true });
registerRoute("/bank-connect", bankConnect, { protected: true });
registerRoute("/404", landing);

const NAV_ITEMS = [
  ["/dashboard", "nav.dashboard"],
  ["/add-entry", "nav.add_entry"],
  ["/emergency-fund", "nav.emergency_fund"],
  ["/investments", "nav.investments"],
  ["/simulation", "nav.simulation"],
  ["/investment-profile", "nav.profile_tool"],
  ["/sentiment", "nav.sentiment"],
  ["/bank-connect", "nav.bank_connect"],
  ["/alerts", "nav.alerts"],
  ["/settings", "nav.settings"]
];

function renderNav() {
  const user = getCurrentUser();
  const topnav = document.getElementById("topnav");
  const unreadCount = user ? getAlerts(user.id).filter((a) => a.status === "unread").length : 0;

  topnav.innerHTML = `
    <div class="topnav-inner">
      <a href="#/" class="brand">Titbits<span class="brand-dot">.</span></a>
      <button class="hamburger" id="hamburger" aria-label="menu">☰</button>
      <div class="nav-links" id="nav-links">
        ${
          user
            ? NAV_ITEMS.map(
                ([path, key]) =>
                  `<a href="#${path}" class="nav-link" data-path="${path}">${t(key)}${path === "/alerts" && unreadCount ? `<span class="badge-count">${unreadCount}</span>` : ""}</a>`
              ).join("")
            : ""
        }
      </div>
      <div class="nav-right">
        <select class="lang-select" id="lang-select">
          ${availableLangs.map((l) => `<option value="${l.code}" ${getLang() === l.code ? "selected" : ""}>${l.label}</option>`).join("")}
        </select>
        ${
          user
            ? `<button class="btn btn-ghost btn-sm" id="logout-btn" style="color:#fff;border-color:rgba(255,255,255,0.4)">${t("nav.logout")}</button>`
            : `<a href="#/login" class="btn btn-ghost btn-sm" style="color:#fff;border-color:rgba(255,255,255,0.4)">${t("nav.login")}</a>
               <a href="#/signup" class="btn btn-accent btn-sm">${t("nav.signup")}</a>`
        }
      </div>
    </div>`;

  topnav.querySelector("#lang-select").addEventListener("change", (e) => {
    setLang(e.target.value);
    renderNav();
    handleRoute();
  });

  const logoutBtn = topnav.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
      navigate("/");
    });
  }

  const hamburger = topnav.querySelector("#hamburger");
  const navLinks = topnav.querySelector("#nav-links");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));

  highlightActive(location.hash.slice(1) || "/");
}

function highlightActive(path) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.path === path);
  });
  const navLinks = document.getElementById("nav-links");
  if (navLinks) navLinks.classList.remove("open");
}

document.getElementById("footer-text").textContent = `Titbits — ${t("landing.privacy_note")}`;

setOnRouteChange((path) => {
  renderNav();
  highlightActive(path);
  document.getElementById("footer-text").textContent = `Titbits — ${t("landing.privacy_note")}`;
});

renderNav();
handleRoute();
