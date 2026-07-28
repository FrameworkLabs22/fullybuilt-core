import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Checkbox, radio and switch.
 *
 * All three are real form inputs with `appearance: none` styling, not buttons
 * wearing ARIA. They submit, they restore on back-navigation, they work inside a
 * `<form>`, and the label is a real `<label>` wrapping the control so the whole
 * row is a hit target without anyone wiring an `htmlFor`.
 *
 * Their ON color is `--warm-primary`, not the accent ramp. The ramp is
 * interaction-only (rule 1): it means "this is the thing you are touching",
 * which is not what a checked box means — a checked box is state, and state that
 * borrowed the focus color would make every settled form look active.
 *
 * **Checkbox vs switch is not a style choice.** A switch applies immediately and
 * a checkbox does not. Use `<Switch>` where flipping it takes effect on the spot
 * (a filter, a preference) and `<Checkbox>` where it is staged until a Save.
 * Getting this backwards is how people lose work to a form they thought they had
 * already applied.
 */

interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** Class for the wrapping label row (the control keeps `className`). */
  rowClassName?: string;
}

/** Wraps a control in its label row, or returns it bare when there is no label. */
function withLabel(control: React.ReactNode, label: React.ReactNode, rowClassName?: string) {
  if (!label) return control;
  return (
    <label className={cn("fb-choice", rowClassName)}>
      {control}
      <span>{label}</span>
    </label>
  );
}

/** Staged choice — takes effect when the surrounding form is saved. */
export const Checkbox = React.forwardRef<HTMLInputElement, ChoiceProps>(function Checkbox(
  { label, rowClassName, className, ...props },
  ref,
) {
  return withLabel(
    <input ref={ref} type="checkbox" className={cn("fb-box", className)} {...props} />,
    label,
    rowClassName,
  );
});

/** One of a set. Give every member of the group the same `name`. */
export const Radio = React.forwardRef<HTMLInputElement, ChoiceProps>(function Radio(
  { label, rowClassName, className, ...props },
  ref,
) {
  return withLabel(
    <input ref={ref} type="radio" className={cn("fb-box", className)} {...props} />,
    label,
    rowClassName,
  );
});

/** Immediate choice — takes effect the moment it is flipped. */
export const Switch = React.forwardRef<HTMLInputElement, ChoiceProps>(function Switch(
  { label, rowClassName, className, ...props },
  ref,
) {
  return withLabel(
    // role="switch" so it is announced as on/off rather than checked/unchecked —
    // the distinction that tells someone it has already taken effect.
    <input ref={ref} type="checkbox" role="switch" className={cn("fb-switch", className)} {...props} />,
    label,
    rowClassName,
  );
});
