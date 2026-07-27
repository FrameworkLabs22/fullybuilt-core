import * as React from "react";
import { WARM } from "../warm/theme";

/**
 * Loading placeholders.
 *
 * Two rules the whole system follows:
 *
 * 1. **Show blocks, never zeros.** A "0" in a KPI slot reads as data — the user
 *    believes they sold nothing, and finds out otherwise a second later. A block
 *    reads as "not yet".
 * 2. **Size the block to the content it stands in for**, so nothing reflows when
 *    the data lands. A placeholder that jumps on resolve is worse than no
 *    placeholder.
 *
 * Solid fill plus opacity pulse — no gradient shimmer.
 */
export function Skel({
  w,
  h = 12,
  className = "",
  style,
}: {
  /** Width; defaults to filling the container. */
  w?: number | string;
  h?: number | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`block shrink-0 animate-pulse rounded ${className}`}
      style={{ width: w ?? "100%", height: h, background: WARM.chip, ...style }}
    />
  );
}

/**
 * Chart-shaped placeholder — a ghost bar chart at the height of the chart it
 * replaces, with a staggered pulse so it reads as one loading object rather than
 * a row of unrelated blocks.
 */
export function ChartSkel({ height = 220 }: { height?: number }) {
  const bars = [38, 52, 46, 60, 68, 55, 74, 63, 80, 70, 86, 78, 66];
  return (
    <div aria-hidden className="flex items-end gap-2 px-4 pb-1" style={{ height }}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 animate-pulse rounded-t"
          style={{ height: `${h}%`, background: WARM.chip, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}
