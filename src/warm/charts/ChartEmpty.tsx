import * as React from "react";
import { cn } from "../../lib/utils";

export interface ChartEmptyProps {
  /** Primary line (e.g. "No data for this period"). */
  message?: string;
  /** Optional secondary line. */
  hint?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * In-body empty state for charts — fills the ChartCard's fixed-height plot area so
 * an empty chart reads as "no data" instead of blank white space. Distinct from the
 * page-level `EmptyState` (which owns its own card + vertical padding).
 */
export function ChartEmpty({ message = "No data for this period", hint, icon, className }: ChartEmptyProps) {
  return (
    <div className={cn("flex h-full w-full flex-col items-center justify-center gap-1 text-center", className)}>
      {icon && <div className="mb-0.5 text-warm-faint">{icon}</div>}
      <div className="text-body-sm font-semibold text-warm-sub">{message}</div>
      {hint && <div className="text-[11.5px] text-warm-faint">{hint}</div>}
    </div>
  );
}
