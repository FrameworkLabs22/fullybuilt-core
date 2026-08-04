import * as React from 'react';

/**
 * Centered modal — the system's blocking overlay.
 *
 * The counterpart to `<DetailDrawer>`, and the two are not interchangeable. A
 * drawer re-presents data the user already has, alongside the page it came from;
 * a modal interrupts, because what it asks for has to be answered before
 * anything else makes sense. Reach for the drawer first — most of what gets
 * built as a modal on a dashboard is really a detail view, and a detail view
 * that blocks the page costs the user the context they opened it from.
 *
 * A modal is one of the few things on a dashboard that genuinely floats, so it
 * carries the shadow rule 2 denies a card — and keeps the strong edge as well.
 *
 * Escape and scrim-click close it. Both are deliberate: a dialog that traps you
 * unless you find its button is a dialog people learn to dread. If a specific
 * one must not be dismissed accidentally — a destructive confirm — pass
 * `dismissible={false}`.
 */
declare const MAX_WIDTH: {
    readonly sm: 380;
    readonly md: 520;
    readonly lg: 720;
};
interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    /** Sub-line under the title. Also the dialog's accessible description. */
    description?: React.ReactNode;
    /** sm 380px · md 520px (default) · lg 720px. */
    size?: keyof typeof MAX_WIDTH;
    /** Pinned action row. Put the confirming `<Btn>` last — it reads as the end of the sentence. */
    footer?: React.ReactNode;
    /** Set false for a destructive confirm that must not close on Escape or scrim. */
    dismissible?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare function Modal({ open, onOpenChange, title, description, size, footer, dismissible, className, children, }: ModalProps): React.JSX.Element;

export { Modal };
