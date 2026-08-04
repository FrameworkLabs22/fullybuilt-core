import { Variants } from 'framer-motion';

/**
 * Shared Framer Motion variants for the dashboard's micro-animations.
 * Always pair with useMotionSafe() so prefers-reduced-motion disables them.
 */

/** Route/page entrance: gentle fade + rise. Entrance-only (no exit phase). */
declare const pageEnter: {
    initial: {
        opacity: number;
        y: number;
    };
    animate: {
        opacity: number;
        y: number;
    };
    transition: {
        duration: number;
        ease: readonly [0.25, 1, 0.5, 1];
    };
};
/** Container that staggers its cardEnter children. */
declare const staggerChildren: Variants;
/** Card/tile entrance inside a staggerChildren container. */
declare const cardEnter: Variants;
/** Floating action button pop-in. */
declare const fabPop: {
    initial: {
        scale: number;
        opacity: number;
    };
    animate: {
        scale: number;
        opacity: number;
    };
    transition: {
        type: "spring";
        stiffness: number;
        damping: number;
    };
};
/**
 * Standard no-bounce UI spring (~300ms perceptual duration) for shared-layout
 * pills / indicators (sidebar, page tabs, segmented control). One token so all
 * three move identically. Tuned for zero bounce per the Motion spec.
 */
declare const SPRING: {
    type: "spring";
    stiffness: number;
    damping: number;
};
/**
 * Recharts draw-on animation props, reduced-motion-safe. Spread onto a series:
 * `<Bar {...chartMotion} />`. Recharts can't read prefers-reduced-motion itself,
 * and series often render inside plain render-functions (not components) where
 * hooks aren't allowed — so this is a module-level read of the media query.
 * (Respects the setting as of page load; a mid-session OS toggle needs a reload.)
 */
declare const chartMotion: {
    readonly isAnimationActive: false;
    readonly animationDuration?: undefined;
    readonly animationEasing?: undefined;
    readonly animationBegin?: undefined;
} | {
    readonly isAnimationActive: true;
    readonly animationDuration: 750;
    readonly animationEasing: "ease-out";
    readonly animationBegin: 0;
};
/**
 * Reactive equivalent of `chartMotion` for chart *components*: re-renders when the
 * OS prefers-reduced-motion setting changes mid-session (the module-level
 * `chartMotion` const only reflects the value at page load). Call at the top of a
 * chart component and spread onto series: `const motion = useChartMotion(); <Bar {...motion} />`.
 */
declare function useChartMotion(): {
    readonly isAnimationActive: true;
    readonly animationDuration: 750;
    readonly animationEasing: "ease-out";
    readonly animationBegin: 0;
} | {
    readonly isAnimationActive: false;
};
/**
 * Reduced-motion fallback for entrances — "reduce, don't remove": keep a quick
 * opacity fade (non-vestibular) but drop movement/scale. Safer and more polished
 * than rendering with no feedback at all.
 */
declare const REDUCED_FADE: {
    readonly initial: {
        readonly opacity: 0;
    };
    readonly animate: {
        readonly opacity: 1;
    };
    readonly transition: {
        readonly duration: 0.15;
    };
};
/**
 * Returns the given entrance motion props, or an opacity-only fade under
 * prefers-reduced-motion (movement/scale dropped, fade kept). Use for entrances
 * whose `animate` ends at opacity:1 (pageEnter, orbEnter, cardEnter).
 */
declare function useMotionSafe<T extends object>(props: T): T | typeof REDUCED_FADE;

export { SPRING, cardEnter, chartMotion, fabPop, pageEnter, staggerChildren, useChartMotion, useMotionSafe };
