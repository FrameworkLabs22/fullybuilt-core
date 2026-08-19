import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center"
};
const VariantContext = React.createContext("plain");
function WarmTable({
  variant = "plain",
  className,
  wrapperClassName,
  children,
  ...props
}) {
  const table = /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: cn("w-full border-collapse text-body-sm", className), ...props, children }) });
  return /* @__PURE__ */ jsx(VariantContext.Provider, { value: variant, children: variant === "framed" ? /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("rounded-card border border-warm-border-strong bg-warm-card", wrapperClassName),
      children: table
    }
  ) : table });
}
function WarmThead({ className, children, ...props }) {
  const variant = React.useContext(VariantContext);
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn(
        "text-micro text-warm-faint",
        variant === "framed" && "border-b border-warm-border",
        className
      ),
      ...props,
      children
    }
  ) });
}
function Th({ align = "left", className, children, ...props }) {
  const variant = React.useContext(VariantContext);
  return /* @__PURE__ */ jsx(
    "th",
    {
      className: cn(
        "font-bold uppercase tracking-wide",
        variant === "framed" ? "px-4 pb-3 pt-4" : "pb-3 pr-3",
        alignClass[align],
        className
      ),
      ...props,
      children
    }
  );
}
function WarmTr({ className, children, ...props }) {
  const variant = React.useContext(VariantContext);
  return /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn(
        "transition-colors",
        variant === "framed" ? "border-b border-dashed border-warm-border last:border-0 hover:bg-warm-bg" : "border-t border-warm-border hover:bg-warm-chip/40",
        className
      ),
      ...props,
      children
    }
  );
}
function Td({ align, numeric, className, children, ...props }) {
  const variant = React.useContext(VariantContext);
  return /* @__PURE__ */ jsx(
    "td",
    {
      className: cn(
        variant === "framed" ? "px-4 py-4" : "py-3 pr-3",
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