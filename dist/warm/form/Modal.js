import { jsx, jsxs } from "react/jsx-runtime";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
const MAX_WIDTH = { sm: 380, md: 520, lg: 720 };
function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  footer,
  dismissible = true,
  className,
  children
}) {
  const block = (e) => {
    if (!dismissible) e.preventDefault();
  };
  return /* @__PURE__ */ jsx(Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
    /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fb-modal-scrim" }),
    /* @__PURE__ */ jsxs(
      Dialog.Content,
      {
        className: cn("fb-modal", className),
        style: { maxWidth: MAX_WIDTH[size] },
        onEscapeKeyDown: block,
        onPointerDownOutside: block,
        onInteractOutside: block,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 pb-4 pt-5", children: [
            /* @__PURE__ */ jsx(Dialog.Title, { className: "text-warm-ink pr-7 text-[15px] font-semibold leading-5", children: title }),
            description ? /* @__PURE__ */ jsx(Dialog.Description, { className: "text-warm-faint mt-1 pr-7 text-xs leading-relaxed", children: description }) : (
              // Radix warns when a dialog has no description; this says "none on
              // purpose" instead of leaving a console warning for every modal.
              /* @__PURE__ */ jsx(Dialog.Description, {})
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-warm-border flex-1 overflow-y-auto border-t px-6 py-5", children }),
          footer && /* @__PURE__ */ jsx("div", { className: "border-warm-border flex items-center justify-end gap-2 border-t px-6 py-4", children: footer }),
          dismissible && /* @__PURE__ */ jsx(Dialog.Close, { className: "fb-modal-x", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { size: 13, weight: "bold" }) })
        ]
      }
    )
  ] }) });
}
export {
  Modal
};
//# sourceMappingURL=Modal.js.map