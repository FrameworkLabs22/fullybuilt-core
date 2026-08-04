import { ComponentProps } from 'react';
import { XAxis, YAxis } from 'recharts';

/**
 * Axis prop-builders — bundle the repeated `tick`/`tickLine`/`axisLine`/`width`
 * boilerplate every chart re-declares, plus responsive tick sizing (generalizing
 * the mobile logic that previously lived only in InventoryChart).
 *
 * Usage: `<XAxis {...timeXAxis({ dataKey: "period", tickFormatter: fmt, isMobile })} />`
 */

type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;
interface TimeXOpts {
    dataKey: string;
    tickFormatter?: (value: string) => string;
    isMobile?: boolean;
}
/** X axis for time/period series: thin baseline, no tick marks, edge-preserving ticks. */
declare function timeXAxis({ dataKey, tickFormatter, isMobile }: TimeXOpts): XAxisProps;
interface CategoryXOpts {
    dataKey: string;
    tickFormatter?: (value: string) => string;
    isMobile?: boolean;
    /** Force every category label (e.g. short month sets). */
    showAll?: boolean;
}
/** X axis for categorical series (months, zones). */
declare function categoryXAxis({ dataKey, tickFormatter, isMobile, showAll }: CategoryXOpts): XAxisProps;
interface NumberYOpts {
    tickFormatter?: (value: number) => string;
    width?: number;
    isMobile?: boolean;
    yAxisId?: string;
    orientation?: "left" | "right";
    domain?: YAxisProps["domain"];
    /** Axis title (e.g. "%" / "days") — used for dual-axis charts. */
    label?: string;
    /** Hide the category/numeric labels (keep the scale only). */
    hide?: boolean;
}
/** Numeric Y axis: no tick marks, no axis line, formatted ticks, optional dual-axis label. */
declare function numberYAxis({ tickFormatter, width, isMobile, yAxisId, orientation, domain, label, hide, }?: NumberYOpts): YAxisProps;
/** Category Y axis for horizontal (layout="vertical") bar charts — e.g. Top SKUs. */
declare function categoryYAxis({ dataKey, width, isMobile, }: {
    dataKey: string;
    width?: number;
    isMobile?: boolean;
}): YAxisProps;

export { categoryXAxis, categoryYAxis, numberYAxis, timeXAxis };
