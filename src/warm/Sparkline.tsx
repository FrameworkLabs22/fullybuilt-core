import { Line, LineChart, ResponsiveContainer } from "recharts";
import { WARM } from "./theme";

interface SparklineProps {
  data: any[];
  dataKey: string;
  color?: string;
  width?: number;
  height?: number;
}

/** Tiny inline trend line (no axes). */
export function Sparkline({ data, dataKey, color = WARM.blue, width = 70, height = 28 }: SparklineProps) {
  // Need at least 3 points for a meaningful trend line; fewer renders as a
  // broken-looking straight diagonal, so reserve the space instead.
  if (!data || data.length < 3) return <div style={{ width, height }} />;
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
