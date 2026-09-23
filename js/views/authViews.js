import { t } from "../i18n.js";
import { login, signup, verifyEmailCode, resendVerificationCode, getCurrentUser } from "../auth.js";
import { COUNTRIES } from "../countries.js";
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
          <div class="grid-2">
            <div><label>${t("auth.first_name")}</label><input type="text" name="firstName" required /></div>
            <div><label>${t("auth.last_name")}</label><input type="text" name="lastName" required /></div>
          </div>
          <div class="grid-2">
            <div><label>${t("auth.date_of_birth")}</label><input type="date" name="dob" required /></div>
            <div><label>${t("auth.country")}</label>
              <select name="country" required>
                <option value="" disabled selected>${t("auth.select_country")}</option>
                ${COUNTRIES.map((c) => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </div>
          </div>
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
      await signup({
        email: fd.get("email"),
        password,
        firstName: fd.get("firstName"),
        lastName: fd.get("lastName"),
        dateOfBirth: fd.get("dob"),
        country: fd.get("country")
      });
      navigate("/verify-email");
    } catch (err) {
      const msg = err.message === "EMAIL_EXISTS" ? t("auth.error_exists") : t("auth.error_weak");
      errBox.innerHTML = `<div class="form-error">${msg}</div>`;
    }
  });
}

export async function renderVerifyEmail(root, user) {
  function draw() {
    const current = getCurrentUser() || user;
    root.innerHTML = `
      <div class="container-narrow">
        <div class="card auth-card">
          <h2>${t("auth.verify_title")}</h2>
          <p>${t("auth.verify_body", { email: current.email })}</p>
          <div class="notice-box" style="text-align:center;font-size:28px;font-weight:800;letter-spacing:0.3em">
            ${current.email_verification_code || ""}
          </div>
          <div id="err"></div>
          <form id="verify-form">
            <label>${t("auth.verify_code_label")}</label>
            <input type="text" name="code" inputmode="numeric" maxlength="6" required />
            <button class="btn btn-primary btn-block" type="submit">${t("auth.verify_button")}</button>
          </form>
          <div class="form-actions" style="justify-content:space-between;margin-top:16px">
            <button class="btn btn-ghost btn-sm" id="resend">${t("auth.resend_code")}</button>
            <button class="btn btn-ghost btn-sm" id="skip">${t("auth.skip_verification")}</button>
          </div>
        </div>
      </div>`;

    root.querySelector("#verify-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const errBox = root.querySelector("#err");
      try {
        verifyEmailCode(current.id, fd.get("code"));
        navigate("/onboarding");
      } catch {
        errBox.innerHTML = `<div class="form-error">${t("auth.error_code_invalid")}</div>`;
      }
    });

    root.querySelector("#resend").addEventListener("click", () => {
      resendVerificationCode(current.id);
      draw();
    });

    root.querySelector("#skip").addEventListener("click", () => {
      navigate("/onboarding");
    });
  }

  draw();
}
