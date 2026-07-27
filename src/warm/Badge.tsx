import * as React from "react";
import { cn } from "../lib/utils";
import { tone as resolveTone, type Tone } from "../system/tone";

/**
 * State badge — a leading dot, then the label.
 *
 * The dot carries the state; the tinted background is support, not the signal.
 * That ordering matters twice over: a saturated dot reads at a glance in a dense
 * table where a pale fill does not, and the state survives for anyone who cannot
 * separate the tint from its neighbours.
 */

/** Legacy tone names, mapped onto the system's five-tone vocabulary. */
export type BadgeTone = "neutral" | "danger" | "warn" | "ok" | "accent" | Tone;

const ALIASES: Record<string, Tone> = {
  neutral: "muted",
  ok: "pos",
  danger: "neg",
  // `accent` predates the accent ramp being interaction-only. It now renders as
  // the neutral tone rather than painting a surface with the accent color.
  accent: "muted",
};

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  tone?: BadgeTone;
  children: React.ReactNode;
}

export function Badge({ tone = "muted", className, children, style, ...props }: BadgeProps) {
  const t = resolveTone(ALIASES[tone as string] ?? (tone as Tone));
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-px",
        "font-sans text-[11px] font-medium leading-[18px]",
        "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
        className,
      )}
      style={{ color: t.fg, background: t.bg, border: `1px solid ${t.fg}33`, ...style }}
      {...props}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.fg }} />
      {children}
    </span>
  );
}
