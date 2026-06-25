import * as React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";
import { WARM } from "./theme";
import { SPACE } from "./spacing";
import { KpiVariantContext } from "./kpiVariant";
import { Skeleton } from "../ui/skeleton";

interface KpiTileProps {
  label: string;
  value: React.ReactNode;
  spark?: { data: any[]; key: string };
  sparkColor?: string;
  delta?: { pct: number | null | undefined; label?: string; invert?: boolean };
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
export function KpiTile(props: KpiTileProps) {
  const ctxVariant = React.useContext(KpiVariantContext);
  const variant = props.variant ?? ctxVariant;
  return variant === "strip" ? <KpiStripCell {...props} /> : <KpiCard {...props} />;
}

/** Standard hero card. */
function KpiCard({
  label,
  value,
  spark,
  sparkColor,
  delta,
  badge,
  sub,
  icon,
  footer,
  valueColor,
  loading,
  to,
}: KpiTileProps) {
  // Like the old KpiCard: a delta with no actual pct yields the sub line instead.
  const showDelta = delta && (delta.pct != null || !sub);
  const labelRow = (
    <div className="flex items-center justify-between">
      <span className="text-label font-semibold text-warm-sub">{label}</span>
      {icon && <span className="text-warm-faint">{icon}</span>}
    </div>
  );
  if (loading) {
    return (
      <Card pad={SPACE.kpiPad}>
        <div className="flex flex-col gap-1.5">
          {labelRow}
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </Card>
    );
  }
  const tile = (
    <Card pad={SPACE.kpiPad} interactive>
      <div className="flex flex-col gap-1.5">
        {labelRow}
        <div className="flex items-end justify-between gap-2">
          <div className="text-display font-bold tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ color: valueColor ?? WARM.ink }}>
            {value}
          </div>
          {spark && <Sparkline data={spark.data} dataKey={spark.key} color={sparkColor ?? WARM.blue} />}
        </div>
        {badge ? (
          <span className="self-start rounded-pill bg-warm-warn-soft px-[9px] py-[2px] text-meta font-bold text-warm-warn">
            {badge}
          </span>
        ) : showDelta ? (
          <Delta pct={delta!.pct} label={delta!.label} invert={delta!.invert} />
        ) : (
          sub && <div className="text-meta text-warm-faint">{sub}</div>
        )}
        {footer && <div className="mt-1.5">{footer}</div>}
      </div>
    </Card>
  );
  // When `to` is set the entire tile drills into a detail page.
  return to ? (
    <Link to={to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-primary rounded-card">
      {tile}
    </Link>
  ) : (
    tile
  );
}

/**
 * Compact cell for <KpiStrip>: a borderless, denser KPI. Drops the sparkline and
 * footer, and shows the delta without its verbose "vs prior 30d" tail to stay
 * tight. The surrounding KpiStrip supplies the card surface and dividers.
 */
function KpiStripCell({ label, value, delta, badge, sub, valueColor, loading, to }: KpiTileProps) {
  const showDelta = delta && (delta.pct != null || !sub);
  const inner = loading ? (
    <div className="flex flex-col gap-1 p-[15px]">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-6 w-20" />
    </div>
  ) : (
    <div className="flex flex-col gap-1 p-[15px]">
      <span className="truncate text-label font-semibold text-warm-sub">{label}</span>
      <div className="text-xl font-bold leading-none tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ color: valueColor ?? WARM.ink }}>
        {value}
      </div>
      {badge ? (
        <span className="self-start rounded-pill bg-warm-warn-soft px-[7px] py-[1px] text-micro font-bold text-warm-warn">
          {badge}
        </span>
      ) : showDelta ? (
        <Delta pct={delta!.pct} invert={delta!.invert} />
      ) : (
        sub && <div className="truncate text-micro text-warm-faint">{sub}</div>
      )}
    </div>
  );
  // border-l/-t draw the internal dividers; KpiStrip clips the outer edges with
  // a -ml-px -mt-px offset under the card's own border.
  const cellClass = "border-l border-t border-warm-border bg-warm-card";
  return to ? (
    <Link
      to={to}
      className={`block transition-colors hover:bg-warm-chip/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warm-primary ${cellClass}`}
    >
      {inner}
    </Link>
  ) : (
    <div className={cellClass}>{inner}</div>
  );
}
