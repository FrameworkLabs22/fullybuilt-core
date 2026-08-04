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
/**
 * Clear the resolved `--warm-*` cache so `WARM`/`CHART_SERIES` re-read from the DOM on next
 * access. Call this RIGHT AFTER injecting a new client's brand tokens — e.g. when the active
 * client changes (FB-staff switch, or a single deploy resolving the client async after login).
 * Without it, the first paint's palette (the default client's) stays cached and charts never
 * re-theme. Synchronous per-client deploys don't need it (first read is already the right
 * client), but it makes runtime client-switching re-theme correctly.
 */
declare function resetWarmCache(): void;
declare const BASE: {
    readonly bg: "#F7F8FA";
    readonly card: "#FFFFFF";
    /** Faintly-lifted surface for a panel sitting on top of a card. */
    readonly cardRaised: "#FCFCFD";
    readonly ink: "#1C1E24";
    readonly sub: "#3E424A";
    readonly faint: "#6E727B";
    readonly border: "#E7E9EE";
    readonly borderStrong: "#D8DBE1";
    readonly chip: "#EEF0F3";
    readonly track: "#ECEEF2";
    readonly primary: "#0E0E06";
    readonly primarySoft: "#F6F6AE";
    readonly pos: "#2B9E8F";
    readonly posSoft: "#E4F4F1";
    readonly blue: "#29C0DD";
    readonly blueSoft: "#FCFAD0";
    readonly blueMid: "#F6F949";
    readonly cream: "#F4F5F6";
    readonly navy: "#0E0E06";
    readonly badgePos: "#15803D";
    readonly badgePosBg: "#DCFCE7";
    readonly badgeNeg: "#B42318";
    readonly badgeNegBg: "#FCE7E6";
    readonly warn: "#C77A1E";
    readonly warnSoft: "#FBF1E2";
    readonly danger: "#d94a36";
    readonly dangerSoft: "#FCE7E6";
    /** Overstock / cash-tied-up. Indigo sits at the same OKLCH brightness band as
     *  `pos`/`danger`, so "too much stock" reads as a real state and not as the
     *  gray of missing data. */
    readonly excess: "#667DBC";
    readonly excessSoft: "#EBF0FD";
    /** Plan / baseline series in charts. A chart tone on purpose — deliberately NOT
     *  tied to the text triad, so retuning body text can't shift a chart. */
    readonly slate: "#6E727B";
};
/**
 * Warm palette. Neutral keys are literal; brand keys resolve per-client from CSS
 * vars at access time (so reads during render pick up the host app's index.css).
 */
declare const WARM: { -readonly [K in keyof typeof BASE]: string; };
declare const ACCENT_STOPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
/** Accent ramp keyed by stop: `ACCENT[400]`. Resolves per client at access time. */
declare const ACCENT: Record<(typeof ACCENT_STOPS)[number], string>;
/**
 * Recharts axis tick style. (WARM.faint clears WCAG AA contrast on the light bg.)
 *
 * The color is a GETTER, not a captured value. These objects are module-level
 * consts, so a plain `fill: WARM.faint` would resolve once at import — before the
 * stylesheet is applied and forever after, pinning every chart to the package's
 * fallback neutrals and ignoring the client's tokens. A getter defers the read to
 * the spread site, which happens during render.
 */
declare const axisTick: {
    fontSize: number;
    readonly fill: string;
};
/** Recharts <Tooltip> props for a soft warm container. Lazily resolved, as above. */
declare const chartTip: {
    contentStyle: {
        fontSize: number;
        borderRadius: number;
        readonly border: string;
        background: string;
    };
    cursor: {
        readonly fill: string;
        fillOpacity: number;
    };
};
declare const CHART_SERIES: readonly string[];
/** Pick a series color by index (cycles through the palette). */
declare const seriesColor: (i: number) => string;
/** Faint dashed grid. Spread onto <CartesianGrid {...GRID} />. Lazily resolved. */
declare const GRID: {
    strokeDasharray: string;
    readonly stroke: string;
};
/** UPPER_CASE aliases so charts can use one import style everywhere. */
declare const AXIS_TICK: {
    fontSize: number;
    readonly fill: string;
};
declare const TOOLTIP_STYLE: {
    fontSize: number;
    borderRadius: number;
    readonly border: string;
    background: string;
};

export { ACCENT, AXIS_TICK, CHART_SERIES, GRID, TOOLTIP_STYLE, WARM, axisTick, chartTip, resetWarmCache, seriesColor };
