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

/** The ramp's fixed lightness curve (OKLab L), measured off the original gold ramp. */
const L_CURVE = [0.9704, 0.9311, 0.8694, 0.7797, 0.6995, 0.6609, 0.5803, 0.5001, 0.4209, 0.3509] as const;

/** The ramp's fixed chroma curve (OKLab C), measured off the same ramp. Clamped
 *  per-stop to whatever the sRGB gamut allows at that lightness and hue. */
const C_CURVE = [0.0169, 0.0334, 0.0553, 0.083, 0.0994, 0.1111, 0.111, 0.1045, 0.0887, 0.0741] as const;

export const RAMP_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type RampStop = (typeof RAMP_STOPS)[number];
export type AccentRamp = Record<RampStop, string>;

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const linearToSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

/** Parse #rgb / #rrggbb into 0–1 sRGB components. Returns null on anything else. */
function parseHex(hex: string): [number, number, number] | null {
  const h = hex.trim().replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

/** sRGB hex → OKLCH. Null when the input isn't a hex color. */
export function hexToOklch(hex: string): { L: number; C: number; H: number } | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

/** OKLCH → linear-RGB triple (may fall outside [0,1] when out of gamut). */
function oklchToLinearRgb(L: number, C: number, H: number): [number, number, number] {
  const hRad = (H * Math.PI) / 180;
  const A = C * Math.cos(hRad);
  const B = C * Math.sin(hRad);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = ([r, g, b]: [number, number, number]) =>
  r >= -1e-4 && r <= 1 + 1e-4 && g >= -1e-4 && g <= 1 + 1e-4 && b >= -1e-4 && b <= 1 + 1e-4;

const toHex = (v: number) =>
  Math.round(Math.min(1, Math.max(0, v)) * 255)
    .toString(16)
    .padStart(2, "0");

/**
 * OKLCH → sRGB hex, reducing chroma until the color fits the sRGB gamut. Keeps
 * lightness and hue exact (the two things the ramp's rhythm depends on) and gives
 * up only saturation, which is what gamut mapping should trade away.
 */
export function oklchToHex(L: number, C: number, H: number): string {
  let lo = 0;
  let hi = C;
  if (!inGamut(oklchToLinearRgb(L, C, H))) {
    // 24 halvings resolves chroma far finer than an 8-bit channel can express.
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinearRgb(L, mid, H))) lo = mid;
      else hi = mid;
    }
  } else {
    lo = C;
  }
  const [r, g, b] = oklchToLinearRgb(L, lo, H).map(linearToSrgb) as [number, number, number];
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** The hue used when a client's brand color is achromatic (pure gray/black/white)
 *  or unparseable — the original Osmo gold, so the fallback is still a designed color. */
const FALLBACK_HUE = 77.54;

/** Below this chroma a color carries no meaningful hue (rounding noise decides it). */
const ACHROMATIC = 0.008;

/**
 * Build the 10-step interaction ramp for a brand color.
 *
 * Only the hue is taken from `brandHex`; lightness and chroma follow the fixed
 * curves (see the module header for why). An achromatic or unparseable brand
 * color falls back to the original gold hue rather than producing a gray ramp
 * that can't signal focus.
 */
export function makeAccentRamp(brandHex: string): AccentRamp {
  const src = hexToOklch(brandHex);
  const hue = !src || src.C < ACHROMATIC ? FALLBACK_HUE : src.H;
  const out = {} as AccentRamp;
  RAMP_STOPS.forEach((stop, i) => {
    out[stop] = oklchToHex(L_CURVE[i], C_CURVE[i], hue);
  });
  return out;
}

/**
 * The ramp as CSS custom properties (`--accent-50` … `--accent-900`), ready to
 * merge into a client's `branding` token map and inject on `:root`.
 */
export function accentRampTokens(brandHex: string): Record<string, string> {
  const ramp = makeAccentRamp(brandHex);
  const tokens: Record<string, string> = {};
  for (const stop of RAMP_STOPS) tokens[`--accent-${stop}`] = ramp[stop];
  return tokens;
}
