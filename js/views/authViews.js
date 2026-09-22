import { t } from "../i18n.js";
import { login, signup } from "../auth.js";
import { navigate } from "../router.js";

export async function renderLogin(root) {
  root.innerHTML = `
    <div class="container-narrow">
      <div class="card auth-card">
        <h2>${t("auth.login_title")}</h2>
        <div id="err"></div>
        <form id="login-form">
          <label>${t("auth.email")}</label>
          <input type="email" name="email" required />
          <label>${t("auth.password")}</label>
          <input type="password" name="password" required />
          <button class="btn btn-primary btn-block" type="submit">${t("auth.login_button")}</button>
        </form>
        <p class="auth-switch">${t("auth.no_account")} <a href="#/signup">${t("auth.create_one")}</a></p>
      </div>
    </div>`;

  root.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errBox = root.querySelector("#err");
    errBox.innerHTML = "";
    try {
      await login(fd.get("email"), fd.get("password"));
      navigate("/dashboard");
    } catch {
      errBox.innerHTML = `<div class="form-error">${t("auth.error_invalid")}</div>`;
    }
  });
}

export async function renderSignup(root) {
  root.innerHTML = `
    <div class="container-narrow">
      <div class="card auth-card">
        <h2>${t("auth.signup_title")}</h2>
        <div id="err"></div>
        <form id="signup-form">
          <label>${t("auth.email")}</label>
          <input type="email" name="email" required />
          <label>${t("auth.password")}</label>
          <input type="password" name="password" required minlength="6" />
          <label>${t("auth.confirm_password")}</label>
          <input type="password" name="confirm" required minlength="6" />
          <p class="form-note">${t("auth.demo_note")}</p>
          <button class="btn btn-primary btn-block" type="submit">${t("auth.signup_button")}</button>
        </form>
        <p class="auth-switch">${t("auth.have_account")} <a href="#/login">${t("auth.log_in_link")}</a></p>
      </div>
    </div>`;

  root.querySelector("#signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errBox = root.querySelector("#err");
    errBox.innerHTML = "";
    const password = fd.get("password");
    const confirm = fd.get("confirm");
    if (password !== confirm) {
      errBox.innerHTML = `<div class="form-error">${t("auth.error_mismatch")}</div>`;
      return;
    }
    try {
      await signup(fd.get("email"), password);
      navigate("/onboarding");
    } catch (err) {
      const msg = err.message === "EMAIL_EXISTS" ? t("auth.error_exists") : t("auth.error_weak");
      errBox.innerHTML = `<div class="form-error">${msg}</div>`;
    }
  });
}
