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
export {
  tone
};
//# sourceMappingURL=tone.js.map