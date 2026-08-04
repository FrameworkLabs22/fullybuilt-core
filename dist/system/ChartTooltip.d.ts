import * as React from 'react';

/**
 * Shared element props for every chart <Tooltip>.
 *
 * Recharts eases tooltip position over 400ms by default, which makes the tip
 * rubber-band along behind the cursor and feel broken on a dense axis. Disabling
 * the animation and pinning the tip near the top of the plot leaves it sliding
 * horizontally band to band, which tracks the cursor honestly.
 *
 * Spread it: `<Tooltip {...TIP} content={<ChartTooltip … />} />`.
 */
declare const TIP: {
    readonly isAnimationActive: false;
    readonly position: {
        readonly y: 10;
    };
    readonly offset: 16;
};
/** True when the OS asks for reduced motion — gates chart reveals and morphs
 *  that CSS alone cannot reach (JS-driven animation, staged mounts). */
declare const REDUCED: boolean;
interface ChartTooltipRow {
    label: string;
    value: string;
    /** Series swatch. Omit for rows that are not a series (totals, deltas). */
    color?: string;
    delta?: {
        text: string;
        color: string;
    };
}
/**
 * Chart tooltip body: a titled list of label/value rows with series swatches and
 * optional delta chips. Values are tabular-figure aligned so they compare down
 * the column instead of jittering as digits change.
 */
declare function ChartTooltip({ title, rows }: {
    title?: string;
    rows: ChartTooltipRow[];
}): React.JSX.Element;

export { ChartTooltip, type ChartTooltipRow, REDUCED, TIP };
