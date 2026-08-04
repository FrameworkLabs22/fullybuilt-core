import * as React from 'react';

/**
 * Scroll context for a dense data table. Provides horizontal overflow without
 * the `<table>` wrapper that WarmTable bakes in, so a page can compose its own
 * `<table>` + WarmThead/ExpandableRow inside. (Sticky headers / frozen columns
 * are intentionally out of scope.)
 */
declare function DataGridWrapper({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
interface ExpandableRowProps {
    /** The always-visible summary cells (<Td> elements) — excludes the caret column. */
    summary: React.ReactNode;
    /** Detail content revealed beneath the row (re-presents already-loaded data). */
    detail: React.ReactNode;
    /** Number of summary columns (the detail panel spans these + the caret column). */
    columns: number;
    defaultOpen?: boolean;
}
/**
 * A table row that toggles a full-width detail panel beneath it. Renders a
 * leading caret column (the page's header should include a matching empty
 * <Th>), so `columns` is the count of summary cells. Expansion grows the table
 * downward — no async, so no layout shift.
 */
declare function ExpandableRow({ summary, detail, columns, defaultOpen }: ExpandableRowProps): React.JSX.Element;

export { DataGridWrapper, ExpandableRow };
