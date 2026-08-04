import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { WarmTr, Td } from "./Table";
function DataGridWrapper({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-x-auto", className), ...props, children });
}
function ExpandableRow({ summary, detail, columns, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(WarmTr, { className: "cursor-pointer", onClick: () => setOpen((o) => !o), children: [
      /* @__PURE__ */ jsx(Td, { className: "w-6 align-middle text-warm-faint", children: /* @__PURE__ */ jsx(CaretRight, { size: 15, className: cn("transition-transform", open && "rotate-90") }) }),
      summary
    ] }),
    open && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns + 1, className: "border-t border-warm-border bg-warm-chip/20 px-3 py-3", children: detail }) })
  ] });
}
export {
  DataGridWrapper,
  ExpandableRow
};
//# sourceMappingURL=DataGridWrapper.js.map