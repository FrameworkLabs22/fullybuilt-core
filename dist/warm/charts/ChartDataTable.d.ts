import * as React from 'react';

interface ChartDataTableColumn {
    /** Row object key. */
    key: string;
    /** Human header (e.g. "Net sales"). */
    label: string;
    /** Optional value formatter for the cell text. */
    format?: (value: unknown) => string;
}
interface ChartDataTableProps {
    caption: string;
    columns: ChartDataTableColumn[];
    rows: Array<Record<string, unknown>>;
}
/**
 * Visually-hidden data table that mirrors a chart's series for screen readers.
 * Rendered alongside the (aria-hidden) SVG chart so assistive tech gets the numbers.
 * Uses the `.sr-only` utility (already in the Tailwind/shadcn baseline).
 */
declare function ChartDataTable({ caption, columns, rows }: ChartDataTableProps): React.JSX.Element;

export { ChartDataTable, type ChartDataTableColumn, type ChartDataTableProps };
