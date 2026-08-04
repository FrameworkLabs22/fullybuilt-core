/**
 * OKLCH accent-ramp generator.
 *
 * The design system has two color layers. Layer 1 is the neutral foundation
 * (surfaces, borders, the text triad) — shared by every client. Layer 2 is a
 * single functional accent used ONLY for interaction affordances: focus rings,
 * input focus glow, slider thumbs. Never for surfaces, never for chart series.
 *
 * That accent ships as a 10-step ramp. The ramp originated as the Osmo Planning
 * module's hand-tuned "gold" (hue 77.5°); this module generalizes it so every
 * client gets the same ramp shape in their own hue.
 *
 * WHY THE L AND C CURVES ARE FIXED (and only the hue comes from the client):
 * the ramp is functional, not decorative. A focus ring must carry the same visual
 * weight on every dashboard — if we scaled chroma to each brand's own saturation,
 * a muted brand (e.g. a near-gray navy) would produce an accent so desaturated the
 * focus ring would be invisible, and a vivid brand would shout. Holding lightness
 * and chroma constant and varying only hue keeps affordance strength identical
 * across tenants while still reading as the brand's color family. Brand identity
 * proper lives in `primary`, the surfaces, and the chart series — not here.
 *
 * Sanity check when changing the curves: feeding this the original gold
 * (#B8893A) must reproduce the hand-tuned ramp. It currently matches 8 of the 10
 * stops exactly, with the two darkest off by OKLab ΔE 0.0034 — imperceptible, and
 * caused by those two hexes having been hand-picked slightly off the ramp's hue.
 */
declare const RAMP_STOPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
type RampStop = (typeof RAMP_STOPS)[number];
type AccentRamp = Record<RampStop, string>;
/** sRGB hex → OKLCH. Null when the input isn't a hex color. */
declare function hexToOklch(hex: string): {
    L: number;
    C: number;
    H: number;
} | null;
/**
 * OKLCH → sRGB hex, reducing chroma until the color fits the sRGB gamut. Keeps
 * lightness and hue exact (the two things the ramp's rhythm depends on) and gives
 * up only saturation, which is what gamut mapping should trade away.
 */
declare function oklchToHex(L: number, C: number, H: number): string;
/**
 * Build the 10-step interaction ramp for a brand color.
 *
 * Only the hue is taken from `brandHex`; lightness and chroma follow the fixed
 * curves (see the module header for why). An achromatic or unparseable brand
 * color falls back to the original gold hue rather than producing a gray ramp
 * that can't signal focus.
 */
declare function makeAccentRamp(brandHex: string): AccentRamp;
/**
 * The ramp as CSS custom properties (`--accent-50` … `--accent-900`), ready to
 * merge into a client's `branding` token map and inject on `:root`.
 */
declare function accentRampTokens(brandHex: string): Record<string, string>;
/** WCAG contrast ratio between two hex colors. Returns 1 if either is unparseable. */
declare function contrastRatio(a: string, b: string): number;
/**
 * Pick the readable foreground for text sitting ON `bg` — ink or white,
 * whichever has more contrast.
 *
 * This exists because `--warm-primary-fg` was a hardcoded `#FFFFFF`, and a brand
 * primary is the one token guaranteed to differ per tenant. Measured across the
 * nine client primaries in the unified app, FIVE fail WCAG AA with white on them
 * — a coral at 3.21, two teals at 2.90 and 3.29, an orange at 2.58 — and four of
 * those clear it comfortably with ink instead. Every primary-filled button on
 * those tenants was shipping a label nobody could read, and no amount of care at
 * the call site would have caught it, because the call site never picks the color.
 *
 * A tenant can still pin `--warm-primary-fg` explicitly; derived values are a
 * floor, not a ceiling.
 */
declare function readableOn(bg: string): string;

export { type AccentRamp, RAMP_STOPS, type RampStop, accentRampTokens, contrastRatio, hexToOklch, makeAccentRamp, oklchToHex, readableOn };
