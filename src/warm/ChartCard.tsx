import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer } from "recharts";
import { Card } from "./Card";
import { SPACE } from "./spacing";
import { ChartEmpty } from "./charts/ChartEmpty";
import { Skeleton } from "../ui/skeleton";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  /** Top-right slot (badge, delta, toggle…). */
  right?: React.ReactNode;
  height?: number;
  className?: string;
  /** Show a skeleton in place of the chart while data loads. */
  loading?: boolean;
  /** Render the in-body empty state instead of the chart (no data). */
  empty?: boolean;
  /** Empty-state copy (defaults to "No data for this period"). */
  emptyMessage?: string;
  /** Legend row rendered below the chart body. */
  legend?: React.ReactNode;
  /** Accessible summary of the chart for screen readers (sets role="img"). */
  ariaLabel?: string;
  /** Visually-hidden data-table fallback (see ChartDataTable). */
  dataTable?: React.ReactNode;
  children: React.ReactElement;
}

/** Card with a title/subtitle header and a fixed-height responsive chart body. */
export function ChartCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  empty,
  emptyMessage,
  legend,
  ariaLabel,
  dataTable,
  children,
}: ChartCardProps) {
  return (
    // pad={0}: the header sits on its own ruled band rather than floating in the
    // card's padding. The rule is the faint `border` — an internal divider, not an
    // edge — so it separates header from body without competing with the card's
    // own boundary. See the "edges define, dividers whisper" note on <Card>.
    <Card className={className} pad={0}>
      <div
        className="flex items-start justify-between gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid var(--warm-border)" }}
      >
        <div>
          <div className="text-[13px] font-semibold text-warm-ink">{title}</div>
          {subtitle && <div className="mt-0.5 text-xs text-warm-sub">{subtitle}</div>}
        </div>
        {right}
      </div>
      {/* Body padding lives on the wrapper so `height` stays the CHART's height:
          putting both on one element would silently shrink every chart by the
          vertical padding (border-box), and callers size `height` to the plot. */}
      <div className="px-1 py-3">
      <div
        style={{ height }}
        {...(ariaLabel && !loading && !empty ? { role: "img", "aria-label": ariaLabel } : {})}
      >
        {/* 200ms opacity crossfade between skeleton → empty → chart (no movement;
            reduced-motion-safe). initial={false} so the first paint doesn't double
            up with the recharts draw-on. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={loading ? "loading" : empty ? "empty" : "content"}
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : empty ? (
              <ChartEmpty message={emptyMessage} />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {children}
              </ResponsiveContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Sibling (not inside role="img") so screen readers can reach the table. */}
      {dataTable && !loading && !empty && dataTable}
      {legend && !loading && !empty && <div style={{ marginTop: 10 }}>{legend}</div>}
      </div>
    </Card>
  );
}
