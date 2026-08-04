import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { WARM } from "../theme";
import { pressable } from "../press";
function WarmLegend({ items, onToggle, payload, className }) {
  const resolved = items ?? (payload ?? []).map((p) => ({
    key: String(p.dataKey ?? p.value ?? ""),
    label: p.value ?? "",
    color: p.color ?? WARM.sub
  }));
  if (resolved.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className), children: resolved.map((item) => {
    const dot = /* @__PURE__ */ jsx(
      "span",
      {
        className: "h-2 w-2 shrink-0 rounded-[3px] transition-opacity",
        style: { background: item.color, opacity: item.hidden ? 0.3 : 1 }
      }
    );
    const text = /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-[11.5px] font-semibold transition-colors",
        style: { color: item.hidden ? WARM.faint : WARM.sub },
        children: item.label
      }
    );
    if (!onToggle) {
      return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        dot,
        text
      ] }, item.key);
    }
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onToggle(item.key),
        "aria-pressed": !item.hidden,
        "aria-label": typeof item.label === "string" ? `Toggle ${item.label} series` : void 0,
        className: cn("flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/30", pressable),
        children: [
          dot,
          text
        ]
      },
      item.key
    );
  }) });
}
export {
  WarmLegend
};
//# sourceMappingURL=WarmLegend.js.map