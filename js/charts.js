function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

export function progressBar(pct, colorVar, height = 14) {
  const clamped = Math.max(0, Math.min(100, pct));
  return `
    <div class="progress-track" style="height:${height}px">
      <div class="progress-fill" style="width:${clamped}%; background:var(${colorVar})"></div>
    </div>`;
}

export function budgetBars(rows) {
  return rows
    .map(
      (r) => `
    <div class="budget-row">
      <div class="budget-row-head">
        <span class="budget-label">${esc(r.label)}</span>
        <span class="budget-figures">$${r.spent.toFixed(0)} ${esc(r.of)} $${r.allowance.toFixed(0)} ${esc(r.target)}</span>
      </div>
      ${progressBar((r.spent / (r.allowance || 1)) * 100, r.spent > r.allowance ? "--color-warn" : r.colorVar)}
    </div>`
    )
    .join("");
}

export function pieChart(segments, size = 160) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total <= 0) {
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 4}" fill="var(--silver-300)"/></svg>`;
  }
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
  let angle = -90;
  const paths = segments
    .filter((s) => s.value > 0)
    .map((seg) => {
      const frac = seg.value / total;
      const startAngle = angle;
      const endAngle = angle + frac * 360;
      angle = endAngle;
      const large = frac > 0.5 ? 1 : 0;
      const start = polar(cx, cy, r, startAngle);
      const end = polar(cx, cy, r, endAngle);
      return `<path d="M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${large} 1 ${end.x},${end.y} Z" fill="${seg.color}"><title>${esc(seg.label)}: ${Math.round(frac * 100)}%</title></path>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${paths}<circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="var(--surface)"/></svg>`;
}

function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function lineChart(points, width = 560, height = 220, labelSuffix = "") {
  if (!points.length) return "";
  const maxVal = Math.max(...points.map((p) => p.value), 1);
  const padL = 56, padB = 28, padT = 16, padR = 16;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const stepX = points.length > 1 ? w / (points.length - 1) : 0;
  const coords = points.map((p, i) => ({
    x: padL + i * stepX,
    y: padT + h - (p.value / maxVal) * h,
    ...p
  }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${coords[coords.length - 1].x.toFixed(1)},${padT + h} L${coords[0].x.toFixed(1)},${padT + h} Z`;
  const gridLines = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const y = padT + h - f * h;
      const val = maxVal * f;
      return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - padR}" y2="${y.toFixed(1)}" stroke="var(--silver-300)" stroke-width="1"/>
      <text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis-label">$${Math.round(val).toLocaleString()}</text>`;
    })
    .join("");
  const xLabels = coords
    .map((c) => `<text x="${c.x.toFixed(1)}" y="${height - 6}" text-anchor="middle" class="chart-axis-label">${c.year}${labelSuffix}</text>`)
    .join("");
  const dots = coords.map((c) => `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5" fill="var(--forest-700)"><title>Year ${c.year}: $${Math.round(c.value).toLocaleString()}</title></circle>`).join("");
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" class="line-chart">
    ${gridLines}
    <path d="${areaPath}" fill="var(--purple-500)" opacity="0.12"/>
    <path d="${linePath}" fill="none" stroke="var(--forest-700)" stroke-width="2.5"/>
    ${dots}
    ${xLabels}
  </svg>`;
}
