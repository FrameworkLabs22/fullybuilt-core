import * as React from 'react';

/**
 * Tooltip layer for every `[data-tip]` element on the page.
 *
 * One delegated listener rather than per-element state, and the box renders
 * `position: fixed` so an `overflow-x-auto` table wrapper cannot clip it — the
 * failure mode that makes per-element tooltips useless inside data grids.
 *
 * Anything can carry a tip by adding `data-tip="…"`; no wrapper component and no
 * import required at the call site. Use <Def> when the tip defines a term and the
 * label should advertise that it is defined.
 *
 * Mount <TipLayer /> ONCE per page, alongside <Toaster />.
 */
declare function TipLayer(): React.JSX.Element | null;
/**
 * A defined term: dotted underline plus the definition on hover. Use for jargon
 * and for metrics whose calculation is not obvious from the label.
 */
declare function Def({ hint, children }: {
    hint: string;
    children: React.ReactNode;
}): React.JSX.Element;

export { Def, TipLayer };
