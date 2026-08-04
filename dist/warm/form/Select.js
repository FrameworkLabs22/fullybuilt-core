import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { FIELD_BOX } from "./Input";
const Select = React.forwardRef(function Select2({ options, placeholder, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs("span", { className: "fb-selwrap", children: [
    /* @__PURE__ */ jsxs("select", { ref, className: cn("fb-inp", FIELD_BOX, "pr-[26px]", className), ...props, children: [
      placeholder && /* @__PURE__ */ jsx("option", { value: "", children: placeholder }),
      children ?? options?.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, disabled: o.disabled, children: o.label }, o.value))
    ] }),
    /* @__PURE__ */ jsx("span", { className: "fb-selcaret", "aria-hidden": "true", children: /* @__PURE__ */ jsx(CaretDown, { size: 12, weight: "bold" }) })
  ] });
});
export {
  Select
};
//# sourceMappingURL=Select.js.map