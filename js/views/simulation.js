import { t } from "../i18n.js";
import { db } from "../db.js";
import { simulateGrowth, portfolioSummary, investmentTargetForMonth } from "../finance.js";
import { lineChart } from "../charts.js";

const RATE_PRESETS = { conservative: 4, moderate: 7, aggressive: 10 };

export async function render(root, user) {
  const summary = portfolioSummary(user.id);
  const formState = {
    capital: summary.totalValue || 0,
    contribution: Number(investmentTargetForMonth(user).toFixed(0)),
    years: 10,
    preset: "moderate",
    custom_rate: 7
  };

  function draw(result) {
    root.innerHTML = `
      <div class="container">
        <h2>${t("sim.title")}</h2>
        <div class="notice-box">${t("sim.disclaimer")}</div>
        <div class="grid-2">
          <div class="card">
            <form id="sim-form">
              <label>${t("sim.current_capital")}</label>
              <input type="number" name="capital" min="0" step="0.01" value="${formState.capital}" />
              <label>${t("sim.monthly_contribution")}</label>
              <input type="number" name="contribution" min="0" step="0.01" value="${formState.contribution}" />
              <label>${t("sim.years")}</label>
              <input type="number" name="years" min="1" max="40" value="${formState.years}" />
              <label>${t("sim.rate_preset")}</label>
              <div class="radio-group">
                ${["conservative", "moderate", "aggressive", "custom"]
                  .map(
                    (p) => `
                  <label class="radio-card ${formState.preset === p ? "selected" : ""}">
                    <input type="radio" name="preset" value="${p}" ${formState.preset === p ? "checked" : ""} />
                    ${t(`sim.${p}`)}
                  </label>`
                  )
                  .join("")}
              </div>
              <div id="custom-rate-wrap" style="${formState.preset === "custom" ? "" : "display:none"}">
                <label>${t("sim.custom_rate")}</label>
                <input type="number" name="custom_rate" min="0" max="30" step="0.1" value="${formState.custom_rate}" />
              </div>
              <button class="btn btn-primary btn-block" type="submit">${t("sim.run")}</button>
            </form>
          </div>
          <div class="card">
            ${
              result
                ? `
              <div class="card-title">${t("sim.projected_value", { years: result.years })}</div>
              <div class="stat-value">$${Math.round(result.finalValue).toLocaleString()}</div>
              <div class="stat-sub">${t("sim.total_contributed")}: $${Math.round(result.totalContributed).toLocaleString()}</div>
              <div class="stat-sub">${t("sim.growth_from_returns")}: $${Math.round(result.growthFromReturns).toLocaleString()}</div>
              <div style="margin-top:16px">${lineChart(result.points, 480, 220)}</div>
            `
                : `<div class="empty-state"><p>${t("sim.run")} →</p></div>`
            }
          </div>
        </div>
      </div>`;

    function syncFormState() {
      const fd = new FormData(root.querySelector("#sim-form"));
      formState.capital = Number(fd.get("capital") || 0);
      formState.contribution = Number(fd.get("contribution") || 0);
      formState.years = Number(fd.get("years") || 10);
      formState.preset = fd.get("preset") || formState.preset;
      formState.custom_rate = Number(fd.get("custom_rate") || 7);
    }

    root.querySelectorAll('input[name="preset"]').forEach((r) =>
      r.addEventListener("change", () => {
        syncFormState();
        run(false);
      })
    );

    root.querySelector("#sim-form").addEventListener("submit", (e) => {
      e.preventDefault();
      syncFormState();
      run(true);
    });

    function run(submit) {
      const rate = formState.preset === "custom" ? formState.custom_rate : RATE_PRESETS[formState.preset];
      const res = simulateGrowth(formState.capital, formState.contribution, rate, formState.years);
      const runRecord = { ...res, years: formState.years };
      if (submit) {
        db.insert("simulationRuns", {
          user_id: user.id,
          inputs: { current_capital: formState.capital, monthly_contribution: formState.contribution, assumed_rate: rate, years: formState.years },
          outputs: { projected_values_by_year: res.points }
        });
      }
      draw(runRecord);
    }
  }

  draw(null);
}
