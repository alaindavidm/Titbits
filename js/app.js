import { t, setLang, getLang, availableLangs } from "./i18n.js";
import { getCurrentUser, logout } from "./auth.js";
import { getAlerts } from "./finance.js";
import { db } from "./db.js";
import { registerRoute, setOnRouteChange, handleRoute, navigate } from "./router.js";

import { render as landing } from "./views/landing.js";
import { renderLogin, renderSignup, renderVerifyEmail } from "./views/authViews.js";
import { render as onboarding } from "./views/onboarding.js";
import { render as dashboard } from "./views/dashboard.js";
import { render as addEntry } from "./views/addEntry.js";
import { render as transactions } from "./views/transactions.js";
import { render as budget } from "./views/budget.js";
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
registerRoute("/verify-email", renderVerifyEmail, { protected: true });
registerRoute("/onboarding", onboarding, { protected: true });
registerRoute("/dashboard", dashboard, { protected: true });
registerRoute("/add-entry", addEntry, { protected: true });
registerRoute("/transactions", transactions, { protected: true });
registerRoute("/budget", budget, { protected: true });
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
  ["/transactions", "nav.transactions"],
  ["/budget", "nav.budget"],
  ["/emergency-fund", "nav.emergency_fund"],
  ["/investments", "nav.investments"],
  ["/simulation", "nav.simulation"],
  ["/investment-profile", "nav.profile_tool"],
  ["/sentiment", "nav.sentiment"],
  ["/bank-connect", "nav.bank_connect"],
  ["/alerts", "nav.alerts"],
  ["/settings", "nav.settings"]
];

const SIDEBAR_COLLAPSED_KEY = "titbits:sidebarCollapsed";

function isSidebarCollapsed() {
  return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
}

function setSidebarCollapsed(collapsed) {
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? "1" : "0");
  document.getElementById("sidebar").classList.toggle("collapsed", collapsed);
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").hidden = true;
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 760) {
    const opening = !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", opening);
    document.getElementById("sidebar-overlay").hidden = !opening;
  } else {
    setSidebarCollapsed(!isSidebarCollapsed());
  }
}

function avatarMarkup(user) {
  if (user?.profile_picture) return `<img src="${user.profile_picture}" alt="" />`;
  const initial = (user?.first_name || user?.email || "?").charAt(0).toUpperCase();
  return `<span class="avatar-initial">${initial}</span>`;
}

function renderSidebar() {
  const user = getCurrentUser();
  const sidebar = document.getElementById("sidebar");
  const unreadCount = user ? getAlerts(user.id).filter((a) => a.status === "unread").length : 0;

  if (!user) {
    sidebar.innerHTML = "";
    sidebar.classList.add("empty");
    return;
  }
  sidebar.classList.remove("empty");
  sidebar.classList.toggle("collapsed", isSidebarCollapsed());

  sidebar.innerHTML = `
    <nav class="sidebar-links">
      ${NAV_ITEMS.map(
        ([path, key]) =>
          `<a href="#${path}" class="sidebar-link" data-path="${path}">${t(key)}${path === "/alerts" && unreadCount ? `<span class="badge-count">${unreadCount}</span>` : ""}</a>`
      ).join("")}
    </nav>
    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-sm btn-block" id="logout-btn" style="color:#fff;border-color:rgba(255,255,255,0.4)">${t("nav.logout")}</button>
    </div>`;

  sidebar.querySelector("#logout-btn").addEventListener("click", () => {
    logout();
    navigate("/");
  });

  sidebar.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeSidebar));
}

function renderTopbar() {
  const user = getCurrentUser();
  const topbar = document.getElementById("topbar");

  topbar.innerHTML = `
    ${user ? `<button class="hamburger" id="hamburger" aria-label="menu">☰</button>` : ""}
    <a href="#/" class="brand">Titbits<span class="brand-dot">.</span></a>
    <span class="brand-tagline">${t("landing.hero_title")}</span>
    <div class="topbar-spacer"></div>
    <select class="lang-select" id="lang-select">
      ${availableLangs.map((l) => `<option value="${l.code}" ${getLang() === l.code ? "selected" : ""}>${l.label}</option>`).join("")}
    </select>
    ${
      user && user.onboarded
        ? `<div class="topbar-greeting">
            <span class="greeting-text">${t("topbar.greeting", { name: user.first_name || user.email })}</span>
            <div class="avatar" id="avatar-btn" title="${t("topbar.change_photo")}">${avatarMarkup(user)}</div>
          </div>`
        : !user
        ? `<a href="#/login" class="btn btn-ghost btn-sm" style="color:#fff;border-color:rgba(255,255,255,0.4)">${t("nav.login")}</a>
           <a href="#/signup" class="btn btn-accent btn-sm">${t("nav.signup")}</a>`
        : ""
    }`;

  topbar.querySelector("#lang-select").addEventListener("change", (e) => {
    setLang(e.target.value);
    renderAll();
    handleRoute();
  });

  const hamburger = topbar.querySelector("#hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleSidebar);
  }

  const avatarBtn = topbar.querySelector("#avatar-btn");
  if (avatarBtn) {
    avatarBtn.addEventListener("click", () => {
      const fileInput = document.getElementById("avatar-file-input");
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          db.update("users", user.id, { profile_picture: reader.result });
          renderTopbar();
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    });
  }
}

function highlightActive(path) {
  document.querySelectorAll(".sidebar-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.path === path);
  });
}

function renderAll() {
  renderSidebar();
  renderTopbar();
}

document.getElementById("footer-text").textContent = `Titbits — ${t("landing.privacy_note")}`;
document.getElementById("sidebar-overlay").addEventListener("click", closeSidebar);

setOnRouteChange((path) => {
  renderAll();
  highlightActive(path);
  document.getElementById("footer-text").textContent = `Titbits — ${t("landing.privacy_note")}`;
});

renderAll();
handleRoute();
