import * as React from 'react';

/**
 * The wrapper that makes a form a system rather than a pile of inputs.
 *
 * `<Field>` owns the three things every labelled control needs and that call
 * sites reliably get wrong on their own: the label-to-control association, the
 * hint, and the error. It generates one id, points `htmlFor` at it, and hands it
 * back to the control via a render prop along with `aria-describedby` and
 * `aria-invalid` already wired.
 *
 * The alternative — every call site remembering to write its own `id`, match it
 * in `htmlFor`, and add `aria-describedby` when and only when a hint is present —
 * is the kind of thing that is correct in the first ten forms and wrong in the
 * next fifty. Here it cannot be omitted, because there is no way to render the
 * control without receiving the props.
 *
 * An `error` replaces the hint rather than stacking beneath it. Two lines of
 * secondary text under one input is where people stop reading either.
 */
/** The props `<Field>` hands its control. Spread them onto the input. */
interface FieldControlProps {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": true | undefined;
}
interface FieldProps {
    label: React.ReactNode;
    /** Marks the label and sets `required` on the control. */
    required?: boolean;
    /** Secondary text below the control. Hidden while an `error` is showing. */
    hint?: React.ReactNode;
    /** Error message. Its presence is what puts the control in the invalid state. */
    error?: React.ReactNode;
    className?: string;
    children: (props: FieldControlProps) => React.ReactNode;
}
declare function Field({ label, required, hint, error, className, children }: FieldProps): React.JSX.Element;
/**
 * A standalone label, for the cases `<Field>` cannot cover — a fieldset legend
 * over a radio group, or a control whose layout puts the label somewhere Field's
 * stack does not reach.
 */
declare function Label({ required, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
}): React.JSX.Element;
/** Secondary text under a control, for the same standalone cases as `<Label>`. */
declare function Hint({ error, className, ...props }: React.HTMLAttributes<HTMLSpanElement> & {
    error?: boolean;
}): React.JSX.Element;

export { Field, type FieldControlProps, Hint, Label };
