import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { cn } from "../lib/utils";
function SegTabs(props) {
  return /* @__PURE__ */ jsx(Tabs, { ...props });
}
const SegList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsList, { ref, className: cn("fb-seg-track h-auto", className), ...props }));
SegList.displayName = "SegList";
const SegTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsTrigger,
  {
    ref,
    value,
    className: cn("fb-seg-btn rounded px-2.5 py-1 text-xs font-medium", className),
    ...props,
    children
  }
));
SegTrigger.displayName = "SegTrigger";
const SegContent = TabsContent;
const segTrackClass = "fb-seg-track";
const segItemClass = "fb-seg-btn rounded px-2.5 py-1 text-xs font-medium data-[state=on]:bg-warm-card data-[state=on]:text-warm-ink data-[state=on]:shadow-[inset_0_0_0_1px_var(--warm-border-strong)]";
export {
  SegContent,
  SegList,
  SegTabs,
  SegTrigger,
  segItemClass,
  segTrackClass
};
//# sourceMappingURL=Seg.js.map