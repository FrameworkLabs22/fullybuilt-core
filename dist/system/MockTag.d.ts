import * as React from 'react';

/**
 * Data-provenance tag — a small dashed pill marking a sample, estimated or
 * placeholder value.
 *
 * Deliberately GRAY and deliberately dashed. Amber and red are the page's urgency
 * vocabulary ("order soon", "stocked out"); provenance is not urgency, and
 * borrowing an urgency color to mean "we made this number up" trains people to
 * discount the colors that matter. The dashed border says "not solid" without
 * competing for attention.
 */
declare function MockTag({ label, title, }: {
    label?: string;
    title?: string;
}): React.JSX.Element;

export { MockTag };
