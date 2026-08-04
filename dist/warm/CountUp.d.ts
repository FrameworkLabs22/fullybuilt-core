import * as React from 'react';

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

export { CountUp };
