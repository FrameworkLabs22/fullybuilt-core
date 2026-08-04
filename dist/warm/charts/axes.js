import { WARM, axisTick } from "../theme";
const tickFor = (isMobile) => isMobile ? { ...axisTick, fontSize: 10 } : axisTick;
function timeXAxis({ dataKey, tickFormatter, isMobile }) {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    interval: "preserveStartEnd",
    minTickGap: isMobile ? 20 : 28
  };
}
function categoryXAxis({ dataKey, tickFormatter, isMobile, showAll }) {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    ...showAll ? { interval: 0 } : {}
  };
}
function numberYAxis({
  tickFormatter,
  width = 48,
  isMobile,
  yAxisId,
  orientation,
  domain,
  label,
  hide
} = {}) {
  return {
    tick: tickFor(isMobile),
    tickFormatter,
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 40) : width,
    ...yAxisId ? { yAxisId } : {},
    ...orientation ? { orientation } : {},
    ...domain ? { domain } : {},
    ...hide ? { hide: true } : {},
    ...label ? {
      label: {
        value: label,
        angle: orientation === "right" ? 90 : -90,
        position: orientation === "right" ? "insideRight" : "insideLeft",
        style: { fontSize: 10, fill: WARM.sub, textAnchor: "middle" }
      }
    } : {}
  };
}
function categoryYAxis({
  dataKey,
  width = 104,
  isMobile
}) {
  return {
    type: "category",
    dataKey,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 84) : width,
    interval: 0
  };
}
export {
  categoryXAxis,
  categoryYAxis,
  numberYAxis,
  timeXAxis
};
//# sourceMappingURL=axes.js.map