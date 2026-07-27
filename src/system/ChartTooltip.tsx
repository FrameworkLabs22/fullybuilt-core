import * as React from "react";
import { WARM } from "../warm/theme";

/**
 * Shared element props for every chart <Tooltip>.
 *
 * Recharts eases tooltip position over 400ms by default, which makes the tip
 * rubber-band along behind the cursor and feel broken on a dense axis. Disabling
 * the animation and pinning the tip near the top of the plot leaves it sliding
 * horizontally band to band, which tracks the cursor honestly.
 *
 * Spread it: `<Tooltip {...TIP} content={<ChartTooltip … />} />`.
 */
export const TIP = { isAnimationActive: false, position: { y: 10 }, offset: 16 } as const;

/** True when the OS asks for reduced motion — gates chart reveals and morphs
 *  that CSS alone cannot reach (JS-driven animation, staged mounts). */
export const REDUCED =
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export interface ChartTooltipRow {
  label: string;
  value: string;
  /** Series swatch. Omit for rows that are not a series (totals, deltas). */
  color?: string;
  delta?: { text: string; color: string };
}

/**
 * Chart tooltip body: a titled list of label/value rows with series swatches and
 * optional delta chips. Values are tabular-figure aligned so they compare down
 * the column instead of jittering as digits change.
 */
export function ChartTooltip({ title, rows }: { title?: string; rows: ChartTooltipRow[] }) {
  return (
    <div
      className="rounded-md px-2.5 py-2"
      style={{
        background: WARM.card,
        border: `1px solid ${WARM.borderStrong}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {title && (
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: WARM.faint }}>
          {title}
        </p>
      )}
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-5 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: WARM.sub }}>
              {r.color && <span className="h-2 w-2 rounded-[2px]" style={{ background: r.color }} />}
              {r.label}
            </span>
            <span className="font-medium tabular-nums" style={{ color: WARM.ink }}>
              {r.value}
              {r.delta && (
                <span
                  className="ml-1.5 rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums"
                  style={{ color: r.delta.color, background: `${r.delta.color}1F` }}
                >
                  {r.delta.text}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
