// @fullybuilt/core — the shared design system for all Fully Built dashboards.
// Single source of truth: edit here, version, and every client app picks it up.
export * from "./warm";

// ── the system layer ──
// Mount <SystemStyle /> once per page; it carries every hover/focus/animation
// state the components rely on. <Toaster /> and <TipLayer /> are the two page-level
// layers (notifications and [data-tip] tooltips).
export { SystemStyle } from "./system/SystemStyle";
export { Toaster, toast } from "./system/Toast";
export { TipLayer, Def } from "./system/TipLayer";
export { Skel, ChartSkel } from "./system/Skel";
export { ChartTooltip, TIP, REDUCED } from "./system/ChartTooltip";
export type { ChartTooltipRow } from "./system/ChartTooltip";
export { Copy } from "./system/Copy";
export { MockTag } from "./system/MockTag";
export { tone } from "./system/tone";
export type { Tone } from "./system/tone";

// ── per-client accent ramp ──
// Generates the 10-step interaction ramp in a client's brand hue. Feed the output
// of accentRampTokens() into the app's brand-token injection alongside --warm-*.
export { makeAccentRamp, accentRampTokens, hexToOklch, oklchToHex, readableOn, contrastRatio, RAMP_STOPS } from "./lib/ramp";
export type { AccentRamp, RampStop } from "./lib/ramp";
