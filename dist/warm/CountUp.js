import { jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
function CountUp({ value, format = (n) => Math.round(n).toLocaleString(), duration = 0.7 }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => reduced ? value : 0);
  const fromRef = useRef(reduced ? value : 0);
  useEffect(() => {
    if (reduced) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(fromRef.current, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (latest) => setDisplay(latest)
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration, reduced]);
  return /* @__PURE__ */ jsx("span", { children: format(display) });
}
export {
  CountUp
};
//# sourceMappingURL=CountUp.js.map