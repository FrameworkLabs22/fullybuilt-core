/**
 * Reference-line and value-label prop-builders. These return props to spread onto
 * the Recharts primitives directly (`<ReferenceLine {...} />`, `<LabelList {...} />`)
 * rather than wrapping them — Recharts detects these children by element type, so a
 * wrapper component would be ignored.
 */
import type { ComponentProps } from "react";
import type { ReferenceLine, LabelList } from "recharts";
import { WARM } from "../theme";

type ReferenceLineProps = ComponentProps<typeof ReferenceLine>;
type LabelListProps = ComponentProps<typeof LabelList>;

interface TargetOpts {
  /** Horizontal target (most common — a goal/SLA on the Y scale). */
  y?: number;
  /** Vertical target (a marker on the X scale). */
  x?: number | string;
  label: string;
  color?: string;
  /** For dual-axis charts, the axis this target belongs to. */
  yAxisId?: string;
}

/**
 * A warm-styled target/SLA line — dashed, muted, with a small label.
 * Usage: `<ReferenceLine {...referenceTarget({ y: 95, label: "SLA 95%" })} />`
 */
export function referenceTarget({ y, x, label, color = WARM.warn, yAxisId }: TargetOpts): ReferenceLineProps {
  return {
    ...(y != null ? { y } : {}),
    ...(x != null ? { x } : {}),
    ...(yAxisId ? { yAxisId } : {}),
    stroke: color,
    strokeDasharray: "4 4",
    strokeWidth: 1.5,
    ifOverflow: "extendDomain",
    label: {
      value: label,
      position: "insideTopRight",
      fill: color,
      fontSize: 10,
      fontWeight: 600,
    },
  };
}

interface ValueLabelOpts {
  formatter?: (value: number) => string;
  position?: LabelListProps["position"];
  color?: string;
}

/**
 * Value labels on bars (e.g. Top SKUs revenue, delivery-by-zone counts).
 * Usage: `<Bar …><LabelList {...barValueLabel({ formatter: fmt })} /></Bar>`
 */
export function barValueLabel({ formatter, position = "right", color = WARM.sub }: ValueLabelOpts = {}): LabelListProps {
  return {
    position,
    formatter: formatter as LabelListProps["formatter"],
    style: { fontSize: 10.5, fontWeight: 600, fill: color },
  };
}
