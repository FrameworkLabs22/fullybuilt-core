import * as React from 'react';

interface DeltaProps {
    /** Signed percentage. null/undefined renders just the label (or nothing). */
    pct: number | null | undefined;
    label?: string;
    /** When true, a negative delta is "good" (teal) — e.g. ship time, days to stockout. */
    invert?: boolean;
}
/** Trend delta: up=teal / down=red by default; `invert` flips which direction is good. */
declare function Delta({ pct, label, invert }: DeltaProps): React.JSX.Element | null;

export { Delta };
