import { jsx, jsxs } from "react/jsx-runtime";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "../ui/sheet";
const WIDTHS = { md: "sm:max-w-[360px]", lg: "sm:max-w-[480px]" };
function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  width = "md",
  footer,
  children
}) {
  return /* @__PURE__ */ jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: `flex w-full flex-col gap-0 border-warm-border ${WIDTHS[width]}`, children: [
    /* @__PURE__ */ jsxs(SheetHeader, { children: [
      /* @__PURE__ */ jsx(SheetTitle, { children: title }),
      description && /* @__PURE__ */ jsx(SheetDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "-mx-6 mt-section flex-1 overflow-y-auto px-6", children }),
    footer && /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end gap-2 border-t border-warm-border pt-4", children: footer })
  ] }) });
}
export {
  DetailDrawer
};
//# sourceMappingURL=DetailDrawer.js.map