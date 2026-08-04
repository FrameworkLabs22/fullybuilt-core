import { jsx } from "react/jsx-runtime";
import { WARM } from "../warm/theme";
function Skel({
  w,
  h = 12,
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: `block shrink-0 animate-pulse rounded ${className}`,
      style: { width: w ?? "100%", height: h, background: WARM.chip, ...style }
    }
  );
}
function ChartSkel({ height = 220 }) {
  const bars = [38, 52, 46, 60, 68, 55, 74, 63, 80, 70, 86, 78, 66];
  return /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "flex items-end gap-2 px-4 pb-1", style: { height }, children: bars.map((h, i) => /* @__PURE__ */ jsx(
    "span",
    {
      className: "flex-1 animate-pulse rounded-t",
      style: { height: `${h}%`, background: WARM.chip, animationDelay: `${i * 70}ms` }
    },
    i
  )) });
}
export {
  ChartSkel,
  Skel
};
//# sourceMappingURL=Skel.js.map