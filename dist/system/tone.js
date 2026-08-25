import { WARM } from "../warm/theme";
function tone(t) {
  switch (t) {
    case "pos":
      return { fg: WARM.pos, bg: WARM.posSoft };
    case "warn":
      return { fg: WARM.warn, bg: WARM.warnSoft };
    case "neg":
      return { fg: WARM.danger, bg: WARM.dangerSoft };
    case "excess":
      return { fg: WARM.excess, bg: WARM.excessSoft };
    case "muted":
    default:
      return { fg: WARM.sub, bg: WARM.chip };
  }
}
const TONE_VARS = {
  pos: { fg: "--warm-pos", bg: "--warm-pos-soft" },
  warn: { fg: "--warm-warn", bg: "--warm-warn-soft" },
  neg: { fg: "--warm-danger", bg: "--warm-danger-soft" },
  excess: { fg: "--warm-excess", bg: "--warm-excess-soft" },
  muted: { fg: "--warm-sub", bg: "--warm-chip" }
};
function toneVar(t) {
  const v = TONE_VARS[t] ?? TONE_VARS.muted;
  const lit = tone(t);
  return {
    fg: `var(${v.fg}, ${lit.fg})`,
    bg: `var(${v.bg}, ${lit.bg})`,
    border: `color-mix(in srgb, var(${v.fg}, ${lit.fg}) 20%, transparent)`
  };
}
export {
  tone,
  toneVar
};
//# sourceMappingURL=tone.js.map