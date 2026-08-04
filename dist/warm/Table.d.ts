import * as React from 'react';

type Align = "left" | "right" | "center";
/**
 * House table style (see Planning.tsx): 13px body, uppercase faint header,
 * hairline row rules, tabular numerals for numeric cells. Composable pieces —
 * pages keep full control of their rows/cells.
 */
declare function WarmTable({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>): React.JSX.Element;
/** Header row wrapper — renders <thead><tr>…</tr></thead> with eyebrow styling. */
declare function WarmThead({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element;
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    align?: Align;
}
declare function Th({ align, className, children, ...props }: ThProps): React.JSX.Element;
declare function WarmTr({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element;
interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: Align;
    /** Right-aligned tabular numerals for figures. */
    numeric?: boolean;
}
declare function Td({ align, numeric, className, children, ...props }: TdProps): React.JSX.Element;

export { Td, Th, WarmTable, WarmThead, WarmTr };
