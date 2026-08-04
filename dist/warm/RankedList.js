import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "./Card";
import { SPACE } from "./spacing";
import { Skeleton } from "../ui/skeleton";
import { WARM } from "./theme";
const BAR_STAGGER = { initial: {}, animate: { transition: { staggerChildren: 0.05 } } };
const BAR_ROW = { initial: {}, animate: {} };
const BAR_FILL = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};
function RankedListCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  items,
  emptyText = "No data yet",
  formatValue = (v) => `${Math.round(v)}`
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const reduced = useReducedMotion();
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", style: { marginBottom: SPACE.headerGap }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-warm-ink font-bold", style: { fontSize: 14.5, letterSpacing: "-0.01em" }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { className: "text-warm-sub", style: { fontSize: 12, marginTop: 2 }, children: subtitle })
      ] }),
      right
    ] }),
    /* @__PURE__ */ jsx("div", { style: { minHeight: height }, children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full", style: { height } }) : items.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-body-sm text-warm-faint", style: { height }, children: emptyText }) : /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "flex flex-col gap-3",
        variants: reduced ? void 0 : BAR_STAGGER,
        initial: reduced ? false : "initial",
        animate: reduced ? false : "animate",
        children: items.map((item) => /* @__PURE__ */ jsxs(motion.div, { variants: reduced ? void 0 : BAR_ROW, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate text-body-sm font-semibold text-warm-sub", children: item.label }),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-baseline gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-body-sm font-bold tabular-nums text-warm-ink", children: formatValue(item.value) }),
              item.annotation
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-[5px] h-[4px] w-full rounded-pill bg-warm-track", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-full rounded-pill",
              style: { width: `${item.value / max * 100}%`, background: WARM.blueMid, transformOrigin: "left" },
              variants: reduced ? void 0 : BAR_FILL
            }
          ) })
        ] }, item.label))
      }
    ) })
  ] });
}
export {
  RankedListCard
};
//# sourceMappingURL=RankedList.js.map