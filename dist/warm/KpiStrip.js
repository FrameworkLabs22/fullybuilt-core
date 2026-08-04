import { jsx } from "react/jsx-runtime";
import { Card } from "./Card";
import { KpiVariantContext } from "./kpiVariant";
function KpiStrip({ children }) {
  return /* @__PURE__ */ jsx(Card, { pad: 0, className: "overflow-hidden", children: /* @__PURE__ */ jsx(KpiVariantContext.Provider, { value: "strip", children: /* @__PURE__ */ jsx("div", { className: "-ml-px -mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6", children }) }) });
}
export {
  KpiStrip
};
//# sourceMappingURL=KpiStrip.js.map