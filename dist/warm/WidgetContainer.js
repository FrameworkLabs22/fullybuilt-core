import { jsx, jsxs } from "react/jsx-runtime";
import { Card } from "./Card";
import { SPACE } from "./spacing";
import { Skeleton } from "../ui/skeleton";
function WidgetContainer({
  title,
  subtitle,
  right,
  height,
  grow,
  className,
  loading,
  footer,
  children
}) {
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", style: { marginBottom: SPACE.headerGap }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-warm-ink font-bold", style: { fontSize: 14.5, letterSpacing: "-0.01em" }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { className: "text-warm-sub", style: { fontSize: 12, marginTop: 2 }, children: subtitle })
      ] }),
      right
    ] }),
    /* @__PURE__ */ jsx("div", { style: height == null ? void 0 : grow ? { minHeight: height } : { height }, children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full", style: { height: height ?? "100%" } }) : children }),
    footer && /* @__PURE__ */ jsx("div", { style: { marginTop: SPACE.headerGap }, children: footer })
  ] });
}
export {
  WidgetContainer
};
//# sourceMappingURL=WidgetContainer.js.map