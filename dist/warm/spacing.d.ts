/**
 * 8pt spacing baseline — single source of truth for the places that take JS
 * numbers (Card `pad`, ChartCard/RankedList header offsets) rather than Tailwind
 * classes. Mirrors the semantic `spacing` tokens in tailwind.config.ts so retuning
 * the system (or theming per-client) is a one-file edit.
 *
 * Rule: the card rhythm — the gaps BETWEEN cards (section stacks and grid
 * gutters) — is the Overview-reference 12px, so every page reads at the same
 * density. Card/container PADDING and app-shell dimensions stay on the 8pt grid
 * (16/24/32/48). The 4pt sub-grid (4/12) also covers intra-component
 * micro-spacing (icon↔label, label↔value, table-cell vertical padding).
 */
declare const SPACE: {
    /** Page-level section stack gap (12px — matches the Overview card rhythm). */
    readonly section: 12;
    /** Grid / card gutter (12px — matches the Overview card rhythm). */
    readonly gutter: 12;
    /** Default content-card inner padding. */
    readonly cardPad: 24;
    /** KPI tile inner padding (denser than content cards). */
    readonly kpiPad: 16;
    /** Card header → body gap (was 14, now on-grid). */
    readonly headerGap: 16;
};

export { SPACE };
