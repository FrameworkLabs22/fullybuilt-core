import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center"
};
function WarmTable({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: cn("w-full border-collapse text-body-sm", className), ...props, children }) });
}
function WarmThead({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: cn("text-micro text-warm-faint", className), ...props, children }) });
}
function Th({ align = "left", className, children, ...props }) {
  return /* @__PURE__ */ jsx("th", { className: cn("pb-3 pr-3 font-bold uppercase tracking-wide", alignClass[align], className), ...props, children });
}
function WarmTr({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn("border-t border-warm-border transition-colors hover:bg-warm-chip/40", className),
      ...props,
      children
    }
  );
}
function Td({ align, numeric, className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      className: cn(
        "py-3 pr-3",
        alignClass[align ?? (numeric ? "right" : "left")],
        numeric && "tabular-nums",
        className
      ),
      ...props,
      children
    }
  );
}
export {
  Td,
  Th,
  WarmTable,
  WarmThead,
  WarmTr
};
//# sourceMappingURL=Table.js.map