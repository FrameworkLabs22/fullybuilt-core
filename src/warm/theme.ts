/**
 * Warm Editorial (Direction A) — palette + Recharts styling helpers.
 *
 * NEUTRALS (bg/card/ink/borders/badges/warn/danger) are shared across every
 * client and stay as literals here.
 *
 * BRAND/CHART colors are per-client. They resolve at runtime from `--warm-*` CSS
 * variables (defined in each app's index.css) so the shared package carries no
 * client's palette — each dashboard keeps its own brand. The literals below are
 * FALLBACKS (the original Untoxicated values) used when a var isn't defined, so a
 * client that hasn't declared the vars still renders sensibly.
 *
 * Why runtime resolution (not `var(...)` strings): Recharts passes colors as SVG
 * presentation attributes, where `var()` does not resolve. Reading the computed
 * value yields a literal hex that works everywhere.
 */

// Resolve a CSS custom property to a literal value, memoized. Falls back until the
// stylesheet is applied (we don't cache empties, so it retries until vars exist).
const _varCache: Record<string, string> = {};
function readVar(name: string, fallback: string): string {
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

/**
 * Clear the resolved `--warm-*` cache so `WARM`/`CHART_SERIES` re-read from the DOM on next
 * access. Call this RIGHT AFTER injecting a new client's brand tokens — e.g. when the active
 * client changes (FB-staff switch, or a single deploy resolving the client async after login).
 * Without it, the first paint's palette (the default client's) stays cached and charts never
 * re-theme. Synchronous per-client deploys don't need it (first read is already the right
 * client), but it makes runtime client-switching re-theme correctly.
 */
export function resetWarmCache(): void {
  for (const key in _varCache) delete _varCache[key];
}

// Full palette with Untoxicated fallbacks. Neutrals are the shared system; the
// keys listed in BRAND_VARS below are overridable per client via CSS vars.
const BASE = {
  // ── neutrals (shared across all clients) ──
  bg: "#F7F8FA",
  card: "#FFFFFF",
  ink: "#1C1E24",
  sub: "#6E727B",
  faint: "#A6ABB5",
  border: "#E7E9EE",
  borderStrong: "#D8DBE1",
  chip: "#EEF0F3",
  track: "#ECEEF2",
  // ── per-client brand/accent (resolve from CSS vars; see BRAND_VARS) ──
  primary: "#0E0E06",
  primarySoft: "#F6F6AE",
  pos: "#2B9E8F",
  posSoft: "#E4F4F1",
  blue: "#29C0DD",      // chart line/stroke accent
  blueSoft: "#FCFAD0",  // area fills
  blueMid: "#F6F949",   // standalone bars/funnel
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
} as const;

// Per-client keys → the CSS variable each resolves from. Keys NOT listed stay literal.
const BRAND_VARS: Partial<Record<keyof typeof BASE, string>> = {
  primary: "--warm-primary",
  primarySoft: "--warm-primary-soft",
  pos: "--warm-pos",
  posSoft: "--warm-pos-soft",
  blue: "--warm-chart-line",
  blueSoft: "--warm-chart-fill",
  blueMid: "--warm-chart-bar",
  cream: "--warm-cream",
  navy: "--warm-navy",
};

/**
 * Warm palette. Neutral keys are literal; brand keys resolve per-client from CSS
 * vars at access time (so reads during render pick up the host app's index.css).
 */
export const WARM = new Proxy(BASE as Record<string, string>, {
  get(target, prop: string) {
    const varName = BRAND_VARS[prop as keyof typeof BASE];
    if (varName) return readVar(varName, target[prop]);
    return target[prop];
  },
}) as { -readonly [K in keyof typeof BASE]: string };

/** Recharts axis tick style. (WARM.sub clears WCAG AA contrast on the light bg.) */
export const axisTick = { fontSize: 11, fill: WARM.sub } as const;

/** Recharts <Tooltip> props for a soft warm container. */
export const chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    border: `1px solid ${WARM.border}`,
    background: "#fff",
  },
  cursor: { fill: WARM.chip, fillOpacity: 0.6 },
} as const;

/**
 * Brand-led categorical palette for multi-series charts (fees mix, AI charts).
 * Per-client: resolves from `--warm-series-1..12` with the original Untoxicated
 * palette as fallback. Consumed as an array (indexing / .map) — the Proxy resolves
 * each index lazily so charts pick up the host app's series colors.
 */
const SERIES_FALLBACK = [
  "#0E0E06", // primary
  "#29C0DD", // chart accent
  "#C77A1E", // amber
  "#cfdd28", // lime
  "#8E9DAC", // slate gray
  "#2B9E8F", // teal
  "#3E5871", // slate navy
  "#5C7AA8", // steel blue
  "#4C6FA0", // deep blue
  "#A9C2DD", // light steel blue
  "#B8CDE5", // soft blue tint
  "#B87A1C", // dark amber
] as const;

export const CHART_SERIES = new Proxy(SERIES_FALLBACK as unknown as string[], {
  get(target, prop: string) {
    if (typeof prop === "string" && /^\d+$/.test(prop)) {
      const i = Number(prop);
      return readVar(`--warm-series-${i + 1}`, target[i]);
    }
    return (target as any)[prop];
  },
}) as unknown as readonly string[];

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
