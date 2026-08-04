import * as React from 'react';

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

export { WidgetContainer };
