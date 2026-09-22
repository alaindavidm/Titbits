import { t } from "../i18n.js";
import { db } from "../db.js";
import { suggestAllocation } from "../finance.js";
import { pieChart } from "../charts.js";

export async function render(root, user) {
  function draw() {
    const existing = db.where("investmentProfiles", (p) => p.user_id === user.id)[0];

    if (existing) {
      const alloc = existing.generated_suggestions;
      const segments = [
        { label: t("inv.stock"), value: alloc.stock, color: "var(--forest-600)" },
        { label: t("inv.bond"), value: alloc.bond, color: "var(--purple-500)" },
        { label: t("inv.other"), value: alloc.other, color: "var(--silver-600)" }
      ];
      root.innerHTML = `
        <div class="container-narrow">
          <h2>${t("profile.title")}</h2>
          <div class="card">
            <div class="card-title">${t("profile.result_title")}</div>
            <div style="display:flex;align-items:center;gap:20px;justify-content:center;margin:16px 0">
              ${pieChart(segments, 140)}
              <div class="legend" style="flex-direction:column;gap:8px">
                ${segments.map((s) => `<div class="legend-item"><span class="legend-swatch" style="background:${s.color}"></span>${s.label}: ${s.value}%</div>`).join("")}
              </div>
            </div>
            <p class="form-note">${t("profile.not_advice")}</p>
            <button class="btn btn-ghost btn-block" id="retake">${t("profile.retake")}</button>
          </div>
        </div>`;
      root.querySelector("#retake").addEventListener("click", () => {
        db.remove("investmentProfiles", existing.id);
        draw();
      });
      return;
    }

    root.innerHTML = `
      <div class="container-narrow">
        <h2>${t("profile.title")}</h2>
        <div class="card">
          <p>${t("profile.intro")}</p>
          <form id="profile-form">
            <label>${t("profile.risk_q")}</label>
            <div class="radio-group">
              <label class="radio-card"><input type="radio" name="risk" value="conservative" required /> ${t("profile.risk_conservative")}</label>
              <label class="radio-card"><input type="radio" name="risk" value="moderate" /> ${t("profile.risk_moderate")}</label>
              <label class="radio-card"><input type="radio" name="risk" value="aggressive" /> ${t("profile.risk_aggressive")}</label>
            </div>
            <label>${t("profile.goal_q")}</label>
            <select name="goal">
              <option value="retirement">${t("profile.goal_retirement")}</option>
              <option value="house">${t("profile.goal_house")}</option>
              <option value="wealth">${t("profile.goal_wealth")}</option>
              <option value="education">${t("profile.goal_education")}</option>
            </select>
            <label>${t("profile.horizon_q")}</label>
            <select name="horizon">
              <option value="short">${t("profile.horizon_short")}</option>
              <option value="mid">${t("profile.horizon_mid")}</option>
              <option value="long">${t("profile.horizon_long")}</option>
            </select>
            <button class="btn btn-accent btn-block" type="submit">${t("profile.submit")}</button>
          </form>
        </div>
      </div>`;

    root.querySelector("#profile-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const risk = fd.get("risk");
      db.insert("investmentProfiles", {
        user_id: user.id,
        risk_tolerance: risk,
        goals: fd.get("goal"),
        time_horizon: fd.get("horizon"),
        questionnaire_responses: { risk, goal: fd.get("goal"), horizon: fd.get("horizon") },
        generated_suggestions: suggestAllocation(risk)
      });
      draw();
    });
  }

  draw();
}
