import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react";
import { WARM } from "./theme";

interface DeltaProps {
  /** Signed percentage. null/undefined renders just the label (or nothing). */
  pct: number | null | undefined;
  label?: string;
  /** When true, a negative delta is "good" (teal) — e.g. ship time, days to stockout. */
  invert?: boolean;
}

/** Trend delta: up=teal / down=red by default; `invert` flips which direction is good. */
export function Delta({ pct, label, invert }: DeltaProps) {
  if (pct == null) {
    return label ? <span className="text-warm-faint" style={{ fontSize: 12 }}>{label}</span> : null;
  }
  const up = pct >= 0;
  const good = invert ? pct <= 0 : pct >= 0;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className="inline-flex items-center gap-1 font-semibold transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{ fontSize: 12, color: good ? WARM.pos : WARM.danger }}
    >
      <Arrow size={14} />
      {Math.abs(pct).toFixed(1)}%
      {label && <span className="text-warm-faint font-medium">{label}</span>}
    </span>
  );
}
