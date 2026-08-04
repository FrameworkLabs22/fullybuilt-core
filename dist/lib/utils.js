import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["card", "field", "pill"] }]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export {
  cn
};
//# sourceMappingURL=utils.js.map