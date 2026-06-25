import * as React from 'react';
import { ComponentProps } from 'react';
import { XAxis, YAxis, LabelList, ReferenceLine } from 'recharts';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Warm Editorial (Direction A) — literal palette + Recharts styling helpers.
 *
 * Mirrors the `--warm-*` CSS variables in index.css. Components style color via
 * Tailwind `warm-*` classes; this object exists for the places that need literal
 * values — chiefly Recharts series/strokes, which take SVG color props.
 */
declare const WARM: {
    readonly bg: "#F7F8FA";
    readonly card: "#FFFFFF";
    readonly ink: "#1C1E24";
    readonly sub: "#6E727B";
    readonly faint: "#A6ABB5";
    readonly border: "#E7E9EE";
    readonly borderStrong: "#D8DBE1";
    readonly chip: "#EEF0F3";
    readonly track: "#ECEEF2";
    readonly primary: "#0E0E06";
    readonly primarySoft: "#F6F6AE";
    readonly pos: "#2B9E8F";
    readonly posSoft: "#E4F4F1";
    readonly blue: "#29C0DD";
    readonly blueSoft: "#FCFAD0";
    readonly blueMid: "#F6F949";
    readonly badgePos: "#15803D";
    readonly badgePosBg: "#DCFCE7";
    readonly badgeNeg: "#B42318";
    readonly badgeNegBg: "#FCE7E6";
    readonly warn: "#C77A1E";
    readonly warnSoft: "#FBF1E2";
    readonly danger: "#d94a36";
    readonly cream: "#F4F5F6";
    readonly navy: "#0E0E06";
};
/** Recharts axis tick style. (WARM.sub, not WARM.faint, to clear WCAG AA contrast on the light bg.) */
declare const axisTick: {
    readonly fontSize: 11;
    readonly fill: "#6E727B";
};
/** Recharts <Tooltip> props for a soft warm container. */
declare const chartTip: {
    readonly contentStyle: {
        readonly fontSize: 12;
        readonly borderRadius: 10;
        readonly border: "1px solid #E7E9EE";
        readonly background: "#fff";
    };
    readonly cursor: {
        readonly fill: "#EEF0F3";
        readonly fillOpacity: 0.6;
    };
};
/**
 * Brand-led categorical palette for multi-series charts (fees mix, AI charts).
 * Built from the Sidekick palette plus muted slate/tint extensions — no
 * off-brand blues/violets/pinks.
 */
declare const CHART_SERIES: readonly ["#0E0E06", "#29C0DD", "#C77A1E", "#cfdd28", "#8E9DAC", "#2B9E8F", "#3E5871", "#5C7AA8", "#4C6FA0", "#A9C2DD", "#B8CDE5", "#B87A1C"];
/** Pick a series color by index (cycles through the palette). */
declare const seriesColor: (i: number) => "#0E0E06" | "#2B9E8F" | "#29C0DD" | "#C77A1E" | "#cfdd28" | "#8E9DAC" | "#3E5871" | "#5C7AA8" | "#4C6FA0" | "#A9C2DD" | "#B8CDE5" | "#B87A1C";
/** Faint dashed grid. Spread onto <CartesianGrid {...GRID} />. */
declare const GRID: {
    readonly strokeDasharray: "3 3";
    readonly stroke: "#ECEEF2";
};
/** UPPER_CASE aliases so charts can use one import style everywhere. */
declare const AXIS_TICK: {
    readonly fontSize: 11;
    readonly fill: "#6E727B";
};
declare const TOOLTIP_STYLE: {
    readonly fontSize: 12;
    readonly borderRadius: 10;
    readonly border: "1px solid #E7E9EE";
    readonly background: "#fff";
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Inner padding in px. 8pt baseline: content cards 24 (default), KPI tiles 16. */
    pad?: number;
    /** Lift slightly on hover (KPI tiles, clickable cards). */
    interactive?: boolean;
    /** Depth in the elevation scale. `raised` for hero/featured surfaces. */
    elevation?: "card" | "raised" | "flat";
}
/** Warm Editorial surface: white card, hairline border, soft shadow, 8px radius. */
declare function Card({ pad, interactive, elevation, className, style, children, ...props }: CardProps): React.JSX.Element;

