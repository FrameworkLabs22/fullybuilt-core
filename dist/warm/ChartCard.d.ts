import * as React from 'react';

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
declare function ChartCard({ title, subtitle, right, height, className, loading, empty, emptyMessage, legend, ariaLabel, dataTable, children, }: ChartCardProps): React.JSX.Element;

export { ChartCard };
