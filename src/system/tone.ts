import { WARM } from "../warm/theme";

/**
 * The system's state vocabulary. Five tones, each a foreground/background pair.
 *
 * `excess` exists because "too much" is a real state, not a neutral one — an
 * overstocked SKU is cash sitting still, and rendering it in the gray reserved
 * for missing data reads as "we don't know" rather than "this is a problem".
 */
export type Tone = "pos" | "warn" | "neg" | "muted" | "excess";

/** Resolve a tone to its `{ fg, bg }` pair. A function, not a const map, so each
 *  read re-resolves the CSS vars — a const would freeze the first client's palette. */
export function tone(t: Tone): { fg: string; bg: string } {
  switch (t) {
    case "pos":
      return { fg: WARM.pos, bg: WARM.posSoft };
    case "warn":
      return { fg: WARM.warn, bg: WARM.warnSoft };
    case "neg":
      return { fg: WARM.danger, bg: WARM.dangerSoft };
    case "excess":
      return { fg: WARM.excess, bg: WARM.excessSoft };
    case "muted":
    default:
      return { fg: WARM.sub, bg: WARM.chip };
  }
}

/**
 * The same five tones as CSS-variable expressions rather than resolved literals.
 *
 * `tone()` reads `WARM`, which memoizes each `--warm-*` lookup the first time it
 * resolves. That cache is correct for a per-client palette swap (call
 * `resetWarmCache()` and re-render) but WRONG for the dark-mode toggle: the theme
 * flips `.dark` on <html>, every `--warm-*` re-values in CSS, and any component
 * that painted itself with an inline literal keeps its light-mode colour until a
 * full reload. That is exactly what happened to Badge — on the warehouse
 * Production board, "nobody badged in" stayed cream-on-orange over a black page.
 *
 * A `var()` in an inline style has no such problem: the browser re-resolves it on
 * the class change, with no cache to clear and no re-render to schedule. Use this
 * anywhere the value lands on an HTML element. Recharts still needs `tone()` —
 * SVG presentation attributes do not resolve `var()`, which is why the resolved
 * path exists at all.
 *
 * Borders use color-mix, never an `RRGGBB + "33"` suffix: these are CSS variables,
 * not hex strings, and an /NN opacity modifier on one emits no CSS at all.
 */
const TONE_VARS: Record<Tone, { fg: string; bg: string }> = {
  pos:    { fg: "--warm-pos",     bg: "--warm-pos-soft" },
  warn:   { fg: "--warm-warn",    bg: "--warm-warn-soft" },
  neg:    { fg: "--warm-danger",  bg: "--warm-danger-soft" },
  excess: { fg: "--warm-excess",  bg: "--warm-excess-soft" },
  muted:  { fg: "--warm-sub",     bg: "--warm-chip" },
};

export function toneVar(t: Tone): { fg: string; bg: string; border: string } {
  const v = TONE_VARS[t] ?? TONE_VARS.muted;
  // Fall back to the resolved literal so a host app that has not declared the
  // vars still renders the tone rather than inheriting currentColor.
  const lit = tone(t);
  return {
    fg: `var(${v.fg}, ${lit.fg})`,
    bg: `var(${v.bg}, ${lit.bg})`,
    border: `color-mix(in srgb, var(${v.fg}, ${lit.fg}) 20%, transparent)`,
  };
}
