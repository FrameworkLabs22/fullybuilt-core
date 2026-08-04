import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
function ChartEmpty({ message = "No data for this period", hint, icon, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex h-full w-full flex-col items-center justify-center gap-1 text-center", className), children: [
    icon && /* @__PURE__ */ jsx("div", { className: "mb-0.5 text-warm-faint", children: icon }),
    /* @__PURE__ */ jsx("div", { className: "text-body-sm font-semibold text-warm-sub", children: message }),
    hint && /* @__PURE__ */ jsx("div", { className: "text-[11.5px] text-warm-faint", children: hint })
  ] });
}
export {
  ChartEmpty
};
//# sourceMappingURL=ChartEmpty.js.map