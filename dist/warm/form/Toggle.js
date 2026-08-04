import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
function withLabel(control, label, rowClassName) {
  if (!label) return control;
  return /* @__PURE__ */ jsxs("label", { className: cn("fb-choice", rowClassName), children: [
    control,
    /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
const Checkbox = React.forwardRef(function Checkbox2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", className: cn("fb-box", className), ...props }),
    label,
    rowClassName
  );
});
const Radio = React.forwardRef(function Radio2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    /* @__PURE__ */ jsx("input", { ref, type: "radio", className: cn("fb-box", className), ...props }),
    label,
    rowClassName
  );
});
const Switch = React.forwardRef(function Switch2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    // role="switch" so it is announced as on/off rather than checked/unchecked —
    // the distinction that tells someone it has already taken effect.
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", role: "switch", className: cn("fb-switch", className), ...props }),
    label,
    rowClassName
  );
});
export {
  Checkbox,
  Radio,
  Switch
};
//# sourceMappingURL=Toggle.js.map