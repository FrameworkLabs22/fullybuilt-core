import { jsx, jsxs } from "react/jsx-runtime";
const cell = (value, format) => format ? format(value) : value == null ? "" : String(value);
function ChartDataTable({ caption, columns, rows }) {
  return /* @__PURE__ */ jsxs("table", { className: "sr-only", children: [
    /* @__PURE__ */ jsx("caption", { children: caption }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("th", { scope: "col", children: c.label }, c.key)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("td", { children: cell(row[c.key], c.format) }, c.key)) }, i)) })
  ] });
}
export {
  ChartDataTable
};
//# sourceMappingURL=ChartDataTable.js.map