import * as React from "react";
import { cn } from "../lib/utils";

type Align = "left" | "right" | "center";

const alignClass: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

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
export type WarmTableVariant = "plain" | "framed";

const VariantContext = React.createContext<WarmTableVariant>("plain");

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
export function WarmTable({
  variant = "plain",
  className,
  wrapperClassName,
  children,
  ...props
}: WarmTableProps) {
  // The scroll box is deliberately INSIDE the frame. A scroll container clips to
  // its own padding box and honours the border radius, so putting overflow on the
  // rounded element itself shears the corner rows off.
  const table = (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-body-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );

  return (
    <VariantContext.Provider value={variant}>
      {variant === "framed" ? (
        <div className={cn("rounded-card border border-warm-border bg-warm-card", wrapperClassName)}>
          {table}
        </div>
      ) : (
        table
      )}
    </VariantContext.Provider>
  );
}

/** Header row wrapper — renders <thead><tr>…</tr></thead> with eyebrow styling. */
export function WarmThead({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  const variant = React.useContext(VariantContext);
  return (
    <thead>
      <tr
        className={cn(
          "text-micro text-warm-faint",
          variant === "framed" && "border-b border-warm-border",
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    </thead>
  );
}

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
}

export function Th({ align = "left", className, children, ...props }: ThProps) {
  const variant = React.useContext(VariantContext);
  return (
    <th
      className={cn(
        "font-bold uppercase tracking-wide",
        variant === "framed" ? "px-4 pb-3 pt-4" : "pb-3 pr-3",
        alignClass[align],
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function WarmTr({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  const variant = React.useContext(VariantContext);
  return (
    <tr
      className={cn(
        "transition-colors",
        variant === "framed"
          ? "border-b border-dashed border-warm-border last:border-0 hover:bg-warm-bg/60"
          : "border-t border-warm-border hover:bg-warm-chip/40",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
  /** Right-aligned tabular numerals for figures. */
  numeric?: boolean;
}

export function Td({ align, numeric, className, children, ...props }: TdProps) {
  const variant = React.useContext(VariantContext);
  return (
    <td
      className={cn(
        variant === "framed" ? "px-4 py-4" : "py-3 pr-3",
        alignClass[align ?? (numeric ? "right" : "left")],
        numeric && "tabular-nums",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}
