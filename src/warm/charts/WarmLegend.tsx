import * as React from "react";
import { cn } from "../../lib/utils";
import { WARM } from "../theme";
import { pressable } from "../press";

export interface WarmLegendItem {
  key: string;
  label: React.ReactNode;
  color: string;
  /** Series currently toggled off (rendered muted). */
  hidden?: boolean;
}

export interface WarmLegendProps {
  /** Explicit items — the standalone / header-legend usage. */
  items?: WarmLegendItem[];
  /** When provided, items become buttons that toggle their series. */
  onToggle?: (key: string) => void;
  /** Injected by Recharts when used as `<Legend content={<WarmLegend />} />`. */
  payload?: Array<{ value?: string; color?: string; dataKey?: string | number }>;
  className?: string;
}

/**
 * The one warm legend — a row of color dot + label. Replaces the manual header
 * dot-legends (Support, Fulfillment) and the ad-hoc Recharts `<Legend>` usages.
 * Works two ways:
 *   1. Standalone: `<WarmLegend items={[…]} onToggle={toggle} />`
 *   2. As Recharts content: `<Legend content={<WarmLegend onToggle={toggle} />} />`
 *      (Recharts injects `payload`, which is mapped to items).
 * When `onToggle` is set, items are keyboard-focusable buttons (a11y in Phase 4).
 */
export function WarmLegend({ items, onToggle, payload, className }: WarmLegendProps) {
  const resolved: WarmLegendItem[] =
    items ??
    (payload ?? []).map((p) => ({
      key: String(p.dataKey ?? p.value ?? ""),
      label: p.value ?? "",
      color: p.color ?? WARM.sub,
    }));

  if (resolved.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {resolved.map((item) => {
        const dot = (
          <span
            className="h-2 w-2 shrink-0 rounded-[3px] transition-opacity"
            style={{ background: item.color, opacity: item.hidden ? 0.3 : 1 }}
          />
        );
        const text = (
          <span
            className="text-[11.5px] font-semibold transition-colors"
            style={{ color: item.hidden ? WARM.faint : WARM.sub }}
          >
            {item.label}
          </span>
        );

        if (!onToggle) {
          return (
            <span key={item.key} className="flex items-center gap-1.5">
              {dot}
              {text}
            </span>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onToggle(item.key)}
            aria-pressed={!item.hidden}
            aria-label={typeof item.label === "string" ? `Toggle ${item.label} series` : undefined}
            className={cn("flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/30", pressable)}
          >
            {dot}
            {text}
          </button>
        );
      })}
    </div>
  );
}
