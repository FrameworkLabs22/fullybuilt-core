import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the project's named custom radii so tailwind-merge dedupes them
// against the shadcn base radii (rounded-sm/md/lg). Without this, e.g.
// cn("rounded-pill", base "rounded-sm") keeps BOTH and CSS source order wins —
// which made segmented-toggle active segments render as rectangles, not pills.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["card", "field", "pill"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
