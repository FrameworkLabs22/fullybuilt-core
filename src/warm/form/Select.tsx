import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { FIELD_BOX } from "./Input";

/**
 * Single-choice select, built on the native `<select>`.
 *
 * Native on purpose. A dashboard select is almost always a short list of plain
 * strings — a date range, a status filter, a warehouse — and for that the native
 * control is strictly better than a popover reimplementation: keyboard support,
 * type-ahead and the platform's own picker on touch, none of which have to be
 * maintained. It also cannot be clipped by an `overflow: auto` table wrapper,
 * which is the failure `<TipLayer>` exists to avoid and which quietly breaks
 * popover-based selects inside data grids.
 *
 * The caret is a sibling element rather than a background-image, so it reads
 * `--warm-faint` like every other neutral instead of freezing one gray into a
 * data URI.
 *
 * When a picker genuinely needs rich rows — an avatar, a two-line option, live
 * search — that is a different control and belongs in the app until enough
 * surfaces want the same one.
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Convenience for the common case; ignored when `children` are passed. */
  options?: SelectOption[];
  /** Leading empty option, e.g. "All warehouses". */
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder, className, children, ...props },
  ref,
) {
  return (
    <span className="fb-selwrap">
      <select ref={ref} className={cn("fb-inp", FIELD_BOX, "pr-[26px]", className)} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {children ??
          options?.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
      </select>
      <span className="fb-selcaret" aria-hidden="true">
        <CaretDown size={12} weight="bold" />
      </span>
    </span>
  );
});
