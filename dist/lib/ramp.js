const L_CURVE = [0.9704, 0.9311, 0.8694, 0.7797, 0.6995, 0.6609, 0.5803, 0.5001, 0.4209, 0.3509];
const C_CURVE = [0.0169, 0.0334, 0.0553, 0.083, 0.0994, 0.1111, 0.111, 0.1045, 0.0887, 0.0741];
const RAMP_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const srgbToLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const linearToSrgb = (c) => c <= 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
function parseHex(hex) {
  const h = hex.trim().replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255
  ];
}
function hexToOklch(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(A * A + B * B);
  let H = Math.atan2(B, A) * 180 / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}
function oklchToLinearRgb(L, C, H) {
  const hRad = H * Math.PI / 180;
  const A = C * Math.cos(hRad);
  const B = C * Math.sin(hRad);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ];
}
const inGamut = ([r, g, b]) => r >= -1e-4 && r <= 1 + 1e-4 && g >= -1e-4 && g <= 1 + 1e-4 && b >= -1e-4 && b <= 1 + 1e-4;
const toHex = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
function oklchToHex(L, C, H) {
  let lo = 0;
  let hi = C;
  if (!inGamut(oklchToLinearRgb(L, C, H))) {
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinearRgb(L, mid, H))) lo = mid;
      else hi = mid;
    }
  } else {
    lo = C;
  }
  const [r, g, b] = oklchToLinearRgb(L, lo, H).map(linearToSrgb);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
const FALLBACK_HUE = 77.54;
const ACHROMATIC = 8e-3;
function makeAccentRamp(brandHex) {
  const src = hexToOklch(brandHex);
  const hue = !src || src.C < ACHROMATIC ? FALLBACK_HUE : src.H;
  const out = {};
  RAMP_STOPS.forEach((stop, i) => {
    out[stop] = oklchToHex(L_CURVE[i], C_CURVE[i], hue);
  });
  return out;
}
function accentRampTokens(brandHex) {
  const ramp = makeAccentRamp(brandHex);
  const tokens = {};
  for (const stop of RAMP_STOPS) tokens[`--accent-${stop}`] = ramp[stop];
  return tokens;
}
function luminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la == null || lb == null) return 1;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
const INK = "#1C1E24";
function readableOn(bg) {
  return contrastRatio(bg, "#FFFFFF") >= contrastRatio(bg, INK) ? "#FFFFFF" : INK;
}
export {
  RAMP_STOPS,
  accentRampTokens,
  contrastRatio,
  hexToOklch,
  makeAccentRamp,
  oklchToHex,
  readableOn
};
//# sourceMappingURL=ramp.js.map