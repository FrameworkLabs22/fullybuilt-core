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
    <Card className={className}>
      <div className="flex items-start justify-between" style={{ marginBottom: SPACE.headerGap }}>
        <div>
          <div className="text-warm-ink font-bold" style={{ fontSize: 14.5, letterSpacing: "-0.01em" }}>{title}</div>
          {subtitle && <div className="text-warm-sub" style={{ fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
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
    </Card>
  );
}
