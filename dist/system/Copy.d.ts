import * as React from 'react';

/**
 * Hover-revealed copy button. Invisible until its host `.fb-row` is hovered or it
 * receives keyboard focus — the affordance is there when wanted and silent
 * otherwise, which matters in a table where every row would otherwise carry one.
 *
 * Confirms in place (check, 1.5s) rather than firing a toast: the user is looking
 * at the thing they clicked, and a notification for a copy is noise.
 */
declare function Copy({ text, label }: {
    text: string;
    label?: string;
}): React.JSX.Element;

export { Copy };
