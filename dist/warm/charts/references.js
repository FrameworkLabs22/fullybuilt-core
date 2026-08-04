import { WARM } from "../theme";
function referenceTarget({ y, x, label, color = WARM.warn, yAxisId }) {
  return {
    ...y != null ? { y } : {},
    ...x != null ? { x } : {},
    ...yAxisId ? { yAxisId } : {},
    stroke: color,
    strokeDasharray: "4 4",
    strokeWidth: 1.5,
    ifOverflow: "extendDomain",
    label: {
      value: label,
      position: "insideTopRight",
      fill: color,
      fontSize: 10,
      fontWeight: 600
    }
  };
}
function barValueLabel({ formatter, position = "right", color = WARM.sub } = {}) {
  return {
    position,
    formatter,
    style: { fontSize: 10.5, fontWeight: 600, fill: color }
  };
}
export {
  barValueLabel,
  referenceTarget
};
//# sourceMappingURL=references.js.map