/** Buttons / pills / small controls — 3% press. */
declare const pressable = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.97]";
/** Large surfaces (cards) — gentler 1.5% press so big elements don't jump. */
declare const pressableSoft = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.985]";

/** Uppercase eyebrow label (11px / 700 / faint). */
declare function SectionLabel({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

type BadgeTone = "neutral" | "danger" | "warn" | "ok" | "accent";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
}
/** Pill badge with semantic tones. */
declare function Badge({ tone, className, children, style, ...props }: BadgeProps): React.JSX.Element;

interface DeltaProps {
    /** Signed percentage. null/undefined renders just the label (or nothing). */
    pct: number | null | undefined;
    label?: string;
    /** When true, a negative delta is "good" (teal) — e.g. ship time, days to stockout. */
    invert?: boolean;
}
/** Trend delta: up=teal / down=red by default; `invert` flips which direction is good. */
declare function Delta({ pct, label, invert }: DeltaProps): React.JSX.Element | null;

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    active?: boolean;
}
/** Rounded toggle / filter pill (36px tall). Active = ink fill. */
declare function Pill({ icon, active, className, children, ...props }: PillProps): React.JSX.Element;

type Kind = "primary" | "ghost" | "dark";
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    kind?: Kind;
    icon?: React.ReactNode;
}
/** Primary / ghost / dark action button (38px tall, fully rounded). */
declare function Btn({ kind, icon, className, children, ...props }: BtnProps): React.JSX.Element;

interface SparklineProps {
    data: any[];
    dataKey: string;
    color?: string;
    width?: number;
    height?: number;
}
/** Tiny inline trend line (no axes). */
declare function Sparkline({ data, dataKey, color, width, height }: SparklineProps): React.JSX.Element;

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

/**
 * Render variant for KPIs. "tile" is the standard hero card; "strip" is the
 * compact cell used inside <KpiStrip> for overflow KPIs. Provided via context
 * so widget render() functions don't need to know which variant they're in.
 *
 * Kept in its own module (no component exports) so KpiTile/KpiStrip stay
 * fast-refresh friendly.
 */
declare const KpiVariantContext: React.Context<"tile" | "strip">;

/**
 * Dense, full-width strip of compact KPI cells — used for "overflow" KPIs that
 * would otherwise sprawl the page once a row of hero tiles is full. Renders one
 * card surface with hairline dividers between cells; children should be
 * <KpiTile> widgets, which pick up the compact "strip" variant via context.
 *
 * The grid is offset by -ml-px -mt-px so each cell's own left/top divider falls
 * under the card border on the outer edges and only shows between cells — which
 * also keeps a ragged final row clean (no stray dividers past the last cell).
 */
