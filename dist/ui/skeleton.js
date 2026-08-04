import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("skeleton-shimmer rounded-md bg-warm-track", className),
      ...props
    }
  );
}
export {
  Skeleton
};
//# sourceMappingURL=skeleton.js.map