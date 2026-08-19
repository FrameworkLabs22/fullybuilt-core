import * as React from 'react';

type Align = "left" | "right" | "center";
/**
 * Two house table looks.
 *
 * `plain` (the default, and what every table shipped before v0.4.4 gets) is a
 * bare table meant to sit INSIDE a padded container — a `<Card>` or a div with
 * its own gutter. Its cells carry no left padding at all, because the container
 * is expected to supply it.
 *
 * `framed` is the look the client dashboards' inventory table established and
 * that leadership now reads as "the table": it draws its own rounded border, so
 * it must NOT be put inside a Card, and it pads its own cells. Solid rule under
 * the header, dashed rules between rows, none under the last one.
 *
 * The variant is chosen once on `WarmTable` and reaches the cells through
 * context, so a call site's rows and cells read identically either way.
 */
type WarmTableVariant = "plain" | "framed";
interface WarmTableProps extends React.HTMLAttributes<HTMLTableElement> {
    variant?: WarmTableVariant;
    /** Classes for the frame/scroll wrapper rather than the <table> itself. */
    wrapperClassName?: string;
}
/**
 * House table style (see Planning.tsx): 13px body, uppercase faint header,
 * hairline row rules, tabular numerals for numeric cells. Composable pieces —
 * pages keep full control of their rows/cells.
 */
declare function WarmTable({ variant, className, wrapperClassName, children, ...props }: WarmTableProps): React.JSX.Element;
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

export { Td, Th, WarmTable, type WarmTableVariant, WarmThead, WarmTr };
