import * as React from 'react';

interface WarmLegendItem {
    key: string;
    label: React.ReactNode;
    color: string;
    /** Series currently toggled off (rendered muted). */
    hidden?: boolean;
}
interface WarmLegendProps {
    /** Explicit items — the standalone / header-legend usage. */
    items?: WarmLegendItem[];
    /** When provided, items become buttons that toggle their series. */
    onToggle?: (key: string) => void;
    /** Injected by Recharts when used as `<Legend content={<WarmLegend />} />`. */
    payload?: Array<{
        value?: string;
        color?: string;
        dataKey?: string | number;
    }>;
    className?: string;
}
/**
 * The one warm legend — a row of color dot + label. Replaces the manual header
 * dot-legends (Support, Fulfillment) and the ad-hoc Recharts `<Legend>` usages.
 * Works two ways:
 *   1. Standalone: `<WarmLegend items={[…]} onToggle={toggle} />`
 *   2. As Recharts content: `<Legend content={<WarmLegend onToggle={toggle} />} />`
 *      (Recharts injects `payload`, which is mapped to items).
 * When `onToggle` is set, items are keyboard-focusable buttons (a11y in Phase 4).
 */
declare function WarmLegend({ items, onToggle, payload, className }: WarmLegendProps): React.JSX.Element | null;

export { WarmLegend, type WarmLegendItem, type WarmLegendProps };
