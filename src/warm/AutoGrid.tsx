import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Fluid density grid. Auto-packs as many equal columns as fit at `min` width,
 * then stretches — so wider control-center screens show MORE cards, not more
 * gutter, with zero breakpoint management. Use for uniform card rows (KPI tiles,
 * metric cards). For grids with a "wide"/full-span child, use GridRow instead —
 * auto-fit has no column count to span.
 *
 * Gutter is the 8pt `gap-gutter` (16px). `min` is the per-card minimum track
 * width (e.g. "220px" KPIs, "300px" metric cards).
 */
export function AutoGrid({
  min = "220px",
  className,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { min?: string }) {
  return (
    <div
      className={cn(
        "grid gap-gutter grid-cols-[repeat(auto-fit,minmax(var(--min),1fr))]",
        className,
      )}
      style={{ ["--min" as string]: min, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Explicit-breakpoint grid for cases AutoGrid can't model — chiefly grids that
 * mix normal and full-width children (a "wide" chart uses `lg:col-span-2`).
 * Static class strings (Tailwind-safe). Gutter is the 8pt `gap-gutter`.
 */
const GRID_VARIANTS = {
  /** 1 → 2-up. Pair with `lg:col-span-2` on wide children for full-bleed rows. */
  halves: "grid grid-cols-1 gap-gutter lg:grid-cols-2",
  /** 1 → 2 → 3-up. */
  thirds: "grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3",
  /** 2 → 4-up, denser on ultrawide. */
  quarters: "grid grid-cols-2 gap-gutter lg:grid-cols-4 2xl:grid-cols-6",
} as const;

export function GridRow({
  variant = "halves",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof GRID_VARIANTS }) {
  return (
    <div className={cn(GRID_VARIANTS[variant], className)} {...props}>
      {children}
    </div>
  );
}
