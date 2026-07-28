import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Text input and multi-line input.
 *
 * Both are the same shell: a real border in `border`, no shadow — an input is a
 * surface you write on, and rule 2 ("edges define") applies to it exactly as it
 * applies to a card. The focus treatment is the system's one focus treatment,
 * an accent-600 border with an accent-100 glow, and it is defined in
 * `<SystemStyle />` rather than here so a control added later cannot invent its
 * own.
 *
 * Invalid state comes from `aria-invalid`, which `<Field>` sets when it has an
 * `error`. Driving the visual off the ARIA attribute rather than a `variant`
 * prop means a control cannot look wrong while telling a screen reader it is
 * fine, or the reverse.
 *
 * The box — width, padding, text size — is applied HERE as utilities rather than
 * in `.fb-inp`, so `cn()` can dedupe it against whatever the call site passes.
 * SystemStyle renders in the body and would otherwise beat a call site's
 * `w-[180px]` or `text-xs` on document order alone.
 */

/** The box every control in the system shares. Overridable at the call site. */
export const FIELD_BOX = "w-full px-2.5 py-1.5 text-[12.5px] leading-[18px]";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} className={cn("fb-inp", FIELD_BOX, className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 3, ...props }, ref) {
  return (
    <textarea ref={ref} rows={rows} className={cn("fb-inp", FIELD_BOX, "min-h-16", className)} {...props} />
  );
});
