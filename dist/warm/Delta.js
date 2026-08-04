import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react";
import { WARM } from "./theme";
function Delta({ pct, label, invert }) {
  if (pct == null) {
    return label ? /* @__PURE__ */ jsx("span", { className: "text-warm-faint", style: { fontSize: 12 }, children: label }) : null;
  }
  const up = pct >= 0;
  const good = invert ? pct <= 0 : pct >= 0;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 font-semibold transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
      style: { fontSize: 12, color: good ? WARM.pos : WARM.danger },
      children: [
        /* @__PURE__ */ jsx(Arrow, { size: 14 }),
        Math.abs(pct).toFixed(1),
        "%",
        label && /* @__PURE__ */ jsx("span", { className: "text-warm-faint font-medium", children: label })
      ]
    }
  );
}
export {
  Delta
};
//# sourceMappingURL=Delta.js.map