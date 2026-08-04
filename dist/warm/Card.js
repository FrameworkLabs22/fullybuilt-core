import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import { pressableSoft } from "./press";
function Card({ pad = 24, interactive, elevation = "flat", className, style, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-warm-card border border-warm-border-strong rounded-card",
        elevation === "raised" && "shadow-raised",
        interactive && cn("transition-colors duration-150 hover:bg-warm-chip/30", pressableSoft),
        className
      ),
      style: { padding: pad, ...style },
      ...props,
      children
    }
  );
}
export {
  Card
};
//# sourceMappingURL=Card.js.map