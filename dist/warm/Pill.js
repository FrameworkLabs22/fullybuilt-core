import { jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import { pressable } from "./press";
function Pill({ icon, active, className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "inline-flex items-center gap-2 h-9 px-3.5 rounded-pill text-[13px] font-semibold border transition-colors",
        pressable,
        active ? "bg-warm-ink text-white border-warm-ink" : "bg-warm-card text-warm-sub border-warm-border hover:bg-warm-chip",
        className
      ),
      ...props,
      children: [
        icon,
        children
      ]
    }
  );
}
export {
  Pill
};
//# sourceMappingURL=Pill.js.map