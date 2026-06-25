/**
 * Axis prop-builders — bundle the repeated `tick`/`tickLine`/`axisLine`/`width`
 * boilerplate every chart re-declares, plus responsive tick sizing (generalizing
 * the mobile logic that previously lived only in InventoryChart).
 *
 * Usage: `<XAxis {...timeXAxis({ dataKey: "period", tickFormatter: fmt, isMobile })} />`
 */
import type { ComponentProps } from "react";
import type { XAxis, YAxis } from "recharts";
import { WARM, axisTick } from "../theme";

type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;

const tickFor = (isMobile?: boolean) => (isMobile ? { ...axisTick, fontSize: 10 } : axisTick);

interface TimeXOpts {
  dataKey: string;
  tickFormatter?: (value: string) => string;
  isMobile?: boolean;
}

/** X axis for time/period series: thin baseline, no tick marks, edge-preserving ticks. */
export function timeXAxis({ dataKey, tickFormatter, isMobile }: TimeXOpts): XAxisProps {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    interval: "preserveStartEnd",
    minTickGap: isMobile ? 20 : 28,
  };
}

interface CategoryXOpts {
  dataKey: string;
  tickFormatter?: (value: string) => string;
  isMobile?: boolean;
  /** Force every category label (e.g. short month sets). */
  showAll?: boolean;
}

/** X axis for categorical series (months, zones). */
export function categoryXAxis({ dataKey, tickFormatter, isMobile, showAll }: CategoryXOpts): XAxisProps {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    ...(showAll ? { interval: 0 as const } : {}),
  };
}

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
export function numberYAxis({
  tickFormatter,
  width = 48,
  isMobile,
  yAxisId,
  orientation,
  domain,
  label,
  hide,
}: NumberYOpts = {}): YAxisProps {
  return {
    tick: tickFor(isMobile),
    tickFormatter: tickFormatter as YAxisProps["tickFormatter"],
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 40) : width,
    ...(yAxisId ? { yAxisId } : {}),
    ...(orientation ? { orientation } : {}),
    ...(domain ? { domain } : {}),
    ...(hide ? { hide: true } : {}),
    ...(label
      ? {
          label: {
            value: label,
            angle: orientation === "right" ? 90 : -90,
            position: orientation === "right" ? "insideRight" : "insideLeft",
            style: { fontSize: 10, fill: WARM.sub, textAnchor: "middle" as const },
          },
        }
      : {}),
  };
}

/** Category Y axis for horizontal (layout="vertical") bar charts — e.g. Top SKUs. */
export function categoryYAxis({
  dataKey,
  width = 104,
  isMobile,
}: {
  dataKey: string;
  width?: number;
  isMobile?: boolean;
}): YAxisProps {
  return {
    type: "category",
    dataKey,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 84) : width,
    interval: 0,
  };
}
