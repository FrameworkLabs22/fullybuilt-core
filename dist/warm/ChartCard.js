import { jsx, jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer } from "recharts";
import { Card } from "./Card";
import { ChartEmpty } from "./charts/ChartEmpty";
import { Skeleton } from "../ui/skeleton";
function ChartCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  empty,
  emptyMessage,
  legend,
  ariaLabel,
  dataTable,
  children
}) {
  return (
    // pad={0}: the header sits on its own ruled band rather than floating in the
    // card's padding. The rule is the faint `border` — an internal divider, not an
    // edge — so it separates header from body without competing with the card's
    // own boundary. See the "edges define, dividers whisper" note on <Card>.
    /* @__PURE__ */ jsxs(Card, { className, pad: 0, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start justify-between gap-3 px-4 py-3",
          style: { borderBottom: "1px solid var(--warm-border)" },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[13px] font-semibold text-warm-ink", children: title }),
              subtitle && /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-warm-sub", children: subtitle })
            ] }),
            right
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "px-1 py-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { height },
            ...ariaLabel && !loading && !empty ? { role: "img", "aria-label": ariaLabel } : {},
            children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-full w-full",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
                children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-full w-full" }) : empty ? /* @__PURE__ */ jsx(ChartEmpty, { message: emptyMessage }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children })
              },
              loading ? "loading" : empty ? "empty" : "content"
            ) })
          }
        ),
        dataTable && !loading && !empty && dataTable,
        legend && !loading && !empty && /* @__PURE__ */ jsx("div", { style: { marginTop: 10 }, children: legend })
      ] })
    ] })
  );
}
export {
  ChartCard
};
//# sourceMappingURL=ChartCard.js.map