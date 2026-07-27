import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { cn } from "../lib/utils";

/**
 * Segmented control — styled wrappers around the shadcn/Radix Tabs base (which
 * stays untouched). Composition API is unchanged: SegTabs > SegList > SegTrigger
 * + SegContent.
 *
 * The active segment LIFTS in place; it does not slide. A sliding pill animates
 * the control itself rather than the change it causes, and on a filter that
 * re-renders a table underneath, the eye follows the pill instead of the data
 * that just moved. Selection is instant; the content it drives is the thing worth
 * watching.
 */
export function SegTabs(props: React.ComponentPropsWithoutRef<typeof Tabs>) {
  return <Tabs {...props} />;
}

export const SegList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => (
  <TabsList ref={ref} className={cn("fb-seg-track h-auto", className)} {...props} />
));
SegList.displayName = "SegList";

export const SegTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, value, children, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    value={value}
    className={cn("fb-seg-btn rounded px-2.5 py-1 text-xs font-medium", className)}
    {...props}
  >
    {children}
  </TabsTrigger>
));
SegTrigger.displayName = "SegTrigger";

export const SegContent = TabsContent;

/**
 * Class strings for styling other Radix triggers (e.g. ToggleGroupItem) to match
 * the segmented look without wrapping them. ToggleGroup reports selection as
 * `data-state="on"`, which the shared `[data-state=active]` rule does not match,
 * so the active treatment is spelled out here.
 */
export const segTrackClass = "fb-seg-track";
export const segItemClass =
  "fb-seg-btn rounded px-2.5 py-1 text-xs font-medium " +
  "data-[state=on]:bg-warm-card data-[state=on]:text-warm-ink " +
  "data-[state=on]:shadow-[inset_0_0_0_1px_var(--warm-border-strong)]";
