import { jsx, jsxs } from "react/jsx-runtime";
import { CartesianGrid } from "recharts";
import { WARM } from "./theme";
import { axisTick, chartTip, WARM as WARM2 } from "./theme";
const WarmGrid = ({ vertical = false }) => /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: WARM.track, vertical });
const ChartGradient = ({
  id,
  color,
  top = 0.24
}) => /* @__PURE__ */ jsxs("linearGradient", { id, x1: "0", y1: "0", x2: "0", y2: "1", children: [
  /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: color, stopOpacity: top }),
  /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
] });
const BarGradient = ({
  id,
  color,
  horizontal = false,
  base = 0.6
}) => /* @__PURE__ */ jsxs(
  "linearGradient",
  {
    id,
    ...horizontal ? { x1: "0", y1: "0", x2: "1", y2: "0" } : { x1: "0", y1: "0", x2: "0", y2: "1" },
    children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: color, stopOpacity: horizontal ? base : 1 }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: color, stopOpacity: horizontal ? 1 : base })
    ]
  }
);
export {
  BarGradient,
  ChartGradient,
  WARM2 as WARM,
  WarmGrid,
  axisTick,
  chartTip
};
//# sourceMappingURL=chartBits.js.map