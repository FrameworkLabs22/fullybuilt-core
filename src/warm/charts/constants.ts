/**
 * Shared chart layout constants — single source of truth for the margins, heights,
 * dot, and bar-radius literals that were copy-pasted across every chart file
 * (e.g. `{ top: 8, right: 12, left: 0, bottom: 0 }` and `{ r: 4, strokeWidth: 2 }`).
 * Keeping them here lets the ~11 client forks retune chart rhythm in one place.
 */
import { WARM } from "../theme";

/** Default plot margin for time/category charts (small left inset; axis owns the gutter). */
export const CHART_MARGIN = { top: 8, right: 12, left: 0, bottom: 0 } as const;

/** Tighter margin for compact / sparkline-ish charts. */
export const CHART_MARGIN_COMPACT = { top: 6, right: 8, left: 0, bottom: 0 } as const;

/** Standard chart body heights (px) used with ChartCard `height`. */
export const CHART_HEIGHT = {
  hero: 300,
  default: 200,
  compact: 180,
} as const;

/** Rounded top corners for vertical bars. */
export const BAR_RADIUS: [number, number, number, number] = [6, 6, 0, 0];

/** Rounded right corners for horizontal (layout="vertical") bars. */
export const BAR_RADIUS_H: [number, number, number, number] = [0, 6, 6, 0];

/** Active (hover) dot for line/area series, tinted to the series color. */
export const activeDot = (color: string) => ({ r: 4, strokeWidth: 2, stroke: "#fff", fill: color });

/** Bar-chart hover cursor — soft grey fill behind the active bar. */
export const barCursor = { fill: WARM.chip, fillOpacity: 0.6 } as const;

/** Line/area-chart hover cursor — a faint vertical crosshair on the brand border color. */
export const crosshairCursor = { stroke: WARM.borderStrong, strokeWidth: 1, strokeDasharray: "3 3" } as const;
