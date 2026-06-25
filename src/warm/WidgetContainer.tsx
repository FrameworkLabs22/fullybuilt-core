import * as React from "react";
import { Card } from "./Card";
import { SPACE } from "./spacing";
import { Skeleton } from "../ui/skeleton";

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
export function WidgetContainer({
  title,
  subtitle,
  right,
  height,
  grow,
  className,
  loading,
  footer,
  children,
}: WidgetContainerProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between" style={{ marginBottom: SPACE.headerGap }}>
        <div>
          <div className="text-warm-ink font-bold" style={{ fontSize: 14.5, letterSpacing: "-0.01em" }}>
            {title}
          </div>
          {subtitle && <div className="text-warm-sub" style={{ fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
      <div style={height == null ? undefined : grow ? { minHeight: height } : { height }}>
        {loading ? (
          <Skeleton className="w-full" style={{ height: height ?? "100%" }} />
        ) : (
          children
        )}
      </div>
      {footer && <div style={{ marginTop: SPACE.headerGap }}>{footer}</div>}
    </Card>
  );
}
