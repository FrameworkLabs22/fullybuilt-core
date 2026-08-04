import { jsx, jsxs } from "react/jsx-runtime";
import { WARM } from "../warm/theme";
const TIP = { isAnimationActive: false, position: { y: 10 }, offset: 16 };
const REDUCED = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
function ChartTooltip({ title, rows }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-md px-2.5 py-2",
      style: {
        background: WARM.card,
        border: `1px solid ${WARM.borderStrong}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      },
      children: [
        title && /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wider", style: { color: WARM.faint }, children: title }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: rows.map((r) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-5 text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", style: { color: WARM.sub }, children: [
            r.color && /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px]", style: { background: r.color } }),
            r.label
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium tabular-nums", style: { color: WARM.ink }, children: [
            r.value,
            r.delta && /* @__PURE__ */ jsx(
              "span",
              {
                className: "ml-1.5 rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums",
                style: { color: r.delta.color, background: `${r.delta.color}1F` },
                children: r.delta.text
              }
            )
          ] })
        ] }, r.label)) })
      ]
    }
  );
}
export {
  ChartTooltip,
  REDUCED,
  TIP
};
//# sourceMappingURL=ChartTooltip.js.map