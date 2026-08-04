import { jsx } from "react/jsx-runtime";
import * as React from "react";
function TipLayer() {
  const [tip, setTip] = React.useState(null);
  React.useEffect(() => {
    let anchor = null;
    let timer;
    const show = (el) => {
      const text = el.getAttribute("data-tip");
      if (!text) return;
      const r = el.getBoundingClientRect();
      const below = r.top < 76;
      const x = Math.min(Math.max(r.left + r.width / 2, 148), window.innerWidth - 148);
      setTip({ text, x, y: below ? r.bottom + 8 : r.top - 8, below });
    };
    const over = (e) => {
      const el = e.target?.closest?.("[data-tip]") ?? null;
      if (el === anchor) return;
      anchor = el;
      window.clearTimeout(timer);
      if (el) timer = window.setTimeout(() => show(el), 120);
      else setTip(null);
    };
    const hide = () => {
      anchor = null;
      window.clearTimeout(timer);
      setTip(null);
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("scroll", hide, true);
    document.addEventListener("mousedown", hide);
    document.addEventListener("mouseleave", hide);
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("scroll", hide, true);
      document.removeEventListener("mousedown", hide);
      document.removeEventListener("mouseleave", hide);
      window.clearTimeout(timer);
    };
  }, []);
  if (!tip) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fb-tipbox",
      role: "tooltip",
      style: { left: tip.x, top: tip.y, transform: `translate(-50%, ${tip.below ? "0" : "-100%"})` },
      children: /* @__PURE__ */ jsx("div", { className: "fb-tipin", children: tip.text })
    }
  );
}
function Def({ hint, children }) {
  return /* @__PURE__ */ jsx("span", { className: "fb-def", "data-tip": hint, children });
}
export {
  Def,
  TipLayer
};
//# sourceMappingURL=TipLayer.js.map