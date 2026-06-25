/**
 * Shared Framer Motion variants for the dashboard's micro-animations.
 * Always pair with useMotionSafe() so prefers-reduced-motion disables them.
 */
import { useReducedMotion, type Variants } from "framer-motion";

/** Route/page entrance: gentle fade + rise. Entrance-only (no exit phase). */
export const pageEnter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] as const },
};

/** Container that staggers its cardEnter children. */
export const staggerChildren: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04 } },
};

/** Card/tile entrance inside a staggerChildren container. */
export const cardEnter: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } },
};

/** Floating action button pop-in. */
export const fabPop = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring" as const, stiffness: 380, damping: 24 },
};

/**
 * Standard no-bounce UI spring (~300ms perceptual duration) for shared-layout
 * pills / indicators (sidebar, page tabs, segmented control). One token so all
 * three move identically. Tuned for zero bounce per the Motion spec.
 */
export const SPRING = { type: "spring" as const, stiffness: 440, damping: 42 };

/**
 * Recharts draw-on animation props, reduced-motion-safe. Spread onto a series:
 * `<Bar {...chartMotion} />`. Recharts can't read prefers-reduced-motion itself,
 * and series often render inside plain render-functions (not components) where
 * hooks aren't allowed — so this is a module-level read of the media query.
 * (Respects the setting as of page load; a mid-session OS toggle needs a reload.)
 */
export const chartMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? ({ isAnimationActive: false } as const)
    : ({ isAnimationActive: true, animationDuration: 750, animationEasing: "ease-out", animationBegin: 0 } as const);

const CHART_MOTION_ON = {
  isAnimationActive: true,
  animationDuration: 750,
  animationEasing: "ease-out",
  animationBegin: 0,
} as const;
const CHART_MOTION_OFF = { isAnimationActive: false } as const;

/**
 * Reactive equivalent of `chartMotion` for chart *components*: re-renders when the
 * OS prefers-reduced-motion setting changes mid-session (the module-level
 * `chartMotion` const only reflects the value at page load). Call at the top of a
 * chart component and spread onto series: `const motion = useChartMotion(); <Bar {...motion} />`.
 */
export function useChartMotion() {
  const reduced = useReducedMotion();
  return reduced ? CHART_MOTION_OFF : CHART_MOTION_ON;
}

/**
 * Reduced-motion fallback for entrances — "reduce, don't remove": keep a quick
 * opacity fade (non-vestibular) but drop movement/scale. Safer and more polished
 * than rendering with no feedback at all.
 */
const REDUCED_FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15 },
} as const;

/**
 * Returns the given entrance motion props, or an opacity-only fade under
 * prefers-reduced-motion (movement/scale dropped, fade kept). Use for entrances
 * whose `animate` ends at opacity:1 (pageEnter, orbEnter, cardEnter).
 */
export function useMotionSafe<T extends object>(props: T): T | typeof REDUCED_FADE {
  const reduced = useReducedMotion();
  return reduced ? REDUCED_FADE : props;
}
