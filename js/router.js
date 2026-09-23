import { getCurrentUser } from "./auth.js";

const routes = {};

export function registerRoute(path, handler, opts = {}) {
  routes[path] = { handler, protected: !!opts.protected };
}

export function navigate(path) {
  if (location.hash.slice(1) === path) {
    handleRoute();
  } else {
    location.hash = path;
  }
}

let onRouteChange = () => {};
export function setOnRouteChange(fn) {
  onRouteChange = fn;
}

export async function handleRoute() {
  const path = location.hash.slice(1) || "/";
  const route = routes[path] || routes["/404"];
  const user = getCurrentUser();

  if (route.protected && !user) {
    location.hash = "/login";
    return;
  }
  if ((path === "/login" || path === "/signup" || path === "/") && user) {
    location.hash = user.onboarded ? "/dashboard" : user.email_verified ? "/onboarding" : "/verify-email";
    return;
  }
  if (user && path === "/verify-email" && user.email_verified) {
    location.hash = user.onboarded ? "/dashboard" : "/onboarding";
    return;
  }
  if (user && !user.onboarded && route.protected && path !== "/onboarding" && path !== "/verify-email") {
    location.hash = user.email_verified ? "/onboarding" : "/verify-email";
    return;
  }

  const page = document.getElementById("page");
  page.innerHTML = "";
  await route.handler(page, user);
  onRouteChange(path, user);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", handleRoute);
