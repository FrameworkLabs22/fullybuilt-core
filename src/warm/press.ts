/**
 * Press/tap feedback — a subtle scale-down on :active that springs back on release.
 * Premium-feel micro-interaction (see docs/design-system.md "Micro-interactions").
 *
 * CSS-only so it propagates through any clickable element (buttons, Radix triggers,
 * Links) without framer-motion wrappers. The combined `transition-[...]` property list
 * intentionally covers color/background/border/shadow **and** transform, so appending
 * this to a component that already had `transition-colors`/`transition-shadow` keeps its
 * hover transitions working (the later utility wins the transition-property).
 *
 * 150ms + ease-out-quart (the app's curve); no bounce/elastic. Disabled under
 * `prefers-reduced-motion` via the `motion-reduce:` variant — no JS needed.
 */
const BASE =
  "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100";

/** Buttons / pills / small controls — 3% press. */
export const pressable = `${BASE} active:scale-[0.97]`;

/** Large surfaces (cards) — gentler 1.5% press so big elements don't jump. */
export const pressableSoft = `${BASE} active:scale-[0.985]`;
