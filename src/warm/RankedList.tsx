import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "./Card";
import { SPACE } from "./spacing";
import { Skeleton } from "../ui/skeleton";
import { WARM } from "./theme";

// Signature reveal: bars grow from the left (scaleX, GPU-safe — never animate width),
// staggered per row. ~500ms ease-out, the one "expressive" moment per the Motion spec.
const BAR_STAGGER = { initial: {}, animate: { transition: { staggerChildren: 0.05 } } };
const BAR_ROW = { initial: {}, animate: {} };
const BAR_FILL = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } },
};

export interface RankedItem {
  label: string;
  value: number;
  /** Optional small note after the value (e.g. complaint count). */
  annotation?: React.ReactNode;
}

interface RankedListCardProps {
  title: string;
  subtitle?: string;
  /** Top-right slot (badge, delta, toggle…). */
  right?: React.ReactNode;
  height?: number;
  className?: string;
  loading?: boolean;
  items: RankedItem[];
  /** Shown when items is empty (after loading). */
  emptyText?: string;
  formatValue?: (v: number) => string;
}

/**
 * Ranked label/count list with inline magnitude bars — the narrow-column
 * alternative to a horizontal bar chart: full labels, exact counts, no axis
 * chrome. Header matches ChartCard so the two mix in a grid.
 */
export function RankedListCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  items,
  emptyText = "No data yet",
  formatValue = (v) => `${Math.round(v)}`,
}: RankedListCardProps) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const reduced = useReducedMotion();
  return (
    <Card className={className}>
      <div className="flex items-start justify-between" style={{ marginBottom: SPACE.headerGap }}>
        <div>
          <div className="text-warm-ink font-bold" style={{ fontSize: 14.5, letterSpacing: "-0.01em" }}>{title}</div>
          {subtitle && <div className="text-warm-sub" style={{ fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
      {/* minHeight (not height): rows size the card; grids stretch siblings to match. */}
      <div style={{ minHeight: height }}>
        {loading ? (
          <Skeleton className="w-full" style={{ height }} />
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center text-body-sm text-warm-faint" style={{ height }}>{emptyText}</div>
        ) : (
          <motion.div
            className="flex flex-col gap-3"
            variants={reduced ? undefined : BAR_STAGGER}
            initial={reduced ? false : "initial"}
            animate={reduced ? false : "animate"}
          >
            {items.map((item) => (
              <motion.div key={item.label} variants={reduced ? undefined : BAR_ROW}>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate text-body-sm font-semibold text-warm-sub">{item.label}</div>
                  <div className="flex shrink-0 items-baseline gap-1.5">
                    <span className="text-body-sm font-bold tabular-nums text-warm-ink">{formatValue(item.value)}</span>
                    {item.annotation}
                  </div>
                </div>
                <div className="mt-[5px] h-[4px] w-full rounded-pill bg-warm-track">
                  <motion.div
                    className="h-full rounded-pill"
                    style={{ width: `${(item.value / max) * 100}%`, background: WARM.blueMid, transformOrigin: "left" }}
                    variants={reduced ? undefined : BAR_FILL}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
