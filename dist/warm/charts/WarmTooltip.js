import { jsx, jsxs } from "react/jsx-runtime";
import { WARM } from "../theme";
function WarmTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  nameFormatter,
  hideLabel
}) {
  if (!active || !payload || payload.length === 0) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-[10px] border bg-white px-2.5 py-2 shadow-sm",
      style: { borderColor: WARM.border, fontSize: 12, minWidth: 120 },
      children: [
        !hideLabel && label != null && label !== "" && /* @__PURE__ */ jsx("div", { className: "mb-1.5 font-semibold text-warm-ink", style: { fontSize: 11.5 }, children: labelFormatter ? labelFormatter(label) : label }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: payload.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "h-2 w-2 shrink-0 rounded-[3px]",
              style: { background: item.color ?? WARM.sub }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-warm-sub", children: nameFormatter ? nameFormatter(item.name, item.dataKey) : item.name }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto pl-3 font-semibold tabular-nums text-warm-ink", children: valueFormatter && item.value != null ? valueFormatter(item.value, item.dataKey, item) : item.value })
        ] }, item.dataKey ?? i)) })
      ]
    }
  );
}
export {
  WarmTooltip
};
//# sourceMappingURL=WarmTooltip.js.map