import * as React from "react";
import { cn } from "../lib/utils";

export type BadgeTone = "neutral" | "danger" | "warn" | "ok" | "accent";

const toneClass: Record<BadgeTone, string> = {
  neutral: "bg-warm-chip text-warm-sub",
  danger: "bg-[#FCE9E6] text-warm-danger",
  warn: "bg-warm-warn-soft text-warm-warn",
  ok: "bg-warm-pos-soft text-warm-pos",
  accent: "bg-warm-primary-soft text-warm-primary",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Pill badge with semantic tones. */
export function Badge({ tone = "neutral", className, children, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill font-bold whitespace-nowrap",
        "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
        toneClass[tone],
        className,
      )}
      style={{ fontSize: 11.5, padding: "3px 9px", ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
