import * as React from 'react';

/**
 * The canonical page root: a vertical stack on the 8pt section rhythm (24px).
 * Replaces the `flex flex-col gap-[18px]` that every page repeated, so the
 * page-level rhythm lives in one place. Pass `className` to layer on grid/flex
 * behavior where a page root doubles as a tab container.
 */
declare function PageStack({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

export { PageStack };
