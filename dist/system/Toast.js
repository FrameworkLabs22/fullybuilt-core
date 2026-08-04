import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { tone } from "./tone";
let pushToast = null;
function toast(title, opts) {
  pushToast?.({ title, tone: opts?.tone ?? "muted", sub: opts?.sub });
}
function Toaster() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    let n = 0;
    pushToast = (t) => {
      const id = ++n;
      setItems((xs) => [...xs.slice(-3), { ...t, id }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 5e3);
    };
    return () => {
      pushToast = null;
    };
  }, []);
  if (!items.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "fb-toaster", role: "status", "aria-live": "polite", children: items.map((t) => /* @__PURE__ */ jsxs("div", { className: "fb-toast", children: [
    /* @__PURE__ */ jsx("span", { className: "mt-1 h-2 w-2 shrink-0 rounded-full", style: { background: tone(t.tone).fg } }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "fb-toast-title", children: t.title }),
      t.sub && /* @__PURE__ */ jsx("p", { className: "fb-toast-sub", children: t.sub })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setItems((xs) => xs.filter((x) => x.id !== t.id)),
        "aria-label": "Dismiss",
        className: "fb-toast-x",
        children: "\u2715"
      }
    )
  ] }, t.id)) });
}
export {
  Toaster,
  toast
};
//# sourceMappingURL=Toast.js.map