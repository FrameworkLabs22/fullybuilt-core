import { jsx, jsxs } from "react/jsx-runtime";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../lib/utils";
function PageTabList({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsList,
    {
      className: cn(
        "h-auto w-full justify-start gap-5 rounded-none border-0 border-b border-warm-border bg-transparent p-0",
        className
      ),
      ...props,
      children
    }
  );
}
function PageTabTrigger({ active: _active, icon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    TabsTrigger,
    {
      className: cn(
        "fb-tab -mb-px flex items-center gap-2 rounded-none border-0 border-b-2 bg-transparent px-0 py-0 pb-2.5 pt-1",
        "text-[13px] font-medium shadow-none transition-colors",
        "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-warm-ink",
        className
      ),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "inline-flex", children: icon }),
        children
      ]
    }
  );
}
export {
  PageTabList,
  PageTabTrigger
};
//# sourceMappingURL=PageTabs.js.map