import * as React from "react";
import { cn } from "../lib/utils";

type Align = "left" | "right" | "center";

const alignClass: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

/**
 * House table style (see Planning.tsx): 13px body, uppercase faint header,
 * hairline row rules, tabular numerals for numeric cells. Composable pieces —
 * pages keep full control of their rows/cells.
 */
export function WarmTable({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-body-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

/** Header row wrapper — renders <thead><tr>…</tr></thead> with eyebrow styling. */
export function WarmThead({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <thead>
      <tr className={cn("text-micro text-warm-faint", className)} {...props}>
        {children}
      </tr>
    </thead>
  );
}

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
}

export function Th({ align = "left", className, children, ...props }: ThProps) {
  return (
    <th className={cn("pb-3 pr-3 font-bold uppercase tracking-wide", alignClass[align], className)} {...props}>
      {children}
    </th>
  );
}

export function WarmTr({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-t border-warm-border transition-colors hover:bg-warm-chip/40", className)}
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
  return (
    <td
      className={cn(
        "py-3 pr-3",
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
