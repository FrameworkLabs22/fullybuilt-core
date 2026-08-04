import { jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
function AutoGrid({
  min = "220px",
  className,
  style,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid gap-gutter grid-cols-[repeat(auto-fit,minmax(var(--min),1fr))]",
        className
      ),
      style: { ["--min"]: min, ...style },
      ...props,
      children
    }
  );
}
const GRID_VARIANTS = {
  /** 1 → 2-up. Pair with `lg:col-span-2` on wide children for full-bleed rows. */
  halves: "grid grid-cols-1 gap-gutter lg:grid-cols-2",
  /** 1 → 2 → 3-up. */
  thirds: "grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3",
  /** 2 → 4-up, denser on ultrawide. */
  quarters: "grid grid-cols-2 gap-gutter lg:grid-cols-4 2xl:grid-cols-6"
};
function GridRow({
  variant = "halves",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn(GRID_VARIANTS[variant], className), ...props, children });
}
export {
  AutoGrid,
  GridRow
};
//# sourceMappingURL=AutoGrid.js.map