import { jsx } from "react/jsx-runtime";
import { WARM } from "../warm/theme";
function MockTag({
  label = "sample",
  title = "Sample data \u2014 no live source yet"
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "inline-flex items-center gap-1 rounded px-1 align-middle text-[9px] font-semibold uppercase leading-[14px] tracking-wide",
      style: { border: `1px dashed ${WARM.faint}`, color: WARM.sub, background: "transparent" },
      "data-tip": title,
      children: label
    }
  );
}
export {
  MockTag
};
//# sourceMappingURL=MockTag.js.map