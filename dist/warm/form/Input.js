import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const FIELD_BOX = "w-full px-2.5 py-1.5 text-[12.5px] leading-[18px]";
const Input = React.forwardRef(
  function Input2({ className, type = "text", ...props }, ref) {
    return /* @__PURE__ */ jsx("input", { ref, type, className: cn("fb-inp", FIELD_BOX, className), ...props });
  }
);
const Textarea = React.forwardRef(function Textarea2({ className, rows = 3, ...props }, ref) {
  return /* @__PURE__ */ jsx("textarea", { ref, rows, className: cn("fb-inp", FIELD_BOX, "min-h-16", className), ...props });
});
export {
  FIELD_BOX,
  Input,
  Textarea
};
//# sourceMappingURL=Input.js.map