import * as React from 'react';

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
declare function Skel({ w, h, className, style, }: {
    /** Width; defaults to filling the container. */
    w?: number | string;
    h?: number | string;
    className?: string;
    style?: React.CSSProperties;
}): React.JSX.Element;
/**
 * Chart-shaped placeholder — a ghost bar chart at the height of the chart it
 * replaces, with a staggered pulse so it reads as one loading object rather than
 * a row of unrelated blocks.
 */
declare function ChartSkel({ height }: {
    height?: number;
}): React.JSX.Element;

export { ChartSkel, Skel };
