import * as React from 'react';

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
declare function SplitPane({ list, detail, storageId, defaultSizes, minSizes, height, className, }: SplitPaneProps): React.JSX.Element;

export { SplitPane };
