import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function EmptyState({ icon, title, description, action, className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("div", { className: "mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-warm-chip text-warm-sub", children: icon }),
        /* @__PURE__ */ jsx("div", { className: "font-bold text-warm-ink", children: title }),
        description && /* @__PURE__ */ jsx("div", { className: "max-w-[360px] text-body-sm text-warm-sub", children: description }),
        action && /* @__PURE__ */ jsx("div", { className: "mt-2", children: action })
      ]
    }
  );
}
export {
  EmptyState
};
//# sourceMappingURL=EmptyState.js.map