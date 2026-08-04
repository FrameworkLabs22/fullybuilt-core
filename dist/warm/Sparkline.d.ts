import * as React from 'react';

interface SparklineProps {
    data: any[];
    dataKey: string;
    color?: string;
    width?: number;
    height?: number;
}
/** Tiny inline trend line (no axes). */
declare function Sparkline({ data, dataKey, color, width, height }: SparklineProps): React.JSX.Element;

export { Sparkline };
