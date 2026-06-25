import * as React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { WarmTr, Td } from "./Table";

/**
 * Scroll context for a dense data table. Provides horizontal overflow without
 * the `<table>` wrapper that WarmTable bakes in, so a page can compose its own
 * `<table>` + WarmThead/ExpandableRow inside. (Sticky headers / frozen columns
 * are intentionally out of scope.)
 */
export function DataGridWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      {children}
    </div>
  );
}

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
export function ExpandableRow({ summary, detail, columns, defaultOpen = false }: ExpandableRowProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <>
      <WarmTr className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
        <Td className="w-6 align-middle text-warm-faint">
          <CaretRight size={15} className={cn("transition-transform", open && "rotate-90")} />
        </Td>
        {summary}
      </WarmTr>
      {open && (
        <tr>
          <td colSpan={columns + 1} className="border-t border-warm-border bg-warm-chip/20 px-3 py-3">
            {detail}
          </td>
        </tr>
      )}
    </>
  );
}
