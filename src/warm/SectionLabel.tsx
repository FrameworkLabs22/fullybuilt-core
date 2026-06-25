import * as React from "react";
import { cn } from "../lib/utils";

/** Uppercase eyebrow label (11px / 700 / faint). */
export function SectionLabel({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-warm-faint font-bold uppercase", className)}
      style={{ fontSize: 11, letterSpacing: "0.04em", ...style }}
      {...props}
    />
  );
}
