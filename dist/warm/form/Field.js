import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
function Field({ label, required, hint, error, className, children }) {
  const id = React.useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;
  return /* @__PURE__ */ jsxs("div", { className: cn("fb-field", className), children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: cn("fb-label", required && "fb-label--req"), children: label }),
    children({
      id,
      "aria-describedby": note ? noteId : void 0,
      "aria-invalid": error ? true : void 0
    }),
    note && /* @__PURE__ */ jsx("span", { id: noteId, className: cn("fb-hint", error && "fb-hint--err"), children: note })
  ] });
}
function Label({
  required,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("label", { className: cn("fb-label", required && "fb-label--req", className), ...props });
}
function Hint({
  error,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("span", { className: cn("fb-hint", error && "fb-hint--err", className), ...props });
}
export {
  Field,
  Hint,
  Label
};
//# sourceMappingURL=Field.js.map