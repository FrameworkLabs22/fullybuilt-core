import * as React from "react";
import { WARM } from "../warm/theme";

/**
 * Data-provenance tag — a small dashed pill marking a sample, estimated or
 * placeholder value.
 *
 * Deliberately GRAY and deliberately dashed. Amber and red are the page's urgency
 * vocabulary ("order soon", "stocked out"); provenance is not urgency, and
 * borrowing an urgency color to mean "we made this number up" trains people to
 * discount the colors that matter. The dashed border says "not solid" without
 * competing for attention.
 */
export function MockTag({
  label = "sample",
  title = "Sample data — no live source yet",
}: {
  label?: string;
  title?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-1 align-middle text-[9px] font-semibold uppercase leading-[14px] tracking-wide"
      style={{ border: `1px dashed ${WARM.faint}`, color: WARM.sub, background: "transparent" }}
      data-tip={title}
    >
      {label}
    </span>
  );
}
