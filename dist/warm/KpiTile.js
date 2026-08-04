import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";
import { WARM } from "./theme";
import { SPACE } from "./spacing";
import { KpiVariantContext } from "./kpiVariant";
import { Skeleton } from "../ui/skeleton";
function KpiTile(props) {
  const ctxVariant = React.useContext(KpiVariantContext);
  const variant = props.variant ?? ctxVariant;
  return variant === "strip" ? /* @__PURE__ */ jsx(KpiStripCell, { ...props }) : /* @__PURE__ */ jsx(KpiCard, { ...props });
}
function KpiCard({
  label,
  value,
  spark,
  sparkColor,
  delta,
  badge,
  sub,
  icon,
  footer,
  valueColor,
  loading,
  to
}) {
  const showDelta = delta && (delta.pct != null || !sub);
  const labelRow = /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-label font-semibold text-warm-sub", children: label }),
    icon && /* @__PURE__ */ jsx("span", { className: "text-warm-faint", children: icon })
  ] });
  if (loading) {
    return /* @__PURE__ */ jsx(Card, { pad: SPACE.kpiPad, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      labelRow,
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-28" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20" })
    ] }) });
  }
  const tile = /* @__PURE__ */ jsx(Card, { pad: SPACE.kpiPad, interactive: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    labelRow,
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "text-display font-bold tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]", style: { color: valueColor ?? WARM.ink }, children: value }),
      spark && /* @__PURE__ */ jsx(Sparkline, { data: spark.data, dataKey: spark.key, color: sparkColor ?? WARM.blue })
    ] }),
    badge ? /* @__PURE__ */ jsx("span", { className: "self-start rounded-pill bg-warm-warn-soft px-[9px] py-[2px] text-meta font-bold text-warm-warn", children: badge }) : showDelta ? /* @__PURE__ */ jsx(Delta, { pct: delta.pct, label: delta.label, invert: delta.invert }) : sub && /* @__PURE__ */ jsx("div", { className: "text-meta text-warm-faint", children: sub }),
    footer && /* @__PURE__ */ jsx("div", { className: "mt-1.5", children: footer })
  ] }) });
  return to ? /* @__PURE__ */ jsx(Link, { to, className: "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-primary rounded-card", children: tile }) : tile;
}
function KpiStripCell({ label, value, delta, badge, sub, valueColor, loading, to }) {
  const showDelta = delta && (delta.pct != null || !sub);
  const inner = loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 p-[15px]", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-16" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-20" })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 p-[15px]", children: [
    /* @__PURE__ */ jsx("span", { className: "truncate text-label font-semibold text-warm-sub", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-xl font-bold leading-none tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]", style: { color: valueColor ?? WARM.ink }, children: value }),
    badge ? /* @__PURE__ */ jsx("span", { className: "self-start rounded-pill bg-warm-warn-soft px-[7px] py-[1px] text-micro font-bold text-warm-warn", children: badge }) : showDelta ? /* @__PURE__ */ jsx(Delta, { pct: delta.pct, invert: delta.invert }) : sub && /* @__PURE__ */ jsx("div", { className: "truncate text-micro text-warm-faint", children: sub })
  ] });
  const cellClass = "border-l border-t border-warm-border bg-warm-card";
  return to ? /* @__PURE__ */ jsx(
    Link,
    {
      to,
      className: `block transition-colors hover:bg-warm-chip/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warm-primary ${cellClass}`,
      children: inner
    }
  ) : /* @__PURE__ */ jsx("div", { className: cellClass, children: inner });
}
export {
  KpiTile
};
//# sourceMappingURL=KpiTile.js.map