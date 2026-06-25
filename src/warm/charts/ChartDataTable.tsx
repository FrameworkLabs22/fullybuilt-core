import * as React from "react";

export interface ChartDataTableColumn {
  /** Row object key. */
  key: string;
  /** Human header (e.g. "Net sales"). */
  label: string;
  /** Optional value formatter for the cell text. */
  format?: (value: unknown) => string;
}

export interface ChartDataTableProps {
  caption: string;
  columns: ChartDataTableColumn[];
  rows: Array<Record<string, unknown>>;
}

const cell = (value: unknown, format?: (v: unknown) => string) =>
  format ? format(value) : value == null ? "" : String(value);

/**
 * Visually-hidden data table that mirrors a chart's series for screen readers.
 * Rendered alongside the (aria-hidden) SVG chart so assistive tech gets the numbers.
 * Uses the `.sr-only` utility (already in the Tailwind/shadcn baseline).
 */
export function ChartDataTable({ caption, columns, rows }: ChartDataTableProps) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key}>{cell(row[c.key], c.format)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
