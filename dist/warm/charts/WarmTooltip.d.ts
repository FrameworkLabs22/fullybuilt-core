import * as React from 'react';

interface WarmTooltipItem {
    name?: string;
    value?: number | string;
    color?: string;
    dataKey?: string | number;
    payload?: Record<string, unknown>;
}
interface WarmTooltipProps {
    /** Injected by Recharts when used as `<Tooltip content={<WarmTooltip … />} />`. */
    active?: boolean;
    payload?: WarmTooltipItem[];
    label?: string | number;
    /** Format the header label (e.g. a date key → "Mar 4"). */
    labelFormatter?: (label: string | number) => React.ReactNode;
    /** Format each series value (e.g. currency / percent). Receives the series dataKey and full row. */
    valueFormatter?: (value: number | string, dataKey?: string | number, item?: WarmTooltipItem) => React.ReactNode;
    /** Relabel a series (defaults to its Recharts `name`). */
    nameFormatter?: (name: string | undefined, dataKey?: string | number) => React.ReactNode;
    /** Hide the header label row (single-series charts where the label is redundant). */
    hideLabel?: boolean;
}
/**
 * The one warm tooltip for every chart — replaces the `chartTip` preset, the
 * bespoke JSX tooltips in InventoryChart, and the one-off `contentStyle` overrides.
 * Color swatch + series name + right-aligned value, on a flat hairline card.
 *
 * Usage: `<Tooltip cursor={…} content={<WarmTooltip labelFormatter={fmtDay} valueFormatter={fmt} />} />`
 */
declare function WarmTooltip({ active, payload, label, labelFormatter, valueFormatter, nameFormatter, hideLabel, }: WarmTooltipProps): React.JSX.Element | null;

export { WarmTooltip, type WarmTooltipItem, type WarmTooltipProps };
