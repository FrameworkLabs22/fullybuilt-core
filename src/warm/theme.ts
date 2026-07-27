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
  dangerSoft: "#FCE7E6",
  // ── extra chart/state tones ──
  /** Overstock / cash-tied-up. Indigo sits at the same OKLCH brightness band as
   *  `pos`/`danger`, so "too much stock" reads as a real state and not as the
   *  gray of missing data. */
  excess: "#667DBC",
  excessSoft: "#EBF0FD",
  /** Plan / baseline series in charts. A chart tone on purpose — deliberately NOT
   *  tied to the text triad, so retuning body text can't shift a chart. */
  slate: "#6E727B",
} as const;

// Per-client keys → the CSS variable each resolves from. Keys NOT listed stay literal.
//
// The text triad and the neutral surfaces resolve from vars too (not just the
// brand keys). They rarely change per client, but Tailwind already reads them as
// `var(--warm-*)` for `text-warm-sub` etc. — if the JS side kept its own literal,
// the same token would have two sources of truth and a client override would move
// the CSS half while the JS half (chart labels, inline styles) stayed behind.
const BRAND_VARS: Partial<Record<keyof typeof BASE, string>> = {
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

/**
 * LAYER 2 — the functional accent ramp.
 *
 * Ten steps in the active client's brand hue, resolved from `--accent-50` …
 * `--accent-900` (see `lib/ramp.ts`, which generates them). Reserved for
 * interaction affordances ONLY: focus rings, input focus glow, slider thumbs,
 * hover emphasis.
 *
 * Never paint a surface with it and never use it as a chart series. Surfaces are
 * Layer 1 (neutrals); charts have their own series palette. An accent that shows
 * up as decoration stops reading as "this is the thing you're touching", which is
 * the entire job of the ramp.
 *
 * Fallback values are the original Osmo gold, so a client that has not had its
 * ramp generated still renders a designed accent rather than an unstyled blue.
 */
const ACCENT_FALLBACK = [
  "#FCF4E9", // 50
  "#F5E6D0", // 100
  "#E9D0AC", // 200
  "#D5B17A", // 300
  "#C19653", // 400 — focus rings
  "#B8893A", // 500 — the base brand step
  "#9E711C", // 600
  "#845A00", // 700
  "#694500", // 800
  "#513400", // 900
] as const;

const ACCENT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

/** Accent ramp keyed by stop: `ACCENT[400]`. Resolves per client at access time. */
export const ACCENT = new Proxy({} as Record<number, string>, {
  get(_t, prop: string) {
    const stop = Number(prop);
    const i = ACCENT_STOPS.indexOf(stop as (typeof ACCENT_STOPS)[number]);
    if (i === -1) return undefined;
    return readVar(`--accent-${stop}`, ACCENT_FALLBACK[i]);
  },
}) as Record<(typeof ACCENT_STOPS)[number], string>;

/**
 * Recharts axis tick style. (WARM.faint clears WCAG AA contrast on the light bg.)
 *
 * The color is a GETTER, not a captured value. These objects are module-level
 * consts, so a plain `fill: WARM.faint` would resolve once at import — before the
 * stylesheet is applied and forever after, pinning every chart to the package's
 * fallback neutrals and ignoring the client's tokens. A getter defers the read to
 * the spread site, which happens during render.
 */
export const axisTick = {
  fontSize: 11,
  get fill() {
    return WARM.faint;
  },
};

/** Recharts <Tooltip> props for a soft warm container. Lazily resolved, as above. */
export const chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    get border() {
      return `1px solid ${WARM.border}`;
    },
    background: "#fff",
  },
  cursor: {
    get fill() {
      return WARM.chip;
    },
    fillOpacity: 0.6,
  },
};

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

/** Faint dashed grid. Spread onto <CartesianGrid {...GRID} />. Lazily resolved. */
export const GRID = {
  strokeDasharray: "3 3",
  get stroke() {
    return WARM.track;
  },
};

/** UPPER_CASE aliases so charts can use one import style everywhere. */
export const AXIS_TICK = axisTick;
export const TOOLTIP_STYLE = chartTip.contentStyle;
