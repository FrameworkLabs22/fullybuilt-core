import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

interface DetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** "md" = 360px, "lg" = 480px. */
  width?: "md" | "lg";
  /** Pinned footer row (actions). */
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const WIDTHS = { md: "sm:max-w-[360px]", lg: "sm:max-w-[480px]" } as const;

/**
 * Right-side slide-out for record detail. An overlay — it never reflows the
 * page, so opening it is layout-shift-free. Header is pinned; the body scrolls
 * independently; an optional footer pins to the bottom. Re-presents data the
 * caller already has.
 */
export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  width = "md",
  footer,
  children,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={`flex w-full flex-col gap-0 border-warm-border ${WIDTHS[width]}`}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="-mx-6 mt-section flex-1 overflow-y-auto px-6">{children}</div>
        {footer && (
          <div className="mt-4 flex items-center justify-end gap-2 border-t border-warm-border pt-4">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
