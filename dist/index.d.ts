import * as React from 'react';
import { ComponentProps } from 'react';
import { XAxis, YAxis, LabelList, ReferenceLine } from 'recharts';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Warm Editorial (Direction A) — palette + Recharts styling helpers.
 *
 * NEUTRALS (bg/card/ink/borders/badges/warn/danger) are shared across every
 * client and stay as literals here.
 *
 * BRAND/CHART colors are per-client. They resolve at runtime from `--warm-*` CSS
 * variables (defined in each app's index.css) so the shared package carries no
 * client's palette — each dashboard keeps its own brand. The literals below are
 * FALLBACKS (the original Untoxicated values) used when a var isn't defined, so a
 * client that hasn't declared the vars still renders sensibly.
 *
 * Why runtime resolution (not `var(...)` strings): Recharts passes colors as SVG
 * presentation attributes, where `var()` does not resolve. Reading the computed
 * value yields a literal hex that works everywhere.
 */
/**
 * Clear the resolved `--warm-*` cache so `WARM`/`CHART_SERIES` re-read from the DOM on next
 * access. Call this RIGHT AFTER injecting a new client's brand tokens — e.g. when the active
 * client changes (FB-staff switch, or a single deploy resolving the client async after login).
 * Without it, the first paint's palette (the default client's) stays cached and charts never
 * re-theme. Synchronous per-client deploys don't need it (first read is already the right
 * client), but it makes runtime client-switching re-theme correctly.
 */
declare function resetWarmCache(): void;
declare const BASE: {
    readonly bg: "#F7F8FA";
    readonly card: "#FFFFFF";
    /** Faintly-lifted surface for a panel sitting on top of a card. */
    readonly cardRaised: "#FCFCFD";
    readonly ink: "#1C1E24";
    readonly sub: "#3E424A";
    readonly faint: "#6E727B";
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
    readonly cream: "#F4F5F6";
    readonly navy: "#0E0E06";
    readonly badgePos: "#15803D";
    readonly badgePosBg: "#DCFCE7";
    readonly badgeNeg: "#B42318";
    readonly badgeNegBg: "#FCE7E6";
    readonly warn: "#C77A1E";
    readonly warnSoft: "#FBF1E2";
    readonly danger: "#d94a36";
    readonly dangerSoft: "#FCE7E6";
    /** Overstock / cash-tied-up. Indigo sits at the same OKLCH brightness band as
     *  `pos`/`danger`, so "too much stock" reads as a real state and not as the
     *  gray of missing data. */
    readonly excess: "#667DBC";
    readonly excessSoft: "#EBF0FD";
    /** Plan / baseline series in charts. A chart tone on purpose — deliberately NOT
     *  tied to the text triad, so retuning body text can't shift a chart. */
    readonly slate: "#6E727B";
};
/**
 * Warm palette. Neutral keys are literal; brand keys resolve per-client from CSS
 * vars at access time (so reads during render pick up the host app's index.css).
 */
declare const WARM: { -readonly [K in keyof typeof BASE]: string; };
declare const ACCENT_STOPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
/** Accent ramp keyed by stop: `ACCENT[400]`. Resolves per client at access time. */
declare const ACCENT: Record<(typeof ACCENT_STOPS)[number], string>;
/**
 * Recharts axis tick style. (WARM.faint clears WCAG AA contrast on the light bg.)
 *
 * The color is a GETTER, not a captured value. These objects are module-level
 * consts, so a plain `fill: WARM.faint` would resolve once at import — before the
 * stylesheet is applied and forever after, pinning every chart to the package's
 * fallback neutrals and ignoring the client's tokens. A getter defers the read to
 * the spread site, which happens during render.
 */
declare const axisTick: {
    fontSize: number;
    readonly fill: string;
};
/** Recharts <Tooltip> props for a soft warm container. Lazily resolved, as above. */
declare const chartTip: {
    contentStyle: {
        fontSize: number;
        borderRadius: number;
        readonly border: string;
        background: string;
    };
    cursor: {
        readonly fill: string;
        fillOpacity: number;
    };
};
declare const CHART_SERIES: readonly string[];
/** Pick a series color by index (cycles through the palette). */
declare const seriesColor: (i: number) => string;
/** Faint dashed grid. Spread onto <CartesianGrid {...GRID} />. Lazily resolved. */
declare const GRID: {
    strokeDasharray: string;
    readonly stroke: string;
};
/** UPPER_CASE aliases so charts can use one import style everywhere. */
declare const AXIS_TICK: {
    fontSize: number;
    readonly fill: string;
};
declare const TOOLTIP_STYLE: {
    fontSize: number;
    borderRadius: number;
    readonly border: string;
    background: string;
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Inner padding in px. 8pt baseline: content cards 24 (default), KPI tiles 16. */
    pad?: number;
    /** Lift slightly on hover (KPI tiles, clickable cards). */
    interactive?: boolean;
    /**
     * Depth. Defaults to `flat` — the system defines cards by their EDGE, not by a
     * shadow. `raised` is the deliberate exception for a surface that genuinely
     * floats above the page (drawers, popovers, hero panels).
     *
     * `card` is retained as an alias of `flat` so existing call sites keep working;
     * it no longer paints a shadow.
     */
    elevation?: "card" | "raised" | "flat";
}
/**
 * The system's surface.
 *
 * A white card on the page ground, separated by a hairline edge in
 * `borderStrong` — no shadow. The rule the whole system follows:
 *
 *   **Edges define, dividers whisper.**
 *
 * The OUTER edge of a card uses `borderStrong` (#D8DBE1) so the card reads as a
 * distinct object; dividers INSIDE a card use the fainter `border` (#E7E9EE) so
 * they organize without carving it up. Shadows are reserved for things that
 * actually float, which on a dashboard is almost nothing — a page of shadowed
 * cards reads as clutter, and the depth stops meaning anything once everything
 * has it.
 */
declare function Card({ pad, interactive, elevation, className, style, children, ...props }: CardProps): React.JSX.Element;

/** Buttons / pills / small controls — 3% press. */
declare const pressable = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.97]";
/** Large surfaces (cards) — gentler 1.5% press so big elements don't jump. */
declare const pressableSoft = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.985]";

