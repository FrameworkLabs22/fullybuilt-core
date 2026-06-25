/**
 * Warm Editorial (Direction A) — literal palette + Recharts styling helpers.
 *
 * Mirrors the `--warm-*` CSS variables in index.css. Components style color via
 * Tailwind `warm-*` classes; this object exists for the places that need literal
 * values — chiefly Recharts series/strokes, which take SVG color props.
 */
export const WARM = {
  bg: "#F7F8FA",
  card: "#FFFFFF",
  ink: "#1C1E24",
  sub: "#6E727B",
  faint: "#A6ABB5",
  border: "#E7E9EE",
  borderStrong: "#D8DBE1",
  chip: "#EEF0F3",
  track: "#ECEEF2",
  primary: "#0E0E06",
  primarySoft: "#F6F6AE",
  pos: "#2B9E8F",
  posSoft: "#E4F4F1",
  blue: "#29C0DD",      // cyan — chart line/stroke accent (legible on white)
  blueSoft: "#FCFAD0",  // yellow tint — area fills
  blueMid: "#F6F949",   // acid yellow — standalone bars/funnel
  // KPI % badges (AA-safe; brighter than WARM.pos teal). UI badges only, not chart series.
  badgePos: "#15803D",
  badgePosBg: "#DCFCE7",
  badgeNeg: "#B42318",
  badgeNegBg: "#FCE7E6",
  warn: "#C77A1E",
  warnSoft: "#FBF1E2",
  danger: "#d94a36",
  cream: "#F4F5F6",
  navy: "#0E0E06",
} as const;

/** Recharts axis tick style. (WARM.sub, not WARM.faint, to clear WCAG AA contrast on the light bg.) */
export const axisTick = { fontSize: 11, fill: WARM.sub } as const;

/** Recharts <Tooltip> props for a soft warm container. */
export const chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    border: `1px solid ${WARM.border}`,
    background: "#fff",
  },
  // Hover highlight behind the active bar — a light grey instead of Recharts'
  // dark default. (Only affects bar charts; line/area cursors use a stroke.)
  cursor: { fill: WARM.chip, fillOpacity: 0.6 },
} as const;

/**
 * Brand-led categorical palette for multi-series charts (fees mix, AI charts).
 * Built from the Sidekick palette plus muted slate/tint extensions — no
 * off-brand blues/violets/pinks.
 */
// Ordered so the first six hues are maximally distinct (and hold up for color-blind
// viewers) before any blues cluster — most charts use ≤3 series, so the common case
// never collides. Positions 0/1 stay navy + light-blue (the 2-series default).
export const CHART_SERIES = [
  WARM.primary, // navy
  WARM.blue,    // light blue
  WARM.warn,    // amber
  "#cfdd28",    // lime
  "#8E9DAC",    // slate gray
  WARM.pos,     // teal
  "#3E5871",    // slate navy
  "#5C7AA8",    // steel blue
  "#4C6FA0",    // deep blue
  "#A9C2DD",    // light steel blue
  "#B8CDE5",    // soft blue tint
  "#B87A1C",    // dark amber
] as const;

/** Pick a series color by index (cycles through the palette). */
export const seriesColor = (i: number) => CHART_SERIES[i % CHART_SERIES.length];

/** Faint dashed grid. Spread onto <CartesianGrid {...GRID} />. */
export const GRID = {
  strokeDasharray: "3 3",
  stroke: WARM.track,
} as const;

/** UPPER_CASE aliases so charts can use one import style everywhere. */
export const AXIS_TICK = axisTick;
export const TOOLTIP_STYLE = chartTip.contentStyle;
