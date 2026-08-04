import { jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function Btn({ kind = "primary", icon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: cn(`fb-btn fb-btn--${kind}`, className), ...props, children: [
    icon,
    children
  ] });
}
export {
  Btn
};
//# sourceMappingURL=Btn.js.map