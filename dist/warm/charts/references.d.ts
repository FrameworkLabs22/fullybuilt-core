import { ComponentProps } from 'react';
import { LabelList, ReferenceLine } from 'recharts';

/**
 * Reference-line and value-label prop-builders. These return props to spread onto
 * the Recharts primitives directly (`<ReferenceLine {...} />`, `<LabelList {...} />`)
 * rather than wrapping them — Recharts detects these children by element type, so a
 * wrapper component would be ignored.
 */

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
declare function referenceTarget({ y, x, label, color, yAxisId }: TargetOpts): ReferenceLineProps;
interface ValueLabelOpts {
    formatter?: (value: number) => string;
    position?: LabelListProps["position"];
    color?: string;
}
/**
 * Value labels on bars (e.g. Top SKUs revenue, delivery-by-zone counts).
 * Usage: `<Bar …><LabelList {...barValueLabel({ formatter: fmt })} /></Bar>`
 */
declare function barValueLabel({ formatter, position, color }?: ValueLabelOpts): LabelListProps;

export { barValueLabel, referenceTarget };
