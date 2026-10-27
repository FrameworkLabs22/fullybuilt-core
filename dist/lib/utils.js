import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["card", "field", "pill"] }],
      "font-size": [{ text: ["display", "page-title", "title", "body-sm", "label", "meta", "micro"] }]
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