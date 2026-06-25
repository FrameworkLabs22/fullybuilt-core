import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { SPRING } from "../lib/motion";
import { cn } from "../lib/utils";

/**
 * Page-level tab bar — bigger sibling of Seg for switching whole page views.
 * White elevated track, icon + label triggers, and the sidebar's animated
 * active pill (spring layoutId) sliding between tabs. Requires the parent to
 * control the Tabs value so triggers know they're active (Radix state isn't
 * visible to React for the motion pill).
 */
export function PageTabList({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        "h-auto w-fit gap-1 rounded-pill border border-warm-border bg-white p-1.5 shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </TabsList>
  );
}

interface PageTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
  /** Whether this tab is the active one (parent controls the Tabs value). */
  active: boolean;
  icon?: React.ReactNode;
}

export function PageTabTrigger({ active, icon, className, children, ...props }: PageTabTriggerProps) {
  const reduced = useReducedMotion() ?? false;
  return (
    <TabsTrigger
      className={cn(
        "relative rounded-pill px-5 py-2 text-body-sm font-semibold text-warm-sub transition-colors",
        "hover:text-warm-ink data-[state=active]:font-bold data-[state=active]:text-brand-red",
        "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    >
      {active && (
        <motion.span
          layoutId={reduced ? undefined : "page-tab-pill"}
          transition={SPRING}
          className="absolute inset-0 rounded-pill bg-warm-primary-soft"
          aria-hidden
        />
      )}
      {icon && <span className="relative mr-1.5 inline-flex">{icon}</span>}
      <span className="relative">{children}</span>
    </TabsTrigger>
  );
}