/** Uppercase eyebrow label (11px / 700 / faint). */
declare function SectionLabel({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

/**
 * The system's state vocabulary. Five tones, each a foreground/background pair.
 *
 * `excess` exists because "too much" is a real state, not a neutral one — an
 * overstocked SKU is cash sitting still, and rendering it in the gray reserved
 * for missing data reads as "we don't know" rather than "this is a problem".
 */
type Tone = "pos" | "warn" | "neg" | "muted" | "excess";
/** Resolve a tone to its `{ fg, bg }` pair. A function, not a const map, so each
 *  read re-resolves the CSS vars — a const would freeze the first client's palette. */
declare function tone(t: Tone): {
    fg: string;
    bg: string;
};

/**
 * State badge — a leading dot, then the label.
 *
 * The dot carries the state; the tinted background is support, not the signal.
 * That ordering matters twice over: a saturated dot reads at a glance in a dense
 * table where a pale fill does not, and the state survives for anyone who cannot
 * separate the tint from its neighbours.
 */
/** Legacy tone names, mapped onto the system's five-tone vocabulary. */
type BadgeTone = "neutral" | "danger" | "warn" | "ok" | "accent" | Tone;
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    tone?: BadgeTone;
    children: React.ReactNode;
}
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

/**
 * Action button.
 *
 * Rank is expressed by DARKNESS, not by hue: primary (ink) > secondary (muted
 * fill) > ghost (bare text), with `danger` as an outlined destructive confirm.
 *
 * Darkness ranking survives rebranding — it reads correctly whether the tenant's
 * primary is navy, near-black or red — where a hue-coded hierarchy ("blue means
 * primary") collapses the moment a client's brand color IS the warning color.
 *
 * All visual states live in the system stylesheet (`<SystemStyle />`), so hover,
 * focus and disabled are identical to every other control in the system.
 */
/** `dark` predates `primary` and pins the button to ink regardless of the tenant's
 *  primary. Kept distinct rather than aliased: for a client whose primary is not
 *  near-black, folding the two together would silently recolor existing buttons. */
type Kind = "primary" | "secondary" | "ghost" | "danger" | "dark";
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    kind?: Kind;
    icon?: React.ReactNode;
}
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
    readonly fill: string;
    readonly fillOpacity: 0.6;
};
/** Line/area-chart hover cursor — a faint vertical crosshair on the brand border color. */
declare const crosshairCursor: {
    readonly stroke: string;
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

/**
 * Segmented control — styled wrappers around the shadcn/Radix Tabs base (which
 * stays untouched). Composition API is unchanged: SegTabs > SegList > SegTrigger
 * + SegContent.
 *
 * The active segment LIFTS in place; it does not slide. A sliding pill animates
 * the control itself rather than the change it causes, and on a filter that
 * re-renders a table underneath, the eye follows the pill instead of the data
 * that just moved. Selection is instant; the content it drives is the thing worth
 * watching.
 */
declare function SegTabs(props: React.ComponentPropsWithoutRef<typeof Tabs>): React.JSX.Element;
declare const SegList: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SegTrigger: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SegContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Class strings for styling other Radix triggers (e.g. ToggleGroupItem) to match
 * the segmented look without wrapping them. ToggleGroup reports selection as
 * `data-state="on"`, which the shared `[data-state=active]` rule does not match,
 * so the active treatment is spelled out here.
 */
declare const segTrackClass = "fb-seg-track";
declare const segItemClass: string;

/**
 * Page-level tab bar — for switching whole page views.
 *
 * An underline bar sitting on a hairline rule, not a floating pill track. Tabs
 * label the content directly beneath them, and the shared rule is what ties the
 * label to the region it names; a detached pill reads as a control that happens
 * to be nearby.
 *
 * The `active` prop is retained for API compatibility but is no longer needed —
 * the active treatment comes from Radix's own `data-state`, so the parent cannot
 * get out of sync with it.
 *
 * WHY THE ACTIVE STATE IS SPELLED OUT: the shadcn base gives the active trigger a
 * raised pill — `data-[state=active]:bg-background` + `shadow-sm`. A plain
 * `bg-transparent` does NOT cancel it: tailwind-merge only drops a class when the
 * MODIFIER matches too, so the unmodified utility and the `data-[state=active]:`
 * one both survive, and Tailwind emits variants after base utilities, so the pill
 * wins. It has to be beaten on its own modifier.
 */
declare function PageTabList({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsList>): React.JSX.Element;
interface PageTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
    /** @deprecated Active state now comes from Radix `data-state`; this is ignored. */
    active?: boolean;
    icon?: React.ReactNode;
}
declare function PageTabTrigger({ active: _active, icon, className, children, ...props }: PageTabTriggerProps): React.JSX.Element;

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

/**
 * Text input and multi-line input.
 *
 * Both are the same shell: a real border in `border`, no shadow — an input is a
 * surface you write on, and rule 2 ("edges define") applies to it exactly as it
 * applies to a card. The focus treatment is the system's one focus treatment,
 * an accent-600 border with an accent-100 glow, and it is defined in
 * `<SystemStyle />` rather than here so a control added later cannot invent its
 * own.
 *
 * Invalid state comes from `aria-invalid`, which `<Field>` sets when it has an
 * `error`. Driving the visual off the ARIA attribute rather than a `variant`
 * prop means a control cannot look wrong while telling a screen reader it is
 * fine, or the reverse.
 */
declare const Input: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
declare const Textarea: React.ForwardRefExoticComponent<React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>>;

/**
 * Single-choice select, built on the native `<select>`.
 *
 * Native on purpose. A dashboard select is almost always a short list of plain
 * strings — a date range, a status filter, a warehouse — and for that the native
 * control is strictly better than a popover reimplementation: keyboard support,
 * type-ahead and the platform's own picker on touch, none of which have to be
 * maintained. It also cannot be clipped by an `overflow: auto` table wrapper,
 * which is the failure `<TipLayer>` exists to avoid and which quietly breaks
 * popover-based selects inside data grids.
 *
 * The caret is a sibling element rather than a background-image, so it reads
 * `--warm-faint` like every other neutral instead of freezing one gray into a
 * data URI.
 *
 * When a picker genuinely needs rich rows — an avatar, a two-line option, live
 * search — that is a different control and belongs in the app until enough
 * surfaces want the same one.
 */
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Convenience for the common case; ignored when `children` are passed. */
    options?: SelectOption[];
    /** Leading empty option, e.g. "All warehouses". */
    placeholder?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

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

/**
 * Centered modal — the system's blocking overlay.
 *
 * The counterpart to `<DetailDrawer>`, and the two are not interchangeable. A
 * drawer re-presents data the user already has, alongside the page it came from;
 * a modal interrupts, because what it asks for has to be answered before
 * anything else makes sense. Reach for the drawer first — most of what gets
 * built as a modal on a dashboard is really a detail view, and a detail view
 * that blocks the page costs the user the context they opened it from.
 *
 * A modal is one of the few things on a dashboard that genuinely floats, so it
 * carries the shadow rule 2 denies a card — and keeps the strong edge as well.
 *
 * Escape and scrim-click close it. Both are deliberate: a dialog that traps you
 * unless you find its button is a dialog people learn to dread. If a specific
 * one must not be dismissed accidentally — a destructive confirm — pass
 * `dismissible={false}`.
 */
declare const MAX_WIDTH: {
    readonly sm: 380;
    readonly md: 520;
    readonly lg: 720;
};
interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    /** Sub-line under the title. Also the dialog's accessible description. */
    description?: React.ReactNode;
    /** sm 380px · md 520px (default) · lg 720px. */
    size?: keyof typeof MAX_WIDTH;
    /** Pinned action row. Put the confirming `<Btn>` last — it reads as the end of the sentence. */
    footer?: React.ReactNode;
    /** Set false for a destructive confirm that must not close on Escape or scrim. */
    dismissible?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare function Modal({ open, onOpenChange, title, description, size, footer, dismissible, className, children, }: ModalProps): React.JSX.Element;

/** Mount once per page that uses the design system. */
declare function SystemStyle(): React.JSX.Element;

/** Show a toast. No-ops when no <Toaster /> is mounted. */
declare function toast(title: string, opts?: {
    tone?: Tone;
    sub?: string;
}): void;
/** Fixed bottom-right toast stack. Mount once, alongside <TipLayer />. */
declare function Toaster(): React.JSX.Element | null;

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

/**
 * Loading placeholders.
 *
 * Two rules the whole system follows:
 *
 * 1. **Show blocks, never zeros.** A "0" in a KPI slot reads as data — the user
 *    believes they sold nothing, and finds out otherwise a second later. A block
 *    reads as "not yet".
 * 2. **Size the block to the content it stands in for**, so nothing reflows when
 *    the data lands. A placeholder that jumps on resolve is worse than no
 *    placeholder.
 *
 * Solid fill plus opacity pulse — no gradient shimmer.
 */
declare function Skel({ w, h, className, style, }: {
    /** Width; defaults to filling the container. */
    w?: number | string;
    h?: number | string;
    className?: string;
    style?: React.CSSProperties;
}): React.JSX.Element;
/**
 * Chart-shaped placeholder — a ghost bar chart at the height of the chart it
 * replaces, with a staggered pulse so it reads as one loading object rather than
 * a row of unrelated blocks.
 */
declare function ChartSkel({ height }: {
    height?: number;
}): React.JSX.Element;

/**
 * Shared element props for every chart <Tooltip>.
 *
 * Recharts eases tooltip position over 400ms by default, which makes the tip
 * rubber-band along behind the cursor and feel broken on a dense axis. Disabling
 * the animation and pinning the tip near the top of the plot leaves it sliding
 * horizontally band to band, which tracks the cursor honestly.
 *
 * Spread it: `<Tooltip {...TIP} content={<ChartTooltip … />} />`.
 */
declare const TIP: {
    readonly isAnimationActive: false;
    readonly position: {
        readonly y: 10;
    };
    readonly offset: 16;
};
/** True when the OS asks for reduced motion — gates chart reveals and morphs
 *  that CSS alone cannot reach (JS-driven animation, staged mounts). */
declare const REDUCED: boolean;
interface ChartTooltipRow {
    label: string;
    value: string;
    /** Series swatch. Omit for rows that are not a series (totals, deltas). */
    color?: string;
    delta?: {
        text: string;
        color: string;
    };
}
/**
 * Chart tooltip body: a titled list of label/value rows with series swatches and
 * optional delta chips. Values are tabular-figure aligned so they compare down
 * the column instead of jittering as digits change.
 */
declare function ChartTooltip({ title, rows }: {
    title?: string;
    rows: ChartTooltipRow[];
}): React.JSX.Element;

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

/**
 * OKLCH accent-ramp generator.
 *
 * The design system has two color layers. Layer 1 is the neutral foundation
 * (surfaces, borders, the text triad) — shared by every client. Layer 2 is a
 * single functional accent used ONLY for interaction affordances: focus rings,
 * input focus glow, slider thumbs. Never for surfaces, never for chart series.
 *
 * That accent ships as a 10-step ramp. The ramp originated as the Osmo Planning
 * module's hand-tuned "gold" (hue 77.5°); this module generalizes it so every
 * client gets the same ramp shape in their own hue.
 *
 * WHY THE L AND C CURVES ARE FIXED (and only the hue comes from the client):
 * the ramp is functional, not decorative. A focus ring must carry the same visual
 * weight on every dashboard — if we scaled chroma to each brand's own saturation,
 * a muted brand (e.g. a near-gray navy) would produce an accent so desaturated the
 * focus ring would be invisible, and a vivid brand would shout. Holding lightness
 * and chroma constant and varying only hue keeps affordance strength identical
 * across tenants while still reading as the brand's color family. Brand identity
 * proper lives in `primary`, the surfaces, and the chart series — not here.
 *
 * Sanity check when changing the curves: feeding this the original gold
 * (#B8893A) must reproduce the hand-tuned ramp. It currently matches 8 of the 10
 * stops exactly, with the two darkest off by OKLab ΔE 0.0034 — imperceptible, and
 * caused by those two hexes having been hand-picked slightly off the ramp's hue.
 */
declare const RAMP_STOPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
type RampStop = (typeof RAMP_STOPS)[number];
type AccentRamp = Record<RampStop, string>;
/** sRGB hex → OKLCH. Null when the input isn't a hex color. */
declare function hexToOklch(hex: string): {
    L: number;
    C: number;
    H: number;
} | null;
/**
 * OKLCH → sRGB hex, reducing chroma until the color fits the sRGB gamut. Keeps
 * lightness and hue exact (the two things the ramp's rhythm depends on) and gives
 * up only saturation, which is what gamut mapping should trade away.
 */
declare function oklchToHex(L: number, C: number, H: number): string;
/**
 * Build the 10-step interaction ramp for a brand color.
 *
 * Only the hue is taken from `brandHex`; lightness and chroma follow the fixed
 * curves (see the module header for why). An achromatic or unparseable brand
 * color falls back to the original gold hue rather than producing a gray ramp
 * that can't signal focus.
 */
declare function makeAccentRamp(brandHex: string): AccentRamp;
/**
 * The ramp as CSS custom properties (`--accent-50` … `--accent-900`), ready to
 * merge into a client's `branding` token map and inject on `:root`.
 */
declare function accentRampTokens(brandHex: string): Record<string, string>;

export { ACCENT, AXIS_TICK, type AccentRamp, AutoGrid, BAR_RADIUS, BAR_RADIUS_H, Badge, type BadgeTone, BarGradient, Btn, CHART_HEIGHT, CHART_MARGIN, CHART_MARGIN_COMPACT, CHART_SERIES, Card, ChartCard, ChartDataTable, type ChartDataTableColumn, type ChartDataTableProps, ChartEmpty, type ChartEmptyProps, ChartGradient, ChartSkel, ChartTooltip, type ChartTooltipRow, Checkbox, Copy, CountUp, DataGridWrapper, Def, Delta, DetailDrawer, EmptyState, ExpandableRow, Field, type FieldControlProps, GRID, GridRow, Hint, Input, KpiStrip, KpiTile, KpiVariantContext, Label, MockTag, Modal, PageStack, PageTabList, PageTabTrigger, Pill, RAMP_STOPS, REDUCED, Radio, type RampStop, type RankedItem, RankedListCard, SPACE, SectionLabel, SegContent, SegList, SegTabs, SegTrigger, Select, type SelectOption, Skel, Sparkline, SplitPane, Stagger, Switch, SystemStyle, TIP, TOOLTIP_STYLE, Td, Textarea, Th, TipLayer, Toaster, type Tone, WARM, WarmGrid, WarmLegend, type WarmLegendItem, type WarmLegendProps, WarmTable, WarmThead, WarmTooltip, type WarmTooltipItem, type WarmTooltipProps, WarmTr, WidgetContainer, accentRampTokens, activeDot, axisTick, barCursor, barValueLabel, categoryXAxis, categoryYAxis, chartTip, crosshairCursor, hexToOklch, makeAccentRamp, numberYAxis, oklchToHex, pressable, pressableSoft, referenceTarget, resetWarmCache, segItemClass, segTrackClass, seriesColor, timeXAxis, toast, tone };
