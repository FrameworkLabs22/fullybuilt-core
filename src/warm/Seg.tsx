import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { SPRING } from "../lib/motion";
import { cn } from "../lib/utils";

/**
 * Warm segmented tabs — styled wrappers around the shadcn/Radix Tabs base
 * (which stays untouched). Pill track with a white, softly-lifted active segment
 * that **slides** between segments via a shared-layout pill (same pattern as
 * PageTabs / the sidebar). Same composition API: SegTabs > SegList > SegTrigger
 * + SegContent — no call-site changes needed.
 *
 * Radix doesn't expose the active value to React, so SegTabs tracks it (works
 * controlled or uncontrolled) and shares it + a per-instance layoutId via context
 * so each SegTrigger knows whether it's active.
 */
const SegCtx = React.createContext<{ value?: string; layoutId: string } | null>(null);

export function SegTabs({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Tabs>) {
  const layoutId = React.useId();
  const [internal, setInternal] = React.useState<string | undefined>(value ?? defaultValue);
  const current = value ?? internal;
  const handleChange = React.useCallback(
    (v: string) => {
      setInternal(v);
      onValueChange?.(v);
    },
    [onValueChange],
  );
  return (
    <SegCtx.Provider value={{ value: current, layoutId }}>
      <Tabs value={value} defaultValue={defaultValue} onValueChange={handleChange} {...props}>
        {children}
      </Tabs>
    </SegCtx.Provider>
  );
}

export const SegList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn("h-auto gap-0.5 rounded-pill bg-warm-chip p-1 text-warm-sub", className)}
    {...props}
  />
));
SegList.displayName = "SegList";

export const SegTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, value, children, ...props }, ref) => {
  const ctx = React.useContext(SegCtx);
  const reduced = useReducedMotion();
  const active = ctx?.value != null && ctx.value === value;
  return (
    <TabsTrigger
      ref={ref}
      value={value}
      className={cn(
        "relative rounded-pill px-3.5 py-1.5 text-body-sm font-semibold text-warm-sub transition-colors",
        "data-[state=active]:font-bold data-[state=active]:text-warm-ink",
        className,
      )}
      {...props}
    >
      {active && ctx && (
        <motion.span
          layoutId={reduced ? undefined : `seg-pill-${ctx.layoutId}`}
          transition={SPRING}
          className="absolute inset-0 rounded-pill bg-white shadow-sm"
          aria-hidden
        />
      )}
      <span className="relative">{children}</span>
    </TabsTrigger>
  );
});
SegTrigger.displayName = "SegTrigger";

export const SegContent = TabsContent;

/**
 * Class strings for styling other Radix triggers (e.g. ToggleGroupItem) to
 * match the segmented look without wrapping them. (CSS-only — no sliding pill.)
 */
export const segTrackClass = "gap-0.5 rounded-pill bg-warm-chip p-1";
export const segItemClass =
  "rounded-pill px-3.5 py-1.5 text-body-sm font-semibold text-warm-sub transition-colors " +
  "data-[state=on]:bg-white data-[state=on]:font-bold data-[state=on]:text-warm-ink data-[state=on]:shadow-sm";
