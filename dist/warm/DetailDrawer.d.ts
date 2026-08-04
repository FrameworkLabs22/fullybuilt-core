import * as React from 'react';

interface DetailDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** "md" = 360px, "lg" = 480px. */
    width?: "md" | "lg";
    /** Pinned footer row (actions). */
    footer?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * Right-side slide-out for record detail. An overlay — it never reflows the
 * page, so opening it is layout-shift-free. Header is pinned; the body scrolls
 * independently; an optional footer pins to the bottom. Re-presents data the
 * caller already has.
 */
declare function DetailDrawer({ open, onOpenChange, title, description, width, footer, children, }: DetailDrawerProps): React.JSX.Element;

export { DetailDrawer };
