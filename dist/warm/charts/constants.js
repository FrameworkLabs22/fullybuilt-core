import { WARM } from "../theme";
const CHART_MARGIN = { top: 8, right: 12, left: 0, bottom: 0 };
const CHART_MARGIN_COMPACT = { top: 6, right: 8, left: 0, bottom: 0 };
const CHART_HEIGHT = {
  hero: 300,
  default: 200,
  compact: 180
};
const BAR_RADIUS = [6, 6, 0, 0];
const BAR_RADIUS_H = [0, 6, 6, 0];
const activeDot = (color) => ({ r: 4, strokeWidth: 2, stroke: "#fff", fill: color });
const barCursor = { fill: WARM.chip, fillOpacity: 0.6 };
const crosshairCursor = { stroke: WARM.borderStrong, strokeWidth: 1, strokeDasharray: "3 3" };
export {
  BAR_RADIUS,
  BAR_RADIUS_H,
  CHART_HEIGHT,
  CHART_MARGIN,
  CHART_MARGIN_COMPACT,
  activeDot,
  barCursor,
  crosshairCursor
};
//# sourceMappingURL=constants.js.map