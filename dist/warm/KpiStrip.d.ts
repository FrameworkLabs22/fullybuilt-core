import * as React from 'react';

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

export { KpiStrip };
