import * as React from "react";
import { cn } from "../lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/** Designed empty state: icon in a chip circle, bold title, sub copy, optional action. */
export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className)}
      {...props}
    >
      {icon && (
        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-warm-chip text-warm-sub">
          {icon}
        </div>
      )}
      <div className="font-bold text-warm-ink">{title}</div>
      {description && <div className="max-w-[360px] text-body-sm text-warm-sub">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
