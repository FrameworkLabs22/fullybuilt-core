import * as React from "react";
import { cn } from "../lib/utils";
import { pressable } from "./press";

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

/** Rounded toggle / filter pill (36px tall). Active = ink fill. */
export function Pill({ icon, active, className, children, ...props }: PillProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 h-9 px-3.5 rounded-pill text-[13px] font-semibold border transition-colors",
        pressable,
        active
          ? "bg-warm-ink text-white border-warm-ink"
          : "bg-warm-card text-warm-sub border-warm-border hover:bg-warm-chip",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
