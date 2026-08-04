import { useReducedMotion } from "framer-motion";
const pageEnter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
};
const staggerChildren = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04 } }
};
const cardEnter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }
};
const fabPop = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 380, damping: 24 }
};
const SPRING = { type: "spring", stiffness: 440, damping: 42 };
const chartMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? { isAnimationActive: false } : { isAnimationActive: true, animationDuration: 750, animationEasing: "ease-out", animationBegin: 0 };
const CHART_MOTION_ON = {
  isAnimationActive: true,
  animationDuration: 750,
  animationEasing: "ease-out",
  animationBegin: 0
};
const CHART_MOTION_OFF = { isAnimationActive: false };
function useChartMotion() {
  const reduced = useReducedMotion();
  return reduced ? CHART_MOTION_OFF : CHART_MOTION_ON;
}
const REDUCED_FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15 }
};
function useMotionSafe(props) {
  const reduced = useReducedMotion();
  return reduced ? REDUCED_FADE : props;
}
export {
  SPRING,
  cardEnter,
  chartMotion,
  fabPop,
  pageEnter,
  staggerChildren,
  useChartMotion,
  useMotionSafe
};
//# sourceMappingURL=motion.js.map