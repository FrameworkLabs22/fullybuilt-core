import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerChildren, cardEnter } from "../lib/motion";
function Stagger({ className, children }) {
  const reduced = useReducedMotion();
  if (reduced) return /* @__PURE__ */ jsx("div", { className, children });
  return /* @__PURE__ */ jsx(motion.div, { className, variants: staggerChildren, initial: "initial", animate: "animate", children: React.Children.map(
    children,
    (child) => child == null ? child : /* @__PURE__ */ jsx(motion.div, { variants: cardEnter, children: child })
  ) });
}
export {
  Stagger
};
//# sourceMappingURL=Stagger.js.map