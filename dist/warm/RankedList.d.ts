import * as React from 'react';

interface RankedItem {
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
declare function RankedListCard({ title, subtitle, right, height, className, loading, items, emptyText, formatValue, }: RankedListCardProps): React.JSX.Element;

export { type RankedItem, RankedListCard };
