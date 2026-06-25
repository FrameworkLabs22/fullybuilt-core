import * as React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import { cn } from "../lib/utils";

/** True at ≥1024px (Tailwind `lg`). SSR-safe; updates on resize. */
function useIsLg() {
  const [isLg, setIsLg] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsLg(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isLg;
}

interface SplitPaneProps {
  /** Left / master pane (e.g. a list). */
  list: React.ReactNode;
  /** Right / detail pane. */
  detail: React.ReactNode;
  /** localStorage key for the persisted split ratio (react-resizable-panels autoSaveId). */
  storageId: string;
  /** Default [list, detail] percentages. */
  defaultSizes?: [number, number];
  /** Min [list, detail] percentages. */
  minSizes?: [number, number];
  /** Bounded height so each pane scrolls independently. Default 70vh. */
  height?: string;
  className?: string;
}

/**
 * Master-detail split: two independently-scrolling panes with a draggable
 * divider, ratio persisted per `storageId`. Above `lg` it's a horizontal
 * resizable pair bounded to `height`; below `lg` it stacks (list then detail),
 * each scrolling within its own max-height. Re-presents data already in the
 * list — no new fetching belongs here.
 */
export function SplitPane({
  list,
  detail,
  storageId,
  defaultSizes = [38, 62],
  minSizes = [24, 30],
  height = "70vh",
  className,
}: SplitPaneProps) {
  const isLg = useIsLg();

  if (!isLg) {
    return (
      <div className={cn("flex flex-col gap-gutter", className)}>
        <div className="max-h-[55vh] overflow-y-auto">{list}</div>
        <div className="overflow-y-auto">{detail}</div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId={storageId}
      className={cn("rounded-card border border-warm-border bg-warm-card", className)}
      style={{ height }}
    >
      <ResizablePanel defaultSize={defaultSizes[0]} minSize={minSizes[0]}>
        <div className="h-full overflow-y-auto p-4">{list}</div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-warm-border" />
      <ResizablePanel defaultSize={defaultSizes[1]} minSize={minSizes[1]}>
        <div className="h-full overflow-y-auto p-4">{detail}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
