import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

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

const MAX_WIDTH = { sm: 380, md: 520, lg: 720 } as const;

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

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  footer,
  dismissible = true,
  className,
  children,
}: ModalProps) {
  const block = (e: Event) => {
    if (!dismissible) e.preventDefault();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fb-modal-scrim" />
        <Dialog.Content
          className={cn("fb-modal", className)}
          style={{ maxWidth: MAX_WIDTH[size] }}
          onEscapeKeyDown={block}
          onPointerDownOutside={block}
          onInteractOutside={block}
        >
          <div className="px-6 pb-4 pt-5">
            <Dialog.Title className="text-warm-ink pr-7 text-[15px] font-semibold leading-5">
              {title}
            </Dialog.Title>
            {description ? (
              <Dialog.Description className="text-warm-faint mt-1 pr-7 text-xs leading-relaxed">
                {description}
              </Dialog.Description>
            ) : (
              // Radix warns when a dialog has no description; this says "none on
              // purpose" instead of leaving a console warning for every modal.
              <Dialog.Description />
            )}
          </div>

          <div className="border-warm-border flex-1 overflow-y-auto border-t px-6 py-5">{children}</div>

          {footer && (
            <div className="border-warm-border flex items-center justify-end gap-2 border-t px-6 py-4">
              {footer}
            </div>
          )}

          {dismissible && (
            <Dialog.Close className="fb-modal-x" aria-label="Close">
              <X size={13} weight="bold" />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
