import * as React from 'react';

/**
 * Grid/row container that staggers its children in on mount (fade + rise).
 * Each child is wrapped in a motion item, so use it for KPI rows where the
 * children carry no col-span classes. Renders a plain div under
 * prefers-reduced-motion.
 */
declare function Stagger({ className, children }: {
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;

export { Stagger };
