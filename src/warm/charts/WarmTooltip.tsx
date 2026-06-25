import * as React from "react";
import { WARM } from "../theme";

export interface WarmTooltipItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
  payload?: Record<string, unknown>;
}

export interface WarmTooltipProps {
  /** Injected by Recharts when used as `<Tooltip content={<WarmTooltip … />} />`. */
  active?: boolean;
  payload?: WarmTooltipItem[];
  label?: string | number;
  /** Format the header label (e.g. a date key → "Mar 4"). */
  labelFormatter?: (label: string | number) => React.ReactNode;
  /** Format each series value (e.g. currency / percent). Receives the series dataKey and full row. */
  valueFormatter?: (
    value: number | string,
    dataKey?: string | number,
    item?: WarmTooltipItem,
  ) => React.ReactNode;
  /** Relabel a series (defaults to its Recharts `name`). */
  nameFormatter?: (name: string | undefined, dataKey?: string | number) => React.ReactNode;
  /** Hide the header label row (single-series charts where the label is redundant). */
  hideLabel?: boolean;
}

/**
 * The one warm tooltip for every chart — replaces the `chartTip` preset, the
 * bespoke JSX tooltips in InventoryChart, and the one-off `contentStyle` overrides.
 * Color swatch + series name + right-aligned value, on a flat hairline card.
 *
 * Usage: `<Tooltip cursor={…} content={<WarmTooltip labelFormatter={fmtDay} valueFormatter={fmt} />} />`
 */
export function WarmTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  nameFormatter,
  hideLabel,
}: WarmTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="rounded-[10px] border bg-white px-2.5 py-2 shadow-sm"
      style={{ borderColor: WARM.border, fontSize: 12, minWidth: 120 }}
    >
      {!hideLabel && label != null && label !== "" && (
        <div className="mb-1.5 font-semibold text-warm-ink" style={{ fontSize: 11.5 }}>
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, i) => (
          <div key={item.dataKey ?? i} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-[3px]"
              style={{ background: item.color ?? WARM.sub }}
            />
            <span className="text-warm-sub">
              {nameFormatter ? nameFormatter(item.name, item.dataKey) : item.name}
            </span>
            <span className="ml-auto pl-3 font-semibold tabular-nums text-warm-ink">
              {valueFormatter && item.value != null
                ? valueFormatter(item.value, item.dataKey, item)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
