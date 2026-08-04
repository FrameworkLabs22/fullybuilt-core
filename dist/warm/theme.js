const _varCache = {};
function readVar(name, fallback) {
  if (typeof document === "undefined") return fallback;
  const cached = _varCache[name];
  if (cached) return cached;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (val) {
    _varCache[name] = val;
    return val;
  }
  return fallback;
}
function resetWarmCache() {
  for (const key in _varCache) delete _varCache[key];
}
const BASE = {
  // ── neutrals (shared across all clients) ──
  bg: "#F7F8FA",
  card: "#FFFFFF",
  /** Faintly-lifted surface for a panel sitting on top of a card. */
  cardRaised: "#FCFCFD",
  // ── the text triad ──
  // Three tiers, each a real step apart: headings/values → body/table text →
  // labels/subtext. The middle tier is deliberately dark; a mid-gray body tier
  // reads as disabled next to a near-black heading, and the faintest tier has to
  // stay legible because it carries units, timestamps and column labels.
  ink: "#1C1E24",
  sub: "#3E424A",
  faint: "#6E727B",
  border: "#E7E9EE",
  borderStrong: "#D8DBE1",
  chip: "#EEF0F3",
  track: "#ECEEF2",
  // ── per-client brand/accent (resolve from CSS vars; see BRAND_VARS) ──
  primary: "#0E0E06",
  primarySoft: "#F6F6AE",
  pos: "#2B9E8F",
  posSoft: "#E4F4F1",
  blue: "#29C0DD",
  // chart line/stroke accent
  blueSoft: "#FCFAD0",
  // area fills
  blueMid: "#F6F949",
  // standalone bars/funnel
  cream: "#F4F5F6",
  navy: "#0E0E06",
  // ── KPI % badges (AA-safe semantic green/red; shared, not chart series) ──
  badgePos: "#15803D",
  badgePosBg: "#DCFCE7",
  badgeNeg: "#B42318",
  badgeNegBg: "#FCE7E6",
  warn: "#C77A1E",
  warnSoft: "#FBF1E2",
  danger: "#d94a36",
  dangerSoft: "#FCE7E6",
  // ── extra chart/state tones ──
  /** Overstock / cash-tied-up. Indigo sits at the same OKLCH brightness band as
   *  `pos`/`danger`, so "too much stock" reads as a real state and not as the
   *  gray of missing data. */
  excess: "#667DBC",
  excessSoft: "#EBF0FD",
  /** Plan / baseline series in charts. A chart tone on purpose — deliberately NOT
   *  tied to the text triad, so retuning body text can't shift a chart. */
  slate: "#6E727B"
};
const BRAND_VARS = {
  bg: "--warm-bg",
  card: "--warm-card",
  cardRaised: "--warm-card-raised",
  ink: "--warm-ink",
  sub: "--warm-sub",
  faint: "--warm-faint",
  border: "--warm-border",
  borderStrong: "--warm-border-strong",
  chip: "--warm-chip",
  track: "--warm-track",
  primary: "--warm-primary",
  primarySoft: "--warm-primary-soft",
  pos: "--warm-pos",
  posSoft: "--warm-pos-soft",
  warn: "--warm-warn",
  warnSoft: "--warm-warn-soft",
  danger: "--warm-danger",
  dangerSoft: "--warm-danger-soft",
  excess: "--warm-excess",
  excessSoft: "--warm-excess-soft",
  slate: "--warm-slate",
  blue: "--warm-chart-line",
  blueSoft: "--warm-chart-fill",
  blueMid: "--warm-chart-bar",
  cream: "--warm-cream",
  navy: "--warm-navy"
};
const WARM = new Proxy(BASE, {
  get(target, prop) {
    const varName = BRAND_VARS[prop];
    if (varName) return readVar(varName, target[prop]);
    return target[prop];
  }
});
const ACCENT_FALLBACK = [
  "#FCF4E9",
  // 50
  "#F5E6D0",
  // 100
  "#E9D0AC",
  // 200
  "#D5B17A",
  // 300
  "#C19653",
  // 400 — focus rings
  "#B8893A",
  // 500 — the base brand step
  "#9E711C",
  // 600
  "#845A00",
  // 700
  "#694500",
  // 800
  "#513400"
  // 900
];
const ACCENT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const ACCENT = new Proxy({}, {
  get(_t, prop) {
    const stop = Number(prop);
    const i = ACCENT_STOPS.indexOf(stop);
    if (i === -1) return void 0;
    return readVar(`--accent-${stop}`, ACCENT_FALLBACK[i]);
  }
});
const axisTick = {
  fontSize: 11,
  get fill() {
    return WARM.faint;
  }
};
const chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    get border() {
      return `1px solid ${WARM.border}`;
    },
    background: "#fff"
  },
  cursor: {
    get fill() {
      return WARM.chip;
    },
    fillOpacity: 0.6
  }
};
const SERIES_FALLBACK = [
  "#0E0E06",
  // primary
  "#29C0DD",
  // chart accent
  "#C77A1E",
  // amber
  "#cfdd28",
  // lime
  "#8E9DAC",
  // slate gray
  "#2B9E8F",
  // teal
  "#3E5871",
  // slate navy
  "#5C7AA8",
  // steel blue
  "#4C6FA0",
  // deep blue
  "#A9C2DD",
  // light steel blue
  "#B8CDE5",
  // soft blue tint
  "#B87A1C"
  // dark amber
];
const CHART_SERIES = new Proxy(SERIES_FALLBACK, {
  get(target, prop) {
    if (typeof prop === "string" && /^\d+$/.test(prop)) {
      const i = Number(prop);
      return readVar(`--warm-series-${i + 1}`, target[i]);
    }
    return target[prop];
  }
});
const seriesColor = (i) => CHART_SERIES[i % CHART_SERIES.length];
const GRID = {
  strokeDasharray: "3 3",
  get stroke() {
    return WARM.track;
  }
};
const AXIS_TICK = axisTick;
const TOOLTIP_STYLE = chartTip.contentStyle;
export {
  ACCENT,
  AXIS_TICK,
  CHART_SERIES,
  GRID,
  TOOLTIP_STYLE,
  WARM,
  axisTick,
  chartTip,
  resetWarmCache,
  seriesColor
};
//# sourceMappingURL=theme.js.map