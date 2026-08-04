import * as React from 'react';

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
declare function AutoGrid({ min, className, style, children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    min?: string;
}): React.JSX.Element;
/**
 * Explicit-breakpoint grid for cases AutoGrid can't model — chiefly grids that
 * mix normal and full-width children (a "wide" chart uses `lg:col-span-2`).
 * Static class strings (Tailwind-safe). Gutter is the 8pt `gap-gutter`.
 */
declare const GRID_VARIANTS: {
    /** 1 → 2-up. Pair with `lg:col-span-2` on wide children for full-bleed rows. */
    readonly halves: "grid grid-cols-1 gap-gutter lg:grid-cols-2";
    /** 1 → 2 → 3-up. */
    readonly thirds: "grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3";
    /** 2 → 4-up, denser on ultrawide. */
    readonly quarters: "grid grid-cols-2 gap-gutter lg:grid-cols-4 2xl:grid-cols-6";
};
declare function GridRow({ variant, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof GRID_VARIANTS;
}): React.JSX.Element;

export { AutoGrid, GridRow };
