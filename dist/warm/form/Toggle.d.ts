import * as React from 'react';

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
/** Staged choice — takes effect when the surrounding form is saved. */
declare const Checkbox: React.ForwardRefExoticComponent<ChoiceProps & React.RefAttributes<HTMLInputElement>>;
/** One of a set. Give every member of the group the same `name`. */
declare const Radio: React.ForwardRefExoticComponent<ChoiceProps & React.RefAttributes<HTMLInputElement>>;
/** Immediate choice — takes effect the moment it is flipped. */
declare const Switch: React.ForwardRefExoticComponent<ChoiceProps & React.RefAttributes<HTMLInputElement>>;

export { Checkbox, Radio, Switch };
