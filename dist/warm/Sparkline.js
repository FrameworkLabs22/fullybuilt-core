import { jsx } from "react/jsx-runtime";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { WARM } from "./theme";
function Sparkline({ data, dataKey, color = WARM.blue, width = 70, height = 28 }) {
  if (!data || data.length < 3) return /* @__PURE__ */ jsx("div", { style: { width, height } });
  return /* @__PURE__ */ jsx("div", { style: { width, height }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(LineChart, { data, margin: { top: 4, bottom: 4, left: 0, right: 0 }, children: /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey, stroke: color, strokeWidth: 2, dot: false, isAnimationActive: false }) }) }) });
}
export {
  Sparkline
};
//# sourceMappingURL=Sparkline.js.map