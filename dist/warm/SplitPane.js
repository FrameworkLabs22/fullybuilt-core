import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import { cn } from "../lib/utils";
function useIsLg() {
  const [isLg, setIsLg] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsLg(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isLg;
}
function SplitPane({
  list,
  detail,
  storageId,
  defaultSizes = [38, 62],
  minSizes = [24, 30],
  height = "70vh",
  className
}) {
  const isLg = useIsLg();
  if (!isLg) {
    return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-gutter", className), children: [
      /* @__PURE__ */ jsx("div", { className: "max-h-[55vh] overflow-y-auto", children: list }),
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: detail })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    ResizablePanelGroup,
    {
      direction: "horizontal",
      autoSaveId: storageId,
      className: cn("rounded-card border border-warm-border bg-warm-card", className),
      style: { height },
      children: [
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSizes[0], minSize: minSizes[0], children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4", children: list }) }),
        /* @__PURE__ */ jsx(ResizableHandle, { withHandle: true, className: "bg-warm-border" }),
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSizes[1], minSize: minSizes[1], children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4", children: detail }) })
      ]
    }
  );
}
export {
  SplitPane
};
//# sourceMappingURL=SplitPane.js.map