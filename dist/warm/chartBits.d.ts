import * as React from 'react';
export { WARM, axisTick, chartTip } from './theme.js';

/** Faint warm gridline. Horizontal-only by default. */
declare const WarmGrid: ({ vertical }: {
    vertical?: boolean;
}) => React.JSX.Element;
/**
 * Vertical area-fill gradient: solid-ish at the top, fading to transparent at the
 * baseline. Drop inside a Recharts `<defs>` and reference via `fill={`url(#id)`}`
 * on an <Area>. Keeps area charts on-brand (pass WARM.primary / WARM.blue) while
 * giving them depth a flat stroke lacks. `top` is the peak opacity.
 */
declare const ChartGradient: ({ id, color, top, }: {
    id: string;
    color: string;
    top?: number;
}) => React.JSX.Element;
/**
 * Bar-fill gradient: full color at the value end, fading to a lighter (but still
 * visible) base — the bar-chart analog of ChartGradient, so bars share the same
 * depth as the area fills. Vertical bars fade top→bottom; pass `horizontal` for
 * left→right bars (e.g. a `layout="vertical"` Top-SKUs chart). Drop inside a
 * Recharts `<defs>` and reference via `fill={`url(#id)`}` on a <Bar>.
 */
declare const BarGradient: ({ id, color, horizontal, base, }: {
    id: string;
    color: string;
    horizontal?: boolean;
    base?: number;
}) => React.JSX.Element;

export { BarGradient, ChartGradient, WarmGrid };
