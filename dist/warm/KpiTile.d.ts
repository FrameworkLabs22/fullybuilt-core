import * as React from 'react';

interface KpiTileProps {
    label: string;
    value: React.ReactNode;
    spark?: {
        data: any[];
        key: string;
    };
    sparkColor?: string;
    delta?: {
        pct: number | null | undefined;
        label?: string;
        invert?: boolean;
    };
    /** Renders a warn-tone badge instead of a delta (e.g. "Needs attention"). */
    badge?: React.ReactNode;
    /** Faint sub line shown when there's no delta/badge (e.g. "Not tracked yet"). */
    sub?: string;
    /** Small icon rendered right of the label. */
    icon?: React.ReactNode;
    /** Content below the delta row (e.g. an action button). */
    footer?: React.ReactNode;
    /** Override the big value color (e.g. danger for out-of-stock). */
    valueColor?: string;
    /** Show a skeleton in place of the value while data loads. */
    loading?: boolean;
    /** When set, the whole tile becomes a link that drills into this route. */
    to?: string;
    /** Force a variant, overriding any surrounding KpiVariantContext. */
    variant?: "tile" | "strip";
}
/** KPI tile: label / big tabular value (+ optional sparkline) / delta, badge or sub line. */
declare function KpiTile(props: KpiTileProps): React.JSX.Element;

export { KpiTile };
