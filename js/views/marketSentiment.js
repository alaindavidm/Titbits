import { t } from "../i18n.js";
import { getHoldings, mockSentimentForType } from "../finance.js";

export async function render(root, user) {
  const holdings = getHoldings(user.id);
  const types = [...new Set(holdings.map((h) => h.type))];

  root.innerHTML = `
    <div class="container-narrow">
      <h2>${t("sentiment.title")}</h2>
      <div class="notice-box">${t("sentiment.demo_note")}</div>
      <div class="card">
        ${
          types.length
            ? types
                .map((type) => {
                  const s = mockSentimentForType(type);
                  return `
            <div class="sentiment-card">
              <span>${t(`inv.${type}`)}</span>
              <span class="sentiment-badge sentiment-${s}">${t(`sentiment.${s}`)}</span>
            </div>`;
                })
                .join("")
            : `<p>${t("sentiment.no_holdings")}</p>`
        }
      </div>
    </div>`;
}
