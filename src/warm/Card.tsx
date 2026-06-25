import * as React from "react";
import { cn } from "../lib/utils";
import { pressableSoft } from "./press";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. 8pt baseline: content cards 24 (default), KPI tiles 16. */
  pad?: number;
  /** Lift slightly on hover (KPI tiles, clickable cards). */
  interactive?: boolean;
  /** Depth in the elevation scale. `raised` for hero/featured surfaces. */
  elevation?: "card" | "raised" | "flat";
}

const ELEVATION = {
  card: "shadow-card",
  raised: "shadow-raised",
  flat: "shadow-none",
} as const;

/** Warm Editorial surface: white card, hairline border, soft shadow, 8px radius. */
export function Card({ pad = 24, interactive, elevation = "card", className, style, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-warm-card border border-warm-border rounded-card",
        ELEVATION[elevation],
        interactive && cn("transition-shadow duration-300 hover:shadow-card-hover", pressableSoft),
        className,
      )}
      style={{ padding: pad, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
