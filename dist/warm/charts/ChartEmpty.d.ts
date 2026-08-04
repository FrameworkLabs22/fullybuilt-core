import * as React from 'react';

interface ChartEmptyProps {
    /** Primary line (e.g. "No data for this period"). */
    message?: string;
    /** Optional secondary line. */
    hint?: string;
    icon?: React.ReactNode;
    className?: string;
}
/**
 * In-body empty state for charts — fills the ChartCard's fixed-height plot area so
 * an empty chart reads as "no data" instead of blank white space. Distinct from the
 * page-level `EmptyState` (which owns its own card + vertical padding).
 */
declare function ChartEmpty({ message, hint, icon, className }: ChartEmptyProps): React.JSX.Element;

export { ChartEmpty, type ChartEmptyProps };
