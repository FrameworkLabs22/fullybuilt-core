import { CartesianGrid } from "recharts";
import { WARM } from "./theme";

export { axisTick, chartTip, WARM } from "./theme";

/** Faint warm gridline. Horizontal-only by default. */
export const WarmGrid = ({ vertical = false }: { vertical?: boolean }) => (
  <CartesianGrid strokeDasharray="3 3" stroke={WARM.track} vertical={vertical} />
);

/**
 * Vertical area-fill gradient: solid-ish at the top, fading to transparent at the
 * baseline. Drop inside a Recharts `<defs>` and reference via `fill={`url(#id)`}`
 * on an <Area>. Keeps area charts on-brand (pass WARM.primary / WARM.blue) while
 * giving them depth a flat stroke lacks. `top` is the peak opacity.
 */
export const ChartGradient = ({
  id,
  color,
  top = 0.24,
}: {
  id: string;
  color: string;
  top?: number;
}) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={color} stopOpacity={top} />
    <stop offset="95%" stopColor={color} stopOpacity={0} />
  </linearGradient>
);

/**
 * Bar-fill gradient: full color at the value end, fading to a lighter (but still
 * visible) base — the bar-chart analog of ChartGradient, so bars share the same
 * depth as the area fills. Vertical bars fade top→bottom; pass `horizontal` for
 * left→right bars (e.g. a `layout="vertical"` Top-SKUs chart). Drop inside a
 * Recharts `<defs>` and reference via `fill={`url(#id)`}` on a <Bar>.
 */
export const BarGradient = ({
  id,
  color,
  horizontal = false,
  base = 0.6,
}: {
  id: string;
  color: string;
  horizontal?: boolean;
  base?: number;
}) => (
  <linearGradient
    id={id}
    {...(horizontal ? { x1: "0", y1: "0", x2: "1", y2: "0" } : { x1: "0", y1: "0", x2: "0", y2: "1" })}
  >
    {/* Full color at the value tip, fading toward the baseline (top→base for
        vertical bars; left axis→right tip for horizontal), matching the area fills. */}
    <stop offset="0%" stopColor={color} stopOpacity={horizontal ? base : 1} />
    <stop offset="100%" stopColor={color} stopOpacity={horizontal ? 1 : base} />
  </linearGradient>
);
