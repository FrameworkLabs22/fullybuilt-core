import * as React from "react";
import { cn } from "../lib/utils";
import { pressableSoft } from "./press";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. 8pt baseline: content cards 24 (default), KPI tiles 16. */
  pad?: number;
  /** Lift slightly on hover (KPI tiles, clickable cards). */
  interactive?: boolean;
  /**
   * Depth. Defaults to `flat` — the system defines cards by their EDGE, not by a
   * shadow. `raised` is the deliberate exception for a surface that genuinely
   * floats above the page (drawers, popovers, hero panels).
   *
   * `card` is retained as an alias of `flat` so existing call sites keep working;
   * it no longer paints a shadow.
   */
  elevation?: "card" | "raised" | "flat";
}

/**
 * The system's surface.
 *
 * A white card on the page ground, separated by a hairline edge in
 * `borderStrong` — no shadow. The rule the whole system follows:
 *
 *   **Edges define, dividers whisper.**
 *
 * The OUTER edge of a card uses `borderStrong` (#D8DBE1) so the card reads as a
 * distinct object; dividers INSIDE a card use the fainter `border` (#E7E9EE) so
 * they organize without carving it up. Shadows are reserved for things that
 * actually float, which on a dashboard is almost nothing — a page of shadowed
 * cards reads as clutter, and the depth stops meaning anything once everything
 * has it.
 */
export function Card({ pad = 24, interactive, elevation = "flat", className, style, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-warm-card border border-warm-border-strong rounded-card",
        elevation === "raised" && "shadow-raised",
        interactive && cn("transition-colors duration-150 hover:bg-warm-chip/30", pressableSoft),
        className,
      )}
      style={{ padding: pad, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