declare function KpiStrip({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;

interface ChartCardProps {
    title: string;
    subtitle?: string;
    /** Top-right slot (badge, delta, toggle…). */
    right?: React.ReactNode;
    height?: number;
    className?: string;
    /** Show a skeleton in place of the chart while data loads. */
    loading?: boolean;
    /** Render the in-body empty state instead of the chart (no data). */
    empty?: boolean;
    /** Empty-state copy (defaults to "No data for this period"). */
    emptyMessage?: string;
    /** Legend row rendered below the chart body. */
    legend?: React.ReactNode;
    /** Accessible summary of the chart for screen readers (sets role="img"). */
    ariaLabel?: string;
    /** Visually-hidden data-table fallback (see ChartDataTable). */
    dataTable?: React.ReactNode;
    children: React.ReactElement;
}
/** Card with a title/subtitle header and a fixed-height responsive chart body. */
declare function ChartCard({ title, subtitle, right, height, className, loading, empty, emptyMessage, legend, ariaLabel, dataTable, children, }: ChartCardProps): React.JSX.Element;

interface RankedItem {
    label: string;
    value: number;
    /** Optional small note after the value (e.g. complaint count). */
    annotation?: React.ReactNode;
}
interface RankedListCardProps {
    title: string;
    subtitle?: string;
    /** Top-right slot (badge, delta, toggle…). */
    right?: React.ReactNode;
    height?: number;
    className?: string;
    loading?: boolean;
    items: RankedItem[];
    /** Shown when items is empty (after loading). */
    emptyText?: string;
    formatValue?: (v: number) => string;
}
/**
 * Ranked label/count list with inline magnitude bars — the narrow-column
 * alternative to a horizontal bar chart: full labels, exact counts, no axis
 * chrome. Header matches ChartCard so the two mix in a grid.
 */
declare function RankedListCard({ title, subtitle, right, height, className, loading, items, emptyText, formatValue, }: RankedListCardProps): React.JSX.Element;

/** Faint warm gridline. Horizontal-only by default. */
declare const WarmGrid: ({ vertical }: {
    vertical?: boolean;
}) => React.JSX.Element;
/**
 * Vertical area-fill gradient: solid-ish at the top, fading to transparent at the
 * baseline. Drop inside a Recharts `<defs>` and reference via `fill={`url(#id)`}`
 * on an <Area>. Keeps area charts on-brand (pass WARM.primary / WARM.blue) while
 * giving them depth a flat stroke lacks. `top` is the peak opacity.
 */
declare const ChartGradient: ({ id, color, top, }: {
    id: string;
    color: string;
    top?: number;
}) => React.JSX.Element;
/**
 * Bar-fill gradient: full color at the value end, fading to a lighter (but still
 * visible) base — the bar-chart analog of ChartGradient, so bars share the same
 * depth as the area fills. Vertical bars fade top→bottom; pass `horizontal` for
 * left→right bars (e.g. a `layout="vertical"` Top-SKUs chart). Drop inside a
 * Recharts `<defs>` and reference via `fill={`url(#id)`}` on a <Bar>.
 */
declare const BarGradient: ({ id, color, horizontal, base, }: {
    id: string;
    color: string;
    horizontal?: boolean;
    base?: number;
}) => React.JSX.Element;

interface WarmTooltipItem {
    name?: string;
    value?: number | string;
    color?: string;
    dataKey?: string | number;
    payload?: Record<string, unknown>;
}
interface WarmTooltipProps {
    /** Injected by Recharts when used as `<Tooltip content={<WarmTooltip … />} />`. */
    active?: boolean;
    payload?: WarmTooltipItem[];
    label?: string | number;
    /** Format the header label (e.g. a date key → "Mar 4"). */
    labelFormatter?: (label: string | number) => React.ReactNode;
    /** Format each series value (e.g. currency / percent). Receives the series dataKey and full row. */
    valueFormatter?: (value: number | string, dataKey?: string | number, item?: WarmTooltipItem) => React.ReactNode;
    /** Relabel a series (defaults to its Recharts `name`). */
    nameFormatter?: (name: string | undefined, dataKey?: string | number) => React.ReactNode;
    /** Hide the header label row (single-series charts where the label is redundant). */
    hideLabel?: boolean;
}
/**
 * The one warm tooltip for every chart — replaces the `chartTip` preset, the
 * bespoke JSX tooltips in InventoryChart, and the one-off `contentStyle` overrides.
 * Color swatch + series name + right-aligned value, on a flat hairline card.
 *
 * Usage: `<Tooltip cursor={…} content={<WarmTooltip labelFormatter={fmtDay} valueFormatter={fmt} />} />`
 */
declare function WarmTooltip({ active, payload, label, labelFormatter, valueFormatter, nameFormatter, hideLabel, }: WarmTooltipProps): React.JSX.Element | null;

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

interface ChartEmptyProps {
    /** Primary line (e.g. "No data for this period"). */
    message?: string;
    /** Optional secondary line. */
    hint?: string;
    icon?: React.ReactNode;
    className?: string;
}
/**
 * In-body empty state for charts — fills the ChartCard's fixed-height plot area so
 * an empty chart reads as "no data" instead of blank white space. Distinct from the
 * page-level `EmptyState` (which owns its own card + vertical padding).
 */
declare function ChartEmpty({ message, hint, icon, className }: ChartEmptyProps): React.JSX.Element;

interface ChartDataTableColumn {
    /** Row object key. */
    key: string;
    /** Human header (e.g. "Net sales"). */
    label: string;
    /** Optional value formatter for the cell text. */
    format?: (value: unknown) => string;
}
interface ChartDataTableProps {
    caption: string;
    columns: ChartDataTableColumn[];
    rows: Array<Record<string, unknown>>;
}
/**
 * Visually-hidden data table that mirrors a chart's series for screen readers.
 * Rendered alongside the (aria-hidden) SVG chart so assistive tech gets the numbers.
 * Uses the `.sr-only` utility (already in the Tailwind/shadcn baseline).
 */
declare function ChartDataTable({ caption, columns, rows }: ChartDataTableProps): React.JSX.Element;

/**
 * Axis prop-builders — bundle the repeated `tick`/`tickLine`/`axisLine`/`width`
 * boilerplate every chart re-declares, plus responsive tick sizing (generalizing
 * the mobile logic that previously lived only in InventoryChart).
 *
 * Usage: `<XAxis {...timeXAxis({ dataKey: "period", tickFormatter: fmt, isMobile })} />`
 */

type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;
interface TimeXOpts {
    dataKey: string;
    tickFormatter?: (value: string) => string;
    isMobile?: boolean;
}
/** X axis for time/period series: thin baseline, no tick marks, edge-preserving ticks. */
declare function timeXAxis({ dataKey, tickFormatter, isMobile }: TimeXOpts): XAxisProps;
interface CategoryXOpts {
    dataKey: string;
    tickFormatter?: (value: string) => string;
    isMobile?: boolean;
    /** Force every category label (e.g. short month sets). */
    showAll?: boolean;
}
/** X axis for categorical series (months, zones). */
declare function categoryXAxis({ dataKey, tickFormatter, isMobile, showAll }: CategoryXOpts): XAxisProps;
interface NumberYOpts {
    tickFormatter?: (value: number) => string;
    width?: number;
    isMobile?: boolean;
    yAxisId?: string;
    orientation?: "left" | "right";
    domain?: YAxisProps["domain"];
    /** Axis title (e.g. "%" / "days") — used for dual-axis charts. */
    label?: string;
    /** Hide the category/numeric labels (keep the scale only). */
    hide?: boolean;
}
/** Numeric Y axis: no tick marks, no axis line, formatted ticks, optional dual-axis label. */
declare function numberYAxis({ tickFormatter, width, isMobile, yAxisId, orientation, domain, label, hide, }?: NumberYOpts): YAxisProps;
/** Category Y axis for horizontal (layout="vertical") bar charts — e.g. Top SKUs. */
declare function categoryYAxis({ dataKey, width, isMobile, }: {
    dataKey: string;
    width?: number;
    isMobile?: boolean;
}): YAxisProps;

/**
 * Reference-line and value-label prop-builders. These return props to spread onto
 * the Recharts primitives directly (`<ReferenceLine {...} />`, `<LabelList {...} />`)
 * rather than wrapping them — Recharts detects these children by element type, so a
 * wrapper component would be ignored.
 */

type ReferenceLineProps = ComponentProps<typeof ReferenceLine>;
type LabelListProps = ComponentProps<typeof LabelList>;
interface TargetOpts {
    /** Horizontal target (most common — a goal/SLA on the Y scale). */
    y?: number;
    /** Vertical target (a marker on the X scale). */
    x?: number | string;
    label: string;
    color?: string;
    /** For dual-axis charts, the axis this target belongs to. */
    yAxisId?: string;
}
/**
 * A warm-styled target/SLA line — dashed, muted, with a small label.
 * Usage: `<ReferenceLine {...referenceTarget({ y: 95, label: "SLA 95%" })} />`
 */
declare function referenceTarget({ y, x, label, color, yAxisId }: TargetOpts): ReferenceLineProps;
interface ValueLabelOpts {
    formatter?: (value: number) => string;
    position?: LabelListProps["position"];
    color?: string;
}
/**
 * Value labels on bars (e.g. Top SKUs revenue, delivery-by-zone counts).
 * Usage: `<Bar …><LabelList {...barValueLabel({ formatter: fmt })} /></Bar>`
 */
declare function barValueLabel({ formatter, position, color }?: ValueLabelOpts): LabelListProps;

/** Default plot margin for time/category charts (small left inset; axis owns the gutter). */
declare const CHART_MARGIN: {
    readonly top: 8;
    readonly right: 12;
    readonly left: 0;
    readonly bottom: 0;
};
/** Tighter margin for compact / sparkline-ish charts. */
declare const CHART_MARGIN_COMPACT: {
    readonly top: 6;
    readonly right: 8;
    readonly left: 0;
    readonly bottom: 0;
};
/** Standard chart body heights (px) used with ChartCard `height`. */
declare const CHART_HEIGHT: {
    readonly hero: 300;
    readonly default: 200;
    readonly compact: 180;
};
/** Rounded top corners for vertical bars. */
declare const BAR_RADIUS: [number, number, number, number];
/** Rounded right corners for horizontal (layout="vertical") bars. */
declare const BAR_RADIUS_H: [number, number, number, number];
/** Active (hover) dot for line/area series, tinted to the series color. */
declare const activeDot: (color: string) => {
    r: number;
    strokeWidth: number;
    stroke: string;
    fill: string;
};
/** Bar-chart hover cursor — soft grey fill behind the active bar. */
declare const barCursor: {
    readonly fill: "#EEF0F3";
    readonly fillOpacity: 0.6;
};
/** Line/area-chart hover cursor — a faint vertical crosshair on the brand border color. */
declare const crosshairCursor: {
    readonly stroke: "#D8DBE1";
    readonly strokeWidth: 1;
    readonly strokeDasharray: "3 3";
};

type Align = "left" | "right" | "center";
/**
 * House table style (see Planning.tsx): 13px body, uppercase faint header,
 * hairline row rules, tabular numerals for numeric cells. Composable pieces —
 * pages keep full control of their rows/cells.
 */
declare function WarmTable({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>): React.JSX.Element;
/** Header row wrapper — renders <thead><tr>…</tr></thead> with eyebrow styling. */
declare function WarmThead({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element;
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    align?: Align;
}
declare function Th({ align, className, children, ...props }: ThProps): React.JSX.Element;
declare function WarmTr({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element;
interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: Align;
    /** Right-aligned tabular numerals for figures. */
    numeric?: boolean;
}
declare function Td({ align, numeric, className, children, ...props }: TdProps): React.JSX.Element;

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    action?: React.ReactNode;
}
/** Designed empty state: icon in a chip circle, bold title, sub copy, optional action. */
declare function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps): React.JSX.Element;

declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare function SegTabs({ value, defaultValue, onValueChange, children, ...props }: React.ComponentPropsWithoutRef<typeof Tabs>): React.JSX.Element;
declare const SegList: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SegTrigger: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SegContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Class strings for styling other Radix triggers (e.g. ToggleGroupItem) to
 * match the segmented look without wrapping them. (CSS-only — no sliding pill.)
 */
declare const segTrackClass = "gap-0.5 rounded-pill bg-warm-chip p-1";
declare const segItemClass: string;

/**
 * Page-level tab bar — bigger sibling of Seg for switching whole page views.
 * White elevated track, icon + label triggers, and the sidebar's animated
 * active pill (spring layoutId) sliding between tabs. Requires the parent to
 * control the Tabs value so triggers know they're active (Radix state isn't
 * visible to React for the motion pill).
 */
declare function PageTabList({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsList>): React.JSX.Element;
interface PageTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
    /** Whether this tab is the active one (parent controls the Tabs value). */
    active: boolean;
    icon?: React.ReactNode;
}
declare function PageTabTrigger({ active, icon, className, children, ...props }: PageTabTriggerProps): React.JSX.Element;

interface CountUpProps {
    value: number;
    /** Formats the in-flight number (e.g. compact currency). Defaults to toLocaleString. */
    format?: (n: number) => string;
    /** Animation duration in seconds. */
    duration?: number;
}
/**
 * Animated number count-up for KPI values. Pass the raw number plus a format
 * function — never a pre-formatted string. Renders the final value immediately
 * under prefers-reduced-motion and re-animates from the previous value when
 * `value` changes.
 */
declare function CountUp({ value, format, duration }: CountUpProps): React.JSX.Element;

/**
 * Grid/row container that staggers its children in on mount (fade + rise).
 * Each child is wrapped in a motion item, so use it for KPI rows where the
 * children carry no col-span classes. Renders a plain div under
 * prefers-reduced-motion.
 */
declare function Stagger({ className, children }: {
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;

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

/**
 * The canonical page root: a vertical stack on the 8pt section rhythm (24px).
 * Replaces the `flex flex-col gap-[18px]` that every page repeated, so the
 * page-level rhythm lives in one place. Pass `className` to layer on grid/flex
 * behavior where a page root doubles as a tab container.
 */
declare function PageStack({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

/**
 * Fluid density grid. Auto-packs as many equal columns as fit at `min` width,
 * then stretches — so wider control-center screens show MORE cards, not more
 * gutter, with zero breakpoint management. Use for uniform card rows (KPI tiles,
 * metric cards). For grids with a "wide"/full-span child, use GridRow instead —
 * auto-fit has no column count to span.
 *
 * Gutter is the 8pt `gap-gutter` (16px). `min` is the per-card minimum track
 * width (e.g. "220px" KPIs, "300px" metric cards).
 */
declare function AutoGrid({ min, className, style, children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    min?: string;
}): React.JSX.Element;
/**
 * Explicit-breakpoint grid for cases AutoGrid can't model — chiefly grids that
 * mix normal and full-width children (a "wide" chart uses `lg:col-span-2`).
 * Static class strings (Tailwind-safe). Gutter is the 8pt `gap-gutter`.
 */
declare const GRID_VARIANTS: {
    /** 1 → 2-up. Pair with `lg:col-span-2` on wide children for full-bleed rows. */
    readonly halves: "grid grid-cols-1 gap-gutter lg:grid-cols-2";
    /** 1 → 2 → 3-up. */
    readonly thirds: "grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3";
    /** 2 → 4-up, denser on ultrawide. */
    readonly quarters: "grid grid-cols-2 gap-gutter lg:grid-cols-4 2xl:grid-cols-6";
};
declare function GridRow({ variant, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof GRID_VARIANTS;
}): React.JSX.Element;

interface WidgetContainerProps {
    title: string;
    subtitle?: string;
    /** Top-right slot (badge, delta, toggle…). */
    right?: React.ReactNode;
    /** Fixed body height in px — reserved during load so async data never shifts layout. */
    height?: number;
    /** When true the height is a floor (body can grow); otherwise it's locked. */
    grow?: boolean;
    className?: string;
    loading?: boolean;
    /** Optional footer row below the body. */
    footer?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * Generalized dashboard widget surface: a Card with the house header (title /
 * subtitle / right slot, 16px to body), a height-locked body that shows a
 * skeleton while `loading` so the grid never reflows, and an optional footer.
 * ChartCard/RankedListCard predate this and keep their own header; new widgets
 * should compose WidgetContainer for consistency.
 */
declare function WidgetContainer({ title, subtitle, right, height, grow, className, loading, footer, children, }: WidgetContainerProps): React.JSX.Element;

interface SplitPaneProps {
    /** Left / master pane (e.g. a list). */
    list: React.ReactNode;
    /** Right / detail pane. */
    detail: React.ReactNode;
    /** localStorage key for the persisted split ratio (react-resizable-panels autoSaveId). */
    storageId: string;
    /** Default [list, detail] percentages. */
    defaultSizes?: [number, number];
    /** Min [list, detail] percentages. */
    minSizes?: [number, number];
    /** Bounded height so each pane scrolls independently. Default 70vh. */
    height?: string;
    className?: string;
}
/**
 * Master-detail split: two independently-scrolling panes with a draggable
 * divider, ratio persisted per `storageId`. Above `lg` it's a horizontal
 * resizable pair bounded to `height`; below `lg` it stacks (list then detail),
 * each scrolling within its own max-height. Re-presents data already in the
 * list — no new fetching belongs here.
 */
declare function SplitPane({ list, detail, storageId, defaultSizes, minSizes, height, className, }: SplitPaneProps): React.JSX.Element;

/**
 * Scroll context for a dense data table. Provides horizontal overflow without
 * the `<table>` wrapper that WarmTable bakes in, so a page can compose its own
 * `<table>` + WarmThead/ExpandableRow inside. (Sticky headers / frozen columns
 * are intentionally out of scope.)
 */
declare function DataGridWrapper({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
interface ExpandableRowProps {
    /** The always-visible summary cells (<Td> elements) — excludes the caret column. */
    summary: React.ReactNode;
    /** Detail content revealed beneath the row (re-presents already-loaded data). */
    detail: React.ReactNode;
    /** Number of summary columns (the detail panel spans these + the caret column). */
    columns: number;
    defaultOpen?: boolean;
}
/**
 * A table row that toggles a full-width detail panel beneath it. Renders a
 * leading caret column (the page's header should include a matching empty
 * <Th>), so `columns` is the count of summary cells. Expansion grows the table
 * downward — no async, so no layout shift.
 */
declare function ExpandableRow({ summary, detail, columns, defaultOpen }: ExpandableRowProps): React.JSX.Element;

interface DetailDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** "md" = 360px, "lg" = 480px. */
    width?: "md" | "lg";
    /** Pinned footer row (actions). */
    footer?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * Right-side slide-out for record detail. An overlay — it never reflows the
 * page, so opening it is layout-shift-free. Header is pinned; the body scrolls
 * independently; an optional footer pins to the bottom. Re-presents data the
 * caller already has.
 */
declare function DetailDrawer({ open, onOpenChange, title, description, width, footer, children, }: DetailDrawerProps): React.JSX.Element;

export { AXIS_TICK, AutoGrid, BAR_RADIUS, BAR_RADIUS_H, Badge, type BadgeTone, BarGradient, Btn, CHART_HEIGHT, CHART_MARGIN, CHART_MARGIN_COMPACT, CHART_SERIES, Card, ChartCard, ChartDataTable, type ChartDataTableColumn, type ChartDataTableProps, ChartEmpty, type ChartEmptyProps, ChartGradient, CountUp, DataGridWrapper, Delta, DetailDrawer, EmptyState, ExpandableRow, GRID, GridRow, KpiStrip, KpiTile, KpiVariantContext, PageStack, PageTabList, PageTabTrigger, Pill, type RankedItem, RankedListCard, SPACE, SectionLabel, SegContent, SegList, SegTabs, SegTrigger, Sparkline, SplitPane, Stagger, TOOLTIP_STYLE, Td, Th, WARM, WarmGrid, WarmLegend, type WarmLegendItem, type WarmLegendProps, WarmTable, WarmThead, WarmTooltip, type WarmTooltipItem, type WarmTooltipProps, WarmTr, WidgetContainer, activeDot, axisTick, barCursor, barValueLabel, categoryXAxis, categoryYAxis, chartTip, crosshairCursor, numberYAxis, pressable, pressableSoft, referenceTarget, segItemClass, segTrackClass, seriesColor, timeXAxis };
