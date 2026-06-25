import * as React from "react";
import { cn } from "../lib/utils";

/**
 * The canonical page root: a vertical stack on the 8pt section rhythm (24px).
 * Replaces the `flex flex-col gap-[18px]` that every page repeated, so the
 * page-level rhythm lives in one place. Pass `className` to layer on grid/flex
 * behavior where a page root doubles as a tab container.
 */
export function PageStack({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-section", className)} {...props}>
      {children}
    </div>
  );
}
