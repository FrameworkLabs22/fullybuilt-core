import * as React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../lib/utils";

/**
 * Page-level tab bar — for switching whole page views.
 *
 * An underline bar sitting on a hairline rule, not a floating pill track. Tabs
 * label the content directly beneath them, and the shared rule is what ties the
 * label to the region it names; a detached pill reads as a control that happens
 * to be nearby.
 *
 * The `active` prop is retained for API compatibility but is no longer needed —
 * the active treatment comes from Radix's own `data-state`, so the parent cannot
 * get out of sync with it.
 */
export function PageTabList({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        "h-auto w-full justify-start gap-5 rounded-none border-0 border-b border-warm-border bg-transparent p-0",
        className,
      )}
      {...props}
    >
      {children}
    </TabsList>
  );
}

interface PageTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
  /** @deprecated Active state now comes from Radix `data-state`; this is ignored. */
  active?: boolean;
  icon?: React.ReactNode;
}

export function PageTabTrigger({ active: _active, icon, className, children, ...props }: PageTabTriggerProps) {
  return (
    <TabsTrigger
      className={cn(
        "fb-tab -mb-px flex items-center gap-2 rounded-none border-0 border-b-2 bg-transparent px-0 pb-2.5 pt-1",
        "text-[13px] font-medium shadow-none transition-colors data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </TabsTrigger>
  );
}
