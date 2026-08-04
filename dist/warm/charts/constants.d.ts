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

export { BAR_RADIUS, BAR_RADIUS_H, CHART_HEIGHT, CHART_MARGIN, CHART_MARGIN_COMPACT, activeDot, barCursor, crosshairCursor };
