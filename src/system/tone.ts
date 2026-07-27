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
