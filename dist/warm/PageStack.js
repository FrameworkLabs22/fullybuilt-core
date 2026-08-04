import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function PageStack({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-section", className), ...props, children });
}
export {
  PageStack
};
//# sourceMappingURL=PageStack.js.map