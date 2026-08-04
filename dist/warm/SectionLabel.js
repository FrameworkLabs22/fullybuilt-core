import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function SectionLabel({ className, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("text-warm-faint font-bold uppercase", className),
      style: { fontSize: 11, letterSpacing: "0.04em", ...style },
      ...props
    }
  );
}
export {
  SectionLabel
};
//# sourceMappingURL=SectionLabel.js.map