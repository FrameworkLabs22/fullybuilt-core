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
 */

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} className={cn("fb-inp", className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 3, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={cn("fb-inp", className)} {...props} />;
});
