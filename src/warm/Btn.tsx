import * as React from "react";
import { cn } from "../lib/utils";
import { pressable } from "./press";

type Kind = "primary" | "ghost" | "dark";

const kindClass: Record<Kind, string> = {
  primary: "bg-brand-red text-white border-brand-red shadow-btn-primary hover:bg-brand-red-light",
  ghost: "bg-warm-card text-warm-ink border-warm-border hover:bg-warm-chip",
  dark: "bg-warm-ink text-white border-warm-ink",
};

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: Kind;
  icon?: React.ReactNode;
}

/** Primary / ghost / dark action button (38px tall, fully rounded). */
export function Btn({ kind = "primary", icon, className, children, ...props }: BtnProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 h-[38px] px-4 rounded-pill text-[13px] font-bold border transition-colors",
        pressable,
        kindClass[kind],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
