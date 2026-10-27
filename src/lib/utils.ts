import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the project's named custom radii so tailwind-merge dedupes them
// against the shadcn base radii (rounded-sm/md/lg). Without this, e.g.
// cn("rounded-pill", base "rounded-sm") keeps BOTH and CSS source order wins —
// which made segmented-toggle active segments render as rectangles, not pills.
//
// Same for the named custom FONT SIZES (the consuming apps' tailwind fontSize scale). Without
// this, tailwind-merge reads `text-micro` as a text COLOUR and drops it next to a real colour:
// WarmThead's cn("text-micro text-warm-faint") came out as just "text-warm-faint", so every
// table header rendered at body size (13px) instead of the 11px eyebrow (found in the Team Hub
// UI audit, 2026-10-27). Keep this list in step with the apps' theme.extend.fontSize.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["card", "field", "pill"] }],
      "font-size": [{ text: ["display", "page-title", "title", "body-sm", "label", "meta", "micro"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
