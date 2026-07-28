import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { X, CaretDown, ArrowUpRight, ArrowDownRight, CaretRight, Check, CopySimple, DotsSixVertical } from '@phosphor-icons/react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import * as React7 from 'react';
import { createContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, animate } from 'framer-motion';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';

// src/warm/theme.ts
var _varCache = {};
function readVar(name, fallback) {
  if (typeof document === "undefined") return fallback;
  const cached = _varCache[name];
  if (cached) return cached;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (val) {
    _varCache[name] = val;
    return val;
  }
  return fallback;
}
function resetWarmCache() {
  for (const key in _varCache) delete _varCache[key];
}
var BASE = {
  // ── neutrals (shared across all clients) ──
  bg: "#F7F8FA",
  card: "#FFFFFF",
  /** Faintly-lifted surface for a panel sitting on top of a card. */
  cardRaised: "#FCFCFD",
  // ── the text triad ──
  // Three tiers, each a real step apart: headings/values → body/table text →
  // labels/subtext. The middle tier is deliberately dark; a mid-gray body tier
  // reads as disabled next to a near-black heading, and the faintest tier has to
  // stay legible because it carries units, timestamps and column labels.
  ink: "#1C1E24",
  sub: "#3E424A",
  faint: "#6E727B",
  border: "#E7E9EE",
  borderStrong: "#D8DBE1",
  chip: "#EEF0F3",
  track: "#ECEEF2",
  // ── per-client brand/accent (resolve from CSS vars; see BRAND_VARS) ──
  primary: "#0E0E06",
  primarySoft: "#F6F6AE",
  pos: "#2B9E8F",
  posSoft: "#E4F4F1",
  blue: "#29C0DD",
  // chart line/stroke accent
  blueSoft: "#FCFAD0",
  // area fills
  blueMid: "#F6F949",
  // standalone bars/funnel
  cream: "#F4F5F6",
  navy: "#0E0E06",
  // ── KPI % badges (AA-safe semantic green/red; shared, not chart series) ──
  badgePos: "#15803D",
  badgePosBg: "#DCFCE7",
  badgeNeg: "#B42318",
  badgeNegBg: "#FCE7E6",
  warn: "#C77A1E",
  warnSoft: "#FBF1E2",
  danger: "#d94a36",
  dangerSoft: "#FCE7E6",
  // ── extra chart/state tones ──
  /** Overstock / cash-tied-up. Indigo sits at the same OKLCH brightness band as
   *  `pos`/`danger`, so "too much stock" reads as a real state and not as the
   *  gray of missing data. */
  excess: "#667DBC",
  excessSoft: "#EBF0FD",
  /** Plan / baseline series in charts. A chart tone on purpose — deliberately NOT
   *  tied to the text triad, so retuning body text can't shift a chart. */
  slate: "#6E727B"
};
var BRAND_VARS = {
  bg: "--warm-bg",
  card: "--warm-card",
  cardRaised: "--warm-card-raised",
  ink: "--warm-ink",
  sub: "--warm-sub",
  faint: "--warm-faint",
  border: "--warm-border",
  borderStrong: "--warm-border-strong",
  chip: "--warm-chip",
  track: "--warm-track",
  primary: "--warm-primary",
  primarySoft: "--warm-primary-soft",
  pos: "--warm-pos",
  posSoft: "--warm-pos-soft",
  warn: "--warm-warn",
  warnSoft: "--warm-warn-soft",
  danger: "--warm-danger",
  dangerSoft: "--warm-danger-soft",
  excess: "--warm-excess",
  excessSoft: "--warm-excess-soft",
  slate: "--warm-slate",
  blue: "--warm-chart-line",
  blueSoft: "--warm-chart-fill",
  blueMid: "--warm-chart-bar",
  cream: "--warm-cream",
  navy: "--warm-navy"
};
var WARM = new Proxy(BASE, {
  get(target, prop) {
    const varName = BRAND_VARS[prop];
    if (varName) return readVar(varName, target[prop]);
    return target[prop];
  }
});
var ACCENT_FALLBACK = [
  "#FCF4E9",
  // 50
  "#F5E6D0",
  // 100
  "#E9D0AC",
  // 200
  "#D5B17A",
  // 300
  "#C19653",
  // 400 — focus rings
  "#B8893A",
  // 500 — the base brand step
  "#9E711C",
  // 600
  "#845A00",
  // 700
  "#694500",
  // 800
  "#513400"
  // 900
];
var ACCENT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
var ACCENT = new Proxy({}, {
  get(_t, prop) {
    const stop = Number(prop);
    const i = ACCENT_STOPS.indexOf(stop);
    if (i === -1) return void 0;
    return readVar(`--accent-${stop}`, ACCENT_FALLBACK[i]);
  }
});
var axisTick = {
  fontSize: 11,
  get fill() {
    return WARM.faint;
  }
};
var chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    get border() {
      return `1px solid ${WARM.border}`;
    },
    background: "#fff"
  },
  cursor: {
    get fill() {
      return WARM.chip;
    },
    fillOpacity: 0.6
  }
};
var SERIES_FALLBACK = [
  "#0E0E06",
  // primary
  "#29C0DD",
  // chart accent
  "#C77A1E",
  // amber
  "#cfdd28",
  // lime
  "#8E9DAC",
  // slate gray
  "#2B9E8F",
  // teal
  "#3E5871",
  // slate navy
  "#5C7AA8",
  // steel blue
  "#4C6FA0",
  // deep blue
  "#A9C2DD",
  // light steel blue
  "#B8CDE5",
  // soft blue tint
  "#B87A1C"
  // dark amber
];
var CHART_SERIES = new Proxy(SERIES_FALLBACK, {
  get(target, prop) {
    if (typeof prop === "string" && /^\d+$/.test(prop)) {
      const i = Number(prop);
      return readVar(`--warm-series-${i + 1}`, target[i]);
    }
    return target[prop];
  }
});
var seriesColor = (i) => CHART_SERIES[i % CHART_SERIES.length];
var GRID = {
  strokeDasharray: "3 3",
  get stroke() {
    return WARM.track;
  }
};
var AXIS_TICK = axisTick;
var TOOLTIP_STYLE = chartTip.contentStyle;
var twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["card", "field", "pill"] }]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/warm/press.ts
var BASE2 = "transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:active:scale-100";
var pressable = `${BASE2} active:scale-[0.97]`;
var pressableSoft = `${BASE2} active:scale-[0.985]`;
function Card({ pad = 24, interactive, elevation = "flat", className, style, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-warm-card border border-warm-border-strong rounded-card",
        elevation === "raised" && "shadow-raised",
        interactive && cn("transition-colors duration-150 hover:bg-warm-chip/30", pressableSoft),
        className
      ),
      style: { padding: pad, ...style },
      ...props,
      children
    }
  );
}
function SectionLabel({ className, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("text-warm-faint font-bold uppercase", className),
      style: { fontSize: 11, letterSpacing: "0.04em", ...style },
      ...props
    }
  );
}

// src/system/tone.ts
function tone(t) {
  switch (t) {
    case "pos":
      return { fg: WARM.pos, bg: WARM.posSoft };
    case "warn":
      return { fg: WARM.warn, bg: WARM.warnSoft };
    case "neg":
      return { fg: WARM.danger, bg: WARM.dangerSoft };
    case "excess":
      return { fg: WARM.excess, bg: WARM.excessSoft };
    case "muted":
    default:
      return { fg: WARM.sub, bg: WARM.chip };
  }
}
var ALIASES = {
  neutral: "muted",
  ok: "pos",
  danger: "neg",
  // `accent` predates the accent ramp being interaction-only. It now renders as
  // the neutral tone rather than painting a surface with the accent color.
  accent: "muted"
};
function Badge({ tone: tone2 = "muted", className, children, style, ...props }) {
  const t = tone(ALIASES[tone2] ?? tone2);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-px",
        "font-sans text-[11px] font-medium leading-[18px]",
        "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
        className
      ),
      style: { color: t.fg, background: t.bg, border: `1px solid ${t.fg}33`, ...style },
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full", style: { background: t.fg } }),
        children
      ]
    }
  );
}
function Delta({ pct, label, invert }) {
  if (pct == null) {
    return label ? /* @__PURE__ */ jsx("span", { className: "text-warm-faint", style: { fontSize: 12 }, children: label }) : null;
  }
  const up = pct >= 0;
  const good = invert ? pct <= 0 : pct >= 0;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 font-semibold transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
      style: { fontSize: 12, color: good ? WARM.pos : WARM.danger },
      children: [
        /* @__PURE__ */ jsx(Arrow, { size: 14 }),
        Math.abs(pct).toFixed(1),
        "%",
        label && /* @__PURE__ */ jsx("span", { className: "text-warm-faint font-medium", children: label })
      ]
    }
  );
}
function Pill({ icon, active, className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "inline-flex items-center gap-2 h-9 px-3.5 rounded-pill text-[13px] font-semibold border transition-colors",
        pressable,
        active ? "bg-warm-ink text-white border-warm-ink" : "bg-warm-card text-warm-sub border-warm-border hover:bg-warm-chip",
        className
      ),
      ...props,
      children: [
        icon,
        children
      ]
    }
  );
}
function Btn({ kind = "primary", icon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: cn(`fb-btn fb-btn--${kind}`, className), ...props, children: [
    icon,
    children
  ] });
}
function Sparkline({ data, dataKey, color = WARM.blue, width = 70, height = 28 }) {
  if (!data || data.length < 3) return /* @__PURE__ */ jsx("div", { style: { width, height } });
  return /* @__PURE__ */ jsx("div", { style: { width, height }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(LineChart, { data, margin: { top: 4, bottom: 4, left: 0, right: 0 }, children: /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey, stroke: color, strokeWidth: 2, dot: false, isAnimationActive: false }) }) }) });
}

// src/warm/spacing.ts
var SPACE = {
  /** Page-level section stack gap (12px — matches the Overview card rhythm). */
  section: 12,
  /** Grid / card gutter (12px — matches the Overview card rhythm). */
  gutter: 12,
  /** Default content-card inner padding. */
  cardPad: 24,
  /** KPI tile inner padding (denser than content cards). */
  kpiPad: 16,
  /** Card header → body gap (was 14, now on-grid). */
  headerGap: 16
};
var KpiVariantContext = createContext("tile");
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("skeleton-shimmer rounded-md bg-warm-track", className),
      ...props
    }
  );
}
function KpiTile(props) {
  const ctxVariant = React7.useContext(KpiVariantContext);
  const variant = props.variant ?? ctxVariant;
  return variant === "strip" ? /* @__PURE__ */ jsx(KpiStripCell, { ...props }) : /* @__PURE__ */ jsx(KpiCard, { ...props });
}
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
  to
}) {
  const showDelta = delta && (delta.pct != null || !sub);
  const labelRow = /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-label font-semibold text-warm-sub", children: label }),
    icon && /* @__PURE__ */ jsx("span", { className: "text-warm-faint", children: icon })
  ] });
  if (loading) {
    return /* @__PURE__ */ jsx(Card, { pad: SPACE.kpiPad, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
      labelRow,
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-28" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20" })
    ] }) });
  }
  const tile = /* @__PURE__ */ jsx(Card, { pad: SPACE.kpiPad, interactive: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    labelRow,
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "text-display font-bold tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]", style: { color: valueColor ?? WARM.ink }, children: value }),
      spark && /* @__PURE__ */ jsx(Sparkline, { data: spark.data, dataKey: spark.key, color: sparkColor ?? WARM.blue })
    ] }),
    badge ? /* @__PURE__ */ jsx("span", { className: "self-start rounded-pill bg-warm-warn-soft px-[9px] py-[2px] text-meta font-bold text-warm-warn", children: badge }) : showDelta ? /* @__PURE__ */ jsx(Delta, { pct: delta.pct, label: delta.label, invert: delta.invert }) : sub && /* @__PURE__ */ jsx("div", { className: "text-meta text-warm-faint", children: sub }),
    footer && /* @__PURE__ */ jsx("div", { className: "mt-1.5", children: footer })
  ] }) });
  return to ? /* @__PURE__ */ jsx(Link, { to, className: "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-primary rounded-card", children: tile }) : tile;
}
function KpiStripCell({ label, value, delta, badge, sub, valueColor, loading, to }) {
  const showDelta = delta && (delta.pct != null || !sub);
  const inner = loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 p-[15px]", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-16" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-20" })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 p-[15px]", children: [
    /* @__PURE__ */ jsx("span", { className: "truncate text-label font-semibold text-warm-sub", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-xl font-bold leading-none tabular-nums transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]", style: { color: valueColor ?? WARM.ink }, children: value }),
    badge ? /* @__PURE__ */ jsx("span", { className: "self-start rounded-pill bg-warm-warn-soft px-[7px] py-[1px] text-micro font-bold text-warm-warn", children: badge }) : showDelta ? /* @__PURE__ */ jsx(Delta, { pct: delta.pct, invert: delta.invert }) : sub && /* @__PURE__ */ jsx("div", { className: "truncate text-micro text-warm-faint", children: sub })
  ] });
  const cellClass = "border-l border-t border-warm-border bg-warm-card";
  return to ? /* @__PURE__ */ jsx(
    Link,
    {
      to,
      className: `block transition-colors hover:bg-warm-chip/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warm-primary ${cellClass}`,
      children: inner
    }
  ) : /* @__PURE__ */ jsx("div", { className: cellClass, children: inner });
}
function KpiStrip({ children }) {
  return /* @__PURE__ */ jsx(Card, { pad: 0, className: "overflow-hidden", children: /* @__PURE__ */ jsx(KpiVariantContext.Provider, { value: "strip", children: /* @__PURE__ */ jsx("div", { className: "-ml-px -mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6", children }) }) });
}
function ChartEmpty({ message = "No data for this period", hint, icon, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex h-full w-full flex-col items-center justify-center gap-1 text-center", className), children: [
    icon && /* @__PURE__ */ jsx("div", { className: "mb-0.5 text-warm-faint", children: icon }),
    /* @__PURE__ */ jsx("div", { className: "text-body-sm font-semibold text-warm-sub", children: message }),
    hint && /* @__PURE__ */ jsx("div", { className: "text-[11.5px] text-warm-faint", children: hint })
  ] });
}
function ChartCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  empty,
  emptyMessage,
  legend,
  ariaLabel,
  dataTable,
  children
}) {
  return (
    // pad={0}: the header sits on its own ruled band rather than floating in the
    // card's padding. The rule is the faint `border` — an internal divider, not an
    // edge — so it separates header from body without competing with the card's
    // own boundary. See the "edges define, dividers whisper" note on <Card>.
    /* @__PURE__ */ jsxs(Card, { className, pad: 0, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start justify-between gap-3 px-4 py-3",
          style: { borderBottom: "1px solid var(--warm-border)" },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[13px] font-semibold text-warm-ink", children: title }),
              subtitle && /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-warm-sub", children: subtitle })
            ] }),
            right
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "px-1 py-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { height },
            ...ariaLabel && !loading && !empty ? { role: "img", "aria-label": ariaLabel } : {},
            children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-full w-full",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
                children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-full w-full" }) : empty ? /* @__PURE__ */ jsx(ChartEmpty, { message: emptyMessage }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children })
              },
              loading ? "loading" : empty ? "empty" : "content"
            ) })
          }
        ),
        dataTable && !loading && !empty && dataTable,
        legend && !loading && !empty && /* @__PURE__ */ jsx("div", { style: { marginTop: 10 }, children: legend })
      ] })
    ] })
  );
}
var BAR_STAGGER = { initial: {}, animate: { transition: { staggerChildren: 0.05 } } };
var BAR_ROW = { initial: {}, animate: {} };
var BAR_FILL = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};
function RankedListCard({
  title,
  subtitle,
  right,
  height = 200,
  className,
  loading,
  items,
  emptyText = "No data yet",
  formatValue = (v) => `${Math.round(v)}`
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const reduced = useReducedMotion();
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", style: { marginBottom: SPACE.headerGap }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-warm-ink font-bold", style: { fontSize: 14.5, letterSpacing: "-0.01em" }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { className: "text-warm-sub", style: { fontSize: 12, marginTop: 2 }, children: subtitle })
      ] }),
      right
    ] }),
    /* @__PURE__ */ jsx("div", { style: { minHeight: height }, children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full", style: { height } }) : items.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-body-sm text-warm-faint", style: { height }, children: emptyText }) : /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "flex flex-col gap-3",
        variants: reduced ? void 0 : BAR_STAGGER,
        initial: reduced ? false : "initial",
        animate: reduced ? false : "animate",
        children: items.map((item) => /* @__PURE__ */ jsxs(motion.div, { variants: reduced ? void 0 : BAR_ROW, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate text-body-sm font-semibold text-warm-sub", children: item.label }),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-baseline gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-body-sm font-bold tabular-nums text-warm-ink", children: formatValue(item.value) }),
              item.annotation
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-[5px] h-[4px] w-full rounded-pill bg-warm-track", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-full rounded-pill",
              style: { width: `${item.value / max * 100}%`, background: WARM.blueMid, transformOrigin: "left" },
              variants: reduced ? void 0 : BAR_FILL
            }
          ) })
        ] }, item.label))
      }
    ) })
  ] });
}
var WarmGrid = ({ vertical = false }) => /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: WARM.track, vertical });
var ChartGradient = ({
  id,
  color,
  top = 0.24
}) => /* @__PURE__ */ jsxs("linearGradient", { id, x1: "0", y1: "0", x2: "0", y2: "1", children: [
  /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: color, stopOpacity: top }),
  /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
] });
var BarGradient = ({
  id,
  color,
  horizontal = false,
  base = 0.6
}) => /* @__PURE__ */ jsxs(
  "linearGradient",
  {
    id,
    ...horizontal ? { x1: "0", y1: "0", x2: "1", y2: "0" } : { x1: "0", y1: "0", x2: "0", y2: "1" },
    children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: color, stopOpacity: horizontal ? base : 1 }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: color, stopOpacity: horizontal ? 1 : base })
    ]
  }
);
function WarmTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  nameFormatter,
  hideLabel
}) {
  if (!active || !payload || payload.length === 0) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-[10px] border bg-white px-2.5 py-2 shadow-sm",
      style: { borderColor: WARM.border, fontSize: 12, minWidth: 120 },
      children: [
        !hideLabel && label != null && label !== "" && /* @__PURE__ */ jsx("div", { className: "mb-1.5 font-semibold text-warm-ink", style: { fontSize: 11.5 }, children: labelFormatter ? labelFormatter(label) : label }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: payload.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "h-2 w-2 shrink-0 rounded-[3px]",
              style: { background: item.color ?? WARM.sub }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-warm-sub", children: nameFormatter ? nameFormatter(item.name, item.dataKey) : item.name }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto pl-3 font-semibold tabular-nums text-warm-ink", children: valueFormatter && item.value != null ? valueFormatter(item.value, item.dataKey, item) : item.value })
        ] }, item.dataKey ?? i)) })
      ]
    }
  );
}
function WarmLegend({ items, onToggle, payload, className }) {
  const resolved = items ?? (payload ?? []).map((p) => ({
    key: String(p.dataKey ?? p.value ?? ""),
    label: p.value ?? "",
    color: p.color ?? WARM.sub
  }));
  if (resolved.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className), children: resolved.map((item) => {
    const dot = /* @__PURE__ */ jsx(
      "span",
      {
        className: "h-2 w-2 shrink-0 rounded-[3px] transition-opacity",
        style: { background: item.color, opacity: item.hidden ? 0.3 : 1 }
      }
    );
    const text = /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-[11.5px] font-semibold transition-colors",
        style: { color: item.hidden ? WARM.faint : WARM.sub },
        children: item.label
      }
    );
    if (!onToggle) {
      return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        dot,
        text
      ] }, item.key);
    }
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onToggle(item.key),
        "aria-pressed": !item.hidden,
        "aria-label": typeof item.label === "string" ? `Toggle ${item.label} series` : void 0,
        className: cn("flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/30", pressable),
        children: [
          dot,
          text
        ]
      },
      item.key
    );
  }) });
}
var cell = (value, format) => format ? format(value) : value == null ? "" : String(value);
function ChartDataTable({ caption, columns, rows }) {
  return /* @__PURE__ */ jsxs("table", { className: "sr-only", children: [
    /* @__PURE__ */ jsx("caption", { children: caption }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("th", { scope: "col", children: c.label }, c.key)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("td", { children: cell(row[c.key], c.format) }, c.key)) }, i)) })
  ] });
}

// src/warm/charts/axes.ts
var tickFor = (isMobile) => isMobile ? { ...axisTick, fontSize: 10 } : axisTick;
function timeXAxis({ dataKey, tickFormatter, isMobile }) {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    interval: "preserveStartEnd",
    minTickGap: isMobile ? 20 : 28
  };
}
function categoryXAxis({ dataKey, tickFormatter, isMobile, showAll }) {
  return {
    dataKey,
    tickFormatter,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: { stroke: WARM.border },
    ...showAll ? { interval: 0 } : {}
  };
}
function numberYAxis({
  tickFormatter,
  width = 48,
  isMobile,
  yAxisId,
  orientation,
  domain,
  label,
  hide
} = {}) {
  return {
    tick: tickFor(isMobile),
    tickFormatter,
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 40) : width,
    ...yAxisId ? { yAxisId } : {},
    ...orientation ? { orientation } : {},
    ...domain ? { domain } : {},
    ...hide ? { hide: true } : {},
    ...label ? {
      label: {
        value: label,
        angle: orientation === "right" ? 90 : -90,
        position: orientation === "right" ? "insideRight" : "insideLeft",
        style: { fontSize: 10, fill: WARM.sub, textAnchor: "middle" }
      }
    } : {}
  };
}
function categoryYAxis({
  dataKey,
  width = 104,
  isMobile
}) {
  return {
    type: "category",
    dataKey,
    tick: tickFor(isMobile),
    tickLine: false,
    axisLine: false,
    width: isMobile ? Math.min(width, 84) : width,
    interval: 0
  };
}

// src/warm/charts/references.ts
function referenceTarget({ y, x, label, color = WARM.warn, yAxisId }) {
  return {
    ...y != null ? { y } : {},
    ...x != null ? { x } : {},
    ...yAxisId ? { yAxisId } : {},
    stroke: color,
    strokeDasharray: "4 4",
    strokeWidth: 1.5,
    ifOverflow: "extendDomain",
    label: {
      value: label,
      position: "insideTopRight",
      fill: color,
      fontSize: 10,
      fontWeight: 600
    }
  };
}
function barValueLabel({ formatter, position = "right", color = WARM.sub } = {}) {
  return {
    position,
    formatter,
    style: { fontSize: 10.5, fontWeight: 600, fill: color }
  };
}

// src/warm/charts/constants.ts
var CHART_MARGIN = { top: 8, right: 12, left: 0, bottom: 0 };
var CHART_MARGIN_COMPACT = { top: 6, right: 8, left: 0, bottom: 0 };
var CHART_HEIGHT = {
  hero: 300,
  default: 200,
  compact: 180
};
var BAR_RADIUS = [6, 6, 0, 0];
var BAR_RADIUS_H = [0, 6, 6, 0];
var activeDot = (color) => ({ r: 4, strokeWidth: 2, stroke: "#fff", fill: color });
var barCursor = { fill: WARM.chip, fillOpacity: 0.6 };
var crosshairCursor = { stroke: WARM.borderStrong, strokeWidth: 1, strokeDasharray: "3 3" };
var alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center"
};
function WarmTable({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: cn("w-full border-collapse text-body-sm", className), ...props, children }) });
}
function WarmThead({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: cn("text-micro text-warm-faint", className), ...props, children }) });
}
function Th({ align = "left", className, children, ...props }) {
  return /* @__PURE__ */ jsx("th", { className: cn("pb-3 pr-3 font-bold uppercase tracking-wide", alignClass[align], className), ...props, children });
}
function WarmTr({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn("border-t border-warm-border transition-colors hover:bg-warm-chip/40", className),
      ...props,
      children
    }
  );
}
function Td({ align, numeric, className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      className: cn(
        "py-3 pr-3",
        alignClass[align ?? (numeric ? "right" : "left")],
        numeric && "tabular-nums",
        className
      ),
      ...props,
      children
    }
  );
}
function EmptyState({ icon, title, description, action, className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("div", { className: "mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-warm-chip text-warm-sub", children: icon }),
        /* @__PURE__ */ jsx("div", { className: "font-bold text-warm-ink", children: title }),
        description && /* @__PURE__ */ jsx("div", { className: "max-w-[360px] text-body-sm text-warm-sub", children: description }),
        action && /* @__PURE__ */ jsx("div", { className: "mt-2", children: action })
      ]
    }
  );
}
var Tabs = TabsPrimitive.Root;
var TabsList = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function SegTabs(props) {
  return /* @__PURE__ */ jsx(Tabs, { ...props });
}
var SegList = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsList, { ref, className: cn("fb-seg-track h-auto", className), ...props }));
SegList.displayName = "SegList";
var SegTrigger = React7.forwardRef(({ className, value, children, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsTrigger,
  {
    ref,
    value,
    className: cn("fb-seg-btn rounded px-2.5 py-1 text-xs font-medium", className),
    ...props,
    children
  }
));
SegTrigger.displayName = "SegTrigger";
var SegContent = TabsContent;
var segTrackClass = "fb-seg-track";
var segItemClass = "fb-seg-btn rounded px-2.5 py-1 text-xs font-medium data-[state=on]:bg-warm-card data-[state=on]:text-warm-ink data-[state=on]:shadow-[inset_0_0_0_1px_var(--warm-border-strong)]";
function PageTabList({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsList,
    {
      className: cn(
        "h-auto w-full justify-start gap-5 rounded-none border-0 border-b border-warm-border bg-transparent p-0",
        className
      ),
      ...props,
      children
    }
  );
}
function PageTabTrigger({ active: _active, icon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    TabsTrigger,
    {
      className: cn(
        "fb-tab -mb-px flex items-center gap-2 rounded-none border-0 border-b-2 bg-transparent px-0 py-0 pb-2.5 pt-1",
        "text-[13px] font-medium shadow-none transition-colors",
        "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-warm-ink",
        className
      ),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "inline-flex", children: icon }),
        children
      ]
    }
  );
}
function CountUp({ value, format = (n) => Math.round(n).toLocaleString(), duration = 0.7 }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => reduced ? value : 0);
  const fromRef = useRef(reduced ? value : 0);
  useEffect(() => {
    if (reduced) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(fromRef.current, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (latest) => setDisplay(latest)
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration, reduced]);
  return /* @__PURE__ */ jsx("span", { children: format(display) });
}
var staggerChildren = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04 } }
};
var cardEnter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }
};
typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? { } : { };
function Stagger({ className, children }) {
  const reduced = useReducedMotion();
  if (reduced) return /* @__PURE__ */ jsx("div", { className, children });
  return /* @__PURE__ */ jsx(motion.div, { className, variants: staggerChildren, initial: "initial", animate: "animate", children: React7.Children.map(
    children,
    (child) => child == null ? child : /* @__PURE__ */ jsx(motion.div, { variants: cardEnter, children: child })
  ) });
}
function PageStack({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-section", className), ...props, children });
}
function AutoGrid({
  min = "220px",
  className,
  style,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid gap-gutter grid-cols-[repeat(auto-fit,minmax(var(--min),1fr))]",
        className
      ),
      style: { ["--min"]: min, ...style },
      ...props,
      children
    }
  );
}
var GRID_VARIANTS = {
  /** 1 → 2-up. Pair with `lg:col-span-2` on wide children for full-bleed rows. */
  halves: "grid grid-cols-1 gap-gutter lg:grid-cols-2",
  /** 1 → 2 → 3-up. */
  thirds: "grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3",
  /** 2 → 4-up, denser on ultrawide. */
  quarters: "grid grid-cols-2 gap-gutter lg:grid-cols-4 2xl:grid-cols-6"
};
function GridRow({
  variant = "halves",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn(GRID_VARIANTS[variant], className), ...props, children });
}
function WidgetContainer({
  title,
  subtitle,
  right,
  height,
  grow,
  className,
  loading,
  footer,
  children
}) {
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", style: { marginBottom: SPACE.headerGap }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-warm-ink font-bold", style: { fontSize: 14.5, letterSpacing: "-0.01em" }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { className: "text-warm-sub", style: { fontSize: 12, marginTop: 2 }, children: subtitle })
      ] }),
      right
    ] }),
    /* @__PURE__ */ jsx("div", { style: height == null ? void 0 : grow ? { minHeight: height } : { height }, children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full", style: { height: height ?? "100%" } }) : children }),
    footer && /* @__PURE__ */ jsx("div", { style: { marginTop: SPACE.headerGap }, children: footer })
  ] });
}
var ResizablePanelGroup = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  ResizablePrimitive.PanelGroup,
  {
    className: cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    ),
    ...props
  }
);
var ResizablePanel = ResizablePrimitive.Panel;
var ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  ResizablePrimitive.PanelResizeHandle,
  {
    className: cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    ),
    ...props,
    children: withHandle && /* @__PURE__ */ jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ jsx(DotsSixVertical, { className: "h-2.5 w-2.5" }) })
  }
);
function useIsLg() {
  const [isLg, setIsLg] = React7.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  React7.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsLg(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isLg;
}
function SplitPane({
  list,
  detail,
  storageId,
  defaultSizes = [38, 62],
  minSizes = [24, 30],
  height = "70vh",
  className
}) {
  const isLg = useIsLg();
  if (!isLg) {
    return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-gutter", className), children: [
      /* @__PURE__ */ jsx("div", { className: "max-h-[55vh] overflow-y-auto", children: list }),
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: detail })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    ResizablePanelGroup,
    {
      direction: "horizontal",
      autoSaveId: storageId,
      className: cn("rounded-card border border-warm-border bg-warm-card", className),
      style: { height },
      children: [
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSizes[0], minSize: minSizes[0], children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4", children: list }) }),
        /* @__PURE__ */ jsx(ResizableHandle, { withHandle: true, className: "bg-warm-border" }),
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSizes[1], minSize: minSizes[1], children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4", children: detail }) })
      ]
    }
  );
}
function DataGridWrapper({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-x-auto", className), ...props, children });
}
function ExpandableRow({ summary, detail, columns, defaultOpen = false }) {
  const [open, setOpen] = React7.useState(defaultOpen);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(WarmTr, { className: "cursor-pointer", onClick: () => setOpen((o) => !o), children: [
      /* @__PURE__ */ jsx(Td, { className: "w-6 align-middle text-warm-faint", children: /* @__PURE__ */ jsx(CaretRight, { size: 15, className: cn("transition-transform", open && "rotate-90") }) }),
      summary
    ] }),
    open && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns + 1, className: "border-t border-warm-border bg-warm-chip/20 px-3 py-3", children: detail }) })
  ] });
}
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React7.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetTitle = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
var WIDTHS = { md: "sm:max-w-[360px]", lg: "sm:max-w-[480px]" };
function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  width = "md",
  footer,
  children
}) {
  return /* @__PURE__ */ jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: `flex w-full flex-col gap-0 border-warm-border ${WIDTHS[width]}`, children: [
    /* @__PURE__ */ jsxs(SheetHeader, { children: [
      /* @__PURE__ */ jsx(SheetTitle, { children: title }),
      description && /* @__PURE__ */ jsx(SheetDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "-mx-6 mt-section flex-1 overflow-y-auto px-6", children }),
    footer && /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end gap-2 border-t border-warm-border pt-4", children: footer })
  ] }) });
}
function Field({ label, required, hint, error, className, children }) {
  const id = React7.useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;
  return /* @__PURE__ */ jsxs("div", { className: cn("fb-field", className), children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: cn("fb-label", required && "fb-label--req"), children: label }),
    children({
      id,
      "aria-describedby": note ? noteId : void 0,
      "aria-invalid": error ? true : void 0
    }),
    note && /* @__PURE__ */ jsx("span", { id: noteId, className: cn("fb-hint", error && "fb-hint--err"), children: note })
  ] });
}
function Label({
  required,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("label", { className: cn("fb-label", required && "fb-label--req", className), ...props });
}
function Hint({
  error,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("span", { className: cn("fb-hint", error && "fb-hint--err", className), ...props });
}
var Input = React7.forwardRef(
  function Input2({ className, type = "text", ...props }, ref) {
    return /* @__PURE__ */ jsx("input", { ref, type, className: cn("fb-inp", className), ...props });
  }
);
var Textarea = React7.forwardRef(function Textarea2({ className, rows = 3, ...props }, ref) {
  return /* @__PURE__ */ jsx("textarea", { ref, rows, className: cn("fb-inp", className), ...props });
});
var Select = React7.forwardRef(function Select2({ options, placeholder, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs("span", { className: "fb-selwrap", children: [
    /* @__PURE__ */ jsxs("select", { ref, className: cn("fb-inp", className), ...props, children: [
      placeholder && /* @__PURE__ */ jsx("option", { value: "", children: placeholder }),
      children ?? options?.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, disabled: o.disabled, children: o.label }, o.value))
    ] }),
    /* @__PURE__ */ jsx("span", { className: "fb-selcaret", "aria-hidden": "true", children: /* @__PURE__ */ jsx(CaretDown, { size: 12, weight: "bold" }) })
  ] });
});
function withLabel(control, label, rowClassName) {
  if (!label) return control;
  return /* @__PURE__ */ jsxs("label", { className: cn("fb-choice", rowClassName), children: [
    control,
    /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
var Checkbox = React7.forwardRef(function Checkbox2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", className: cn("fb-box", className), ...props }),
    label,
    rowClassName
  );
});
var Radio = React7.forwardRef(function Radio2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    /* @__PURE__ */ jsx("input", { ref, type: "radio", className: cn("fb-box", className), ...props }),
    label,
    rowClassName
  );
});
var Switch = React7.forwardRef(function Switch2({ label, rowClassName, className, ...props }, ref) {
  return withLabel(
    // role="switch" so it is announced as on/off rather than checked/unchecked —
    // the distinction that tells someone it has already taken effect.
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", role: "switch", className: cn("fb-switch", className), ...props }),
    label,
    rowClassName
  );
});
var MAX_WIDTH = { sm: 380, md: 520, lg: 720 };
function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  footer,
  dismissible = true,
  className,
  children
}) {
  const block = (e) => {
    if (!dismissible) e.preventDefault();
  };
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(SheetPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(SheetPrimitive.Overlay, { className: "fb-modal-scrim" }),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        className: cn("fb-modal", className),
        style: { maxWidth: MAX_WIDTH[size] },
        onEscapeKeyDown: block,
        onPointerDownOutside: block,
        onInteractOutside: block,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 pb-4 pt-5", children: [
            /* @__PURE__ */ jsx(SheetPrimitive.Title, { className: "text-warm-ink pr-7 text-[15px] font-semibold leading-5", children: title }),
            description ? /* @__PURE__ */ jsx(SheetPrimitive.Description, { className: "text-warm-faint mt-1 pr-7 text-xs leading-relaxed", children: description }) : (
              // Radix warns when a dialog has no description; this says "none on
              // purpose" instead of leaving a console warning for every modal.
              /* @__PURE__ */ jsx(SheetPrimitive.Description, {})
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-warm-border flex-1 overflow-y-auto border-t px-6 py-5", children }),
          footer && /* @__PURE__ */ jsx("div", { className: "border-warm-border flex items-center justify-end gap-2 border-t px-6 py-4", children: footer }),
          dismissible && /* @__PURE__ */ jsx(SheetPrimitive.Close, { className: "fb-modal-x", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { size: 13, weight: "bold" }) })
        ]
      }
    )
  ] }) });
}
var CSS = `
/* \u2500\u2500 buttons \u2014 ranked by darkness, not by hue \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   primary (ink) > secondary (muted fill) > ghost (bare text). Rank reads at a
   glance in any brand palette, which a hue-coded hierarchy does not. */
.fb-btn { display:inline-flex; align-items:center; gap:6px; border-radius:6px; padding:5px 12px;
  font-size:12px; font-weight:600; line-height:18px; border:1px solid transparent; cursor:pointer;
  transition: background-color .12s, border-color .12s, color .12s; }
.fb-btn:disabled { opacity:.5; cursor:default; }
.fb-btn--primary { background:var(--warm-primary); color:var(--warm-primary-fg, #FFFFFF); }
.fb-btn--primary:hover:not(:disabled) { background:color-mix(in srgb, var(--warm-primary) 86%, #FFFFFF); }
.fb-btn--secondary { background:var(--warm-chip); border-color:var(--warm-border); color:var(--warm-ink); font-weight:500; }
.fb-btn--secondary:hover:not(:disabled) { background:color-mix(in srgb, var(--warm-chip) 88%, #000000); border-color:var(--warm-border-strong); }
.fb-btn--ghost { background:transparent; color:var(--warm-sub); font-weight:500; }
.fb-btn--ghost:hover:not(:disabled) { background:var(--warm-chip); color:var(--warm-ink); }
.fb-btn--danger { background:var(--warm-card); border-color:var(--warm-danger); color:var(--warm-danger); }
.fb-btn--danger:hover:not(:disabled) { background:var(--warm-danger-soft); }
/* Pinned to ink regardless of the tenant's primary. Kept for surfaces that need a
   near-black button even where the brand color is light. */
.fb-btn--dark { background:var(--warm-ink); color:var(--warm-card); }
.fb-btn--dark:hover:not(:disabled) { background:color-mix(in srgb, var(--warm-ink) 86%, #FFFFFF); }

/* \u2500\u2500 focus \u2014 ONE ring for the whole system \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Accent 600 at 2px with a 1px offset. Never remove it; never redefine it
   locally. This is the only place the accent ramp is allowed to touch a
   control's outline.

   WHY 600 AND NOT 400: 400 is the stop the ramp was originally hand-tuned
   around, and it fails WCAG 1.4.11 non-text contrast on white for every
   tenant \u2014 2.57 to 2.79 against a 3.0 minimum. 500 still fails for the teal
   palettes (2.95). 600 clears it everywhere (4.06 to 4.51) with room to
   spare, and is the darkest stop that still reads as the brand's color
   rather than as ink. A focus ring that only some keyboard users can see is
   not a focus ring. */
.fb-btn:focus-visible, .fb-tab:focus-visible, .fb-seg-btn:focus-visible,
.fb-add:focus-visible, .fb-sorth:focus-visible {
  outline:2px solid var(--accent-600); outline-offset:1px; }

/* \u2500\u2500 inputs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-input { border:1px solid var(--warm-border); background:var(--warm-card); color:var(--warm-ink); border-radius:6px;
  transition: border-color .12s, box-shadow .12s; }
.fb-input:hover { border-color:var(--warm-border-strong); }
.fb-input:focus { outline:none; border-color:var(--accent-600); box-shadow:0 0 0 3px var(--accent-100); }
.fb-qty::-webkit-outer-spin-button, .fb-qty::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
.fb-qty { -moz-appearance:textfield; appearance:textfield; }
.fb-check { width:13px; height:13px; cursor:pointer; accent-color:var(--warm-primary); }

/* \u2500\u2500 form fields \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The control shell is .fb-inp, a NEW class rather than sizing added to the
   .fb-input above it. This stylesheet renders in the body, so a padding
   declaration on .fb-input would beat the Tailwind padding utility that every
   existing call site already passes \u2014 same specificity, later in document order.
   A separate class leaves those call sites untouched.

   The label sits at the BODY tier (sub), not the faint tier that carries column
   labels and units. A field label is the control's name \u2014 the thing you read to
   know what you are typing into \u2014 and a form whose labels are all faint reads as
   a disabled form. The hint below it is genuinely secondary, so that one is faint.

   Invalid state is a border plus a message, never a border alone: a red outline
   with no text tells someone that something is wrong and not what. */
.fb-field { display:flex; flex-direction:column; gap:5px; }
.fb-label { font-size:12px; font-weight:600; line-height:16px; color:var(--warm-sub); }
.fb-label--req::after { content:"*"; margin-left:3px; color:var(--warm-danger); }
.fb-hint { font-size:11px; line-height:1.45; color:var(--warm-faint); }
.fb-hint--err { color:var(--warm-danger); }

.fb-inp { width:100%; border:1px solid var(--warm-border); background:var(--warm-card); color:var(--warm-ink);
  border-radius:6px; padding:6px 10px; font-family:inherit; font-size:12.5px; line-height:18px;
  transition: border-color .12s, box-shadow .12s; }
.fb-inp::placeholder { color:var(--warm-faint); }
.fb-inp:hover:not(:disabled):not([aria-invalid="true"]) { border-color:var(--warm-border-strong); }
.fb-inp:focus { outline:none; border-color:var(--accent-600); box-shadow:0 0 0 3px var(--accent-100); }
.fb-inp:disabled { background:var(--warm-chip); color:var(--warm-faint); cursor:default; }
.fb-inp[aria-invalid="true"] { border-color:var(--warm-danger); }
.fb-inp[aria-invalid="true"]:focus { border-color:var(--warm-danger); box-shadow:0 0 0 3px var(--warm-danger-soft); }
textarea.fb-inp { min-height:64px; resize:vertical; }
select.fb-inp { appearance:none; -webkit-appearance:none; cursor:pointer; padding-right:26px; }
/* The caret is a sibling element, not a background-image data URI: a data URI
   cannot read var(--warm-faint), so an inlined SVG would be the one neutral in
   the system that ignores a client's token overrides. */
.fb-selwrap { position:relative; display:block; }
.fb-selcaret { position:absolute; right:8px; top:50%; transform:translateY(-50%); pointer-events:none;
  display:flex; color:var(--warm-faint); }

/* \u2500\u2500 checkbox, radio, switch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   All three take their ON color from --warm-primary, not from the accent ramp.
   The ramp is interaction-only (rule 1) \u2014 it says "you are touching this", which
   is not what a checked box means. This also keeps them consistent with the
   .fb-check accent-color that predates them. */
.fb-choice { display:inline-flex; align-items:center; gap:7px; font-size:12.5px; line-height:18px;
  color:var(--warm-sub); cursor:pointer; }
.fb-choice:has(input:disabled) { color:var(--warm-faint); cursor:default; }
.fb-box { width:14px; height:14px; margin:0; flex-shrink:0; cursor:pointer; accent-color:var(--warm-primary); }
.fb-box:disabled { cursor:default; }
.fb-box:focus-visible { outline:2px solid var(--accent-600); outline-offset:2px; }

.fb-switch { appearance:none; -webkit-appearance:none; position:relative; flex-shrink:0; margin:0;
  width:30px; height:17px; border-radius:9px; background:var(--warm-track);
  border:1px solid var(--warm-border-strong); cursor:pointer;
  transition: background-color .14s, border-color .14s; }
.fb-switch::after { content:""; position:absolute; top:1px; left:1px; width:13px; height:13px; border-radius:50%;
  background:var(--warm-card); box-shadow:0 1px 2px rgba(16,18,24,0.3); transition: transform .14s; }
.fb-switch:checked { background:var(--warm-primary); border-color:var(--warm-primary); }
.fb-switch:checked::after { transform:translateX(13px); }
.fb-switch:disabled { opacity:.5; cursor:default; }
.fb-switch:focus-visible { outline:2px solid var(--accent-600); outline-offset:2px; }

/* \u2500\u2500 modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A modal is one of the few things on a dashboard that genuinely floats, so it
   is allowed the shadow that rule 2 denies a card. It keeps the strong edge too:
   the shadow places it above the page, the edge still defines it. */
.fb-modal-scrim { position:fixed; inset:0; z-index:50;
  background:color-mix(in srgb, var(--warm-ink) 45%, transparent); animation:fb-fade-in .15s ease-out; }
.fb-modal { position:fixed; z-index:51; left:50%; top:50%; transform:translate(-50%,-50%);
  display:flex; flex-direction:column; width:calc(100vw - 32px); max-height:calc(100vh - 64px);
  background:var(--warm-card); border:1px solid var(--warm-border-strong); border-radius:8px;
  box-shadow:0 16px 48px rgba(16,18,24,0.18); animation:fb-modal-in .16s ease-out; }
.fb-modal-x { position:absolute; top:12px; right:12px; display:inline-flex; align-items:center; justify-content:center;
  width:24px; height:24px; border:0; border-radius:5px; background:transparent; color:var(--warm-faint);
  cursor:pointer; transition: color .12s, background-color .12s; }
.fb-modal-x:hover { color:var(--warm-ink); background:var(--warm-chip); }
.fb-modal-x:focus-visible { outline:2px solid var(--accent-600); outline-offset:1px; }

/* \u2500\u2500 dropdowns \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-dd-trigger { cursor:pointer; font-weight:500; transition: border-color .12s; }
.fb-dd-trigger:hover { border-color:var(--warm-border-strong); }
.fb-dd-trigger:focus-visible { outline:2px solid var(--accent-600); outline-offset:1px; }
.fb-dd { animation:fb-tip-in .14s ease-out; }
.fb-dd-item { border:0; background:transparent; cursor:pointer; transition: background-color .1s; }
.fb-dd-item:hover { background:var(--warm-chip); }
.fb-dd-item:focus-visible { outline:2px solid var(--accent-600); outline-offset:-2px; }

/* \u2500\u2500 tabs and segmented controls \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Active state is a weight and a rule, not a colored fill \u2014 the tab bar sits
   above the content it switches and should not compete with it.

   Both selectors are listed on each rule: .on for plain buttons, and
   [data-state=active] for the Radix-backed wrappers, so the two spellings of
   "this one is selected" cannot drift apart visually. */
.fb-tab { color:var(--warm-sub); border-color:transparent; }
.fb-tab:hover { color:var(--warm-ink); }
.fb-tab.on, .fb-tab[data-state="active"] { color:var(--warm-ink); border-color:var(--warm-primary); }
.fb-seg-btn { color:var(--warm-sub); background:transparent; transition: color .12s; white-space:nowrap; }
.fb-seg-btn:hover { color:var(--warm-ink); }
.fb-seg-btn.on, .fb-seg-btn[data-state="active"] {
  color:var(--warm-ink); background:var(--warm-card); box-shadow:inset 0 0 0 1px var(--warm-border-strong); }
.fb-seg-track { display:inline-flex; align-items:center; gap:2px; border-radius:6px; padding:2px;
  background:var(--warm-bg); border:1px solid var(--warm-border); }

/* \u2500\u2500 table rows and row-scoped affordances \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The copy and remove buttons are invisible until their row is hovered or they
   take keyboard focus \u2014 present when wanted, silent otherwise. The :focus-visible
   half is what keeps them reachable without a mouse. */
.fb-row { transition: background-color .1s; }
.fb-row:hover { background:color-mix(in srgb, var(--warm-chip) 40%, transparent); }
.fb-sorth:hover { color:var(--warm-ink); }
.fb-add { color:var(--warm-faint); transition: color .12s, border-color .12s; }
.fb-add:hover:not(:disabled) { color:var(--warm-sub); border-color:var(--warm-faint); }
.fb-copy { display:inline-flex; align-items:center; vertical-align:-1px; padding:0 2px; border:0;
  background:transparent; color:var(--warm-faint); cursor:pointer; opacity:0; transition: opacity .12s, color .12s; }
.fb-copy:hover { color:var(--warm-ink); }
.fb-copy.on { opacity:1; color:var(--warm-pos); }
.fb-row:hover .fb-copy, .fb-copy:focus-visible { opacity:1; }
.fb-rowx { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border:0; border-radius:5px;
  background:transparent; color:var(--warm-faint); cursor:pointer; opacity:0; transition: opacity .12s, color .12s, background-color .12s; }
.fb-rowx:hover { color:var(--warm-danger); background:var(--warm-danger-soft); }
.fb-rowx:focus-visible { outline:2px solid var(--accent-600); outline-offset:1px; }
.fb-row:hover .fb-rowx, .fb-rowx:focus-visible { opacity:1; }

/* \u2500\u2500 definitions and tooltips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A dotted underline marks a term that has a definition \u2014 discoverable without
   an icon cluttering the label. The tip itself is dark-on-light: it is transient
   UI, and inverting it separates it from the page instead of competing with it. */
.fb-def { cursor:help; text-decoration:underline dotted var(--warm-faint); text-decoration-thickness:1px; text-underline-offset:3px; }
.fb-tipbox { position:fixed; z-index:70; width:max-content; max-width:260px; pointer-events:none;
  background:var(--warm-ink); color:var(--warm-border); border:1px solid color-mix(in srgb, var(--warm-ink) 82%, #FFFFFF); border-radius:8px; padding:8px 11px;
  font-size:12px; line-height:1.5; font-weight:400; letter-spacing:normal; text-transform:none; text-align:left;
  box-shadow:0 8px 24px rgba(16,18,24,0.22); }
.fb-tipin { animation:fb-tip-in .14s ease-out; }

/* \u2500\u2500 toasts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-toaster { position:fixed; right:20px; bottom:20px; z-index:60; display:flex; flex-direction:column; gap:8px; }
.fb-toast { display:flex; align-items:flex-start; gap:9px; width:320px; max-width:calc(100vw - 40px);
  background:var(--warm-ink); border:1px solid color-mix(in srgb, var(--warm-ink) 82%, #FFFFFF); border-radius:8px; padding:10px 12px;
  box-shadow:0 8px 24px rgba(0,0,0,0.25); animation:fb-toast-in .18s ease-out; }
.fb-toast-title { font-size:12.5px; font-weight:600; line-height:1.375; color:var(--warm-bg); }
.fb-toast-sub { margin-top:2px; font-size:11px; line-height:1.375; color:color-mix(in srgb, var(--warm-bg) 68%, var(--warm-ink)); }
.fb-toast-x { flex-shrink:0; font-size:13px; line-height:1; background:transparent; border:0; cursor:pointer;
  color:color-mix(in srgb, var(--warm-bg) 48%, var(--warm-ink)); }
.fb-toast-x:hover { color:var(--warm-bg); }

/* \u2500\u2500 sliders \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-range { -webkit-appearance:none; appearance:none; height:4px; border-radius:2px; background:var(--warm-track); outline:none; cursor:pointer; }
.fb-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:16px; height:16px; border-radius:50%;
  background:var(--accent-500); border:2.5px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.25); cursor:grab; }
.fb-range::-moz-range-thumb { width:13px; height:13px; border-radius:50%;
  background:var(--accent-500); border:2.5px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.25); cursor:grab; }
.fb-range:focus-visible { outline:2px solid var(--accent-600); outline-offset:2px; }
.fb-tickslider { position:relative; }
.fb-tickslider:focus-within { outline:2px solid var(--accent-600); outline-offset:3px; border-radius:4px; }
.fb-tickslider input[type=range] { position:absolute; inset:0; width:100%; height:100%; opacity:0; cursor:ew-resize; margin:0; }

/* \u2500\u2500 calendar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-cal-day { border-radius:6px; transition: background-color .08s; cursor:pointer; }
.fb-cal-day:hover { background:var(--warm-chip); }

/* \u2500\u2500 overlays \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fb-drawer { animation:fb-drawer-in .2s ease-out; }
.fb-scrim { animation:fb-fade-in .15s ease-out; }
.fb-chart-reveal { animation:fb-chart-reveal .5s ease-out both; }

@keyframes fb-tip-in { from { opacity:0; transform:translateY(3px); } }
@keyframes fb-modal-in { from { opacity:0; transform:translate(-50%,-48%) scale(.98); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
@keyframes fb-toast-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
@keyframes fb-drawer-in { from { transform:translateX(28px); opacity:0; } to { transform:none; opacity:1; } }
@keyframes fb-fade-in { from { opacity:0; } to { opacity:1; } }
@keyframes fb-chart-reveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

/* \u2500\u2500 reduced motion \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Every animation in the system is listed here. Motion is decoration on top of
   states that already read without it, so the honest response to the OS setting
   is to remove it entirely rather than shorten it. */
@media (prefers-reduced-motion: reduce) {
  .fb-dd, .fb-tipin, .fb-toast, .fb-drawer, .fb-scrim, .fb-chart-reveal,
  .fb-modal, .fb-modal-scrim { animation:none; }
  /* The switch thumb is the one state change that would be unreadable if it
     simply vanished, so it loses its travel time rather than its travel. */
  .fb-switch::after { transition:none; }
}
`;
function SystemStyle() {
  return /* @__PURE__ */ jsx("style", { children: CSS });
}
var pushToast = null;
function toast(title, opts) {
  pushToast?.({ title, tone: opts?.tone ?? "muted", sub: opts?.sub });
}
function Toaster() {
  const [items, setItems] = React7.useState([]);
  React7.useEffect(() => {
    let n = 0;
    pushToast = (t) => {
      const id = ++n;
      setItems((xs) => [...xs.slice(-3), { ...t, id }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 5e3);
    };
    return () => {
      pushToast = null;
    };
  }, []);
  if (!items.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "fb-toaster", role: "status", "aria-live": "polite", children: items.map((t) => /* @__PURE__ */ jsxs("div", { className: "fb-toast", children: [
    /* @__PURE__ */ jsx("span", { className: "mt-1 h-2 w-2 shrink-0 rounded-full", style: { background: tone(t.tone).fg } }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "fb-toast-title", children: t.title }),
      t.sub && /* @__PURE__ */ jsx("p", { className: "fb-toast-sub", children: t.sub })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setItems((xs) => xs.filter((x) => x.id !== t.id)),
        "aria-label": "Dismiss",
        className: "fb-toast-x",
        children: "\u2715"
      }
    )
  ] }, t.id)) });
}
function TipLayer() {
  const [tip, setTip] = React7.useState(null);
  React7.useEffect(() => {
    let anchor = null;
    let timer;
    const show = (el) => {
      const text = el.getAttribute("data-tip");
      if (!text) return;
      const r = el.getBoundingClientRect();
      const below = r.top < 76;
      const x = Math.min(Math.max(r.left + r.width / 2, 148), window.innerWidth - 148);
      setTip({ text, x, y: below ? r.bottom + 8 : r.top - 8, below });
    };
    const over = (e) => {
      const el = e.target?.closest?.("[data-tip]") ?? null;
      if (el === anchor) return;
      anchor = el;
      window.clearTimeout(timer);
      if (el) timer = window.setTimeout(() => show(el), 120);
      else setTip(null);
    };
    const hide = () => {
      anchor = null;
      window.clearTimeout(timer);
      setTip(null);
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("scroll", hide, true);
    document.addEventListener("mousedown", hide);
    document.addEventListener("mouseleave", hide);
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("scroll", hide, true);
      document.removeEventListener("mousedown", hide);
      document.removeEventListener("mouseleave", hide);
      window.clearTimeout(timer);
    };
  }, []);
  if (!tip) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fb-tipbox",
      role: "tooltip",
      style: { left: tip.x, top: tip.y, transform: `translate(-50%, ${tip.below ? "0" : "-100%"})` },
      children: /* @__PURE__ */ jsx("div", { className: "fb-tipin", children: tip.text })
    }
  );
}
function Def({ hint, children }) {
  return /* @__PURE__ */ jsx("span", { className: "fb-def", "data-tip": hint, children });
}
function Skel({
  w,
  h = 12,
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: `block shrink-0 animate-pulse rounded ${className}`,
      style: { width: w ?? "100%", height: h, background: WARM.chip, ...style }
    }
  );
}
function ChartSkel({ height = 220 }) {
  const bars = [38, 52, 46, 60, 68, 55, 74, 63, 80, 70, 86, 78, 66];
  return /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "flex items-end gap-2 px-4 pb-1", style: { height }, children: bars.map((h, i) => /* @__PURE__ */ jsx(
    "span",
    {
      className: "flex-1 animate-pulse rounded-t",
      style: { height: `${h}%`, background: WARM.chip, animationDelay: `${i * 70}ms` }
    },
    i
  )) });
}
var TIP = { isAnimationActive: false, position: { y: 10 }, offset: 16 };
var REDUCED = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
function ChartTooltip({ title, rows }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-md px-2.5 py-2",
      style: {
        background: WARM.card,
        border: `1px solid ${WARM.borderStrong}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      },
      children: [
        title && /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wider", style: { color: WARM.faint }, children: title }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: rows.map((r) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-5 text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", style: { color: WARM.sub }, children: [
            r.color && /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px]", style: { background: r.color } }),
            r.label
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium tabular-nums", style: { color: WARM.ink }, children: [
            r.value,
            r.delta && /* @__PURE__ */ jsx(
              "span",
              {
                className: "ml-1.5 rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums",
                style: { color: r.delta.color, background: `${r.delta.color}1F` },
                children: r.delta.text
              }
            )
          ] })
        ] }, r.label)) })
      ]
    }
  );
}
function Copy({ text, label = "Copy" }) {
  const [ok, setOk] = React7.useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `fb-copy${ok ? " on" : ""}`,
      title: ok ? "Copied" : label,
      "aria-label": label,
      onClick: async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
        }
      },
      children: ok ? /* @__PURE__ */ jsx(Check, { size: 11, weight: "bold" }) : /* @__PURE__ */ jsx(CopySimple, { size: 11 })
    }
  );
}
function MockTag({
  label = "sample",
  title = "Sample data \u2014 no live source yet"
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "inline-flex items-center gap-1 rounded px-1 align-middle text-[9px] font-semibold uppercase leading-[14px] tracking-wide",
      style: { border: `1px dashed ${WARM.faint}`, color: WARM.sub, background: "transparent" },
      "data-tip": title,
      children: label
    }
  );
}

// src/lib/ramp.ts
var L_CURVE = [0.9704, 0.9311, 0.8694, 0.7797, 0.6995, 0.6609, 0.5803, 0.5001, 0.4209, 0.3509];
var C_CURVE = [0.0169, 0.0334, 0.0553, 0.083, 0.0994, 0.1111, 0.111, 0.1045, 0.0887, 0.0741];
var RAMP_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
var srgbToLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
var linearToSrgb = (c) => c <= 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
function parseHex(hex) {
  const h = hex.trim().replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255
  ];
}
function hexToOklch(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(A * A + B * B);
  let H = Math.atan2(B, A) * 180 / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}
function oklchToLinearRgb(L, C, H) {
  const hRad = H * Math.PI / 180;
  const A = C * Math.cos(hRad);
  const B = C * Math.sin(hRad);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ];
}
var inGamut = ([r, g, b]) => r >= -1e-4 && r <= 1 + 1e-4 && g >= -1e-4 && g <= 1 + 1e-4 && b >= -1e-4 && b <= 1 + 1e-4;
var toHex = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
function oklchToHex(L, C, H) {
  let lo = 0;
  let hi = C;
  if (!inGamut(oklchToLinearRgb(L, C, H))) {
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinearRgb(L, mid, H))) lo = mid;
      else hi = mid;
    }
  } else {
    lo = C;
  }
  const [r, g, b] = oklchToLinearRgb(L, lo, H).map(linearToSrgb);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
var FALLBACK_HUE = 77.54;
var ACHROMATIC = 8e-3;
function makeAccentRamp(brandHex) {
  const src = hexToOklch(brandHex);
  const hue = !src || src.C < ACHROMATIC ? FALLBACK_HUE : src.H;
  const out = {};
  RAMP_STOPS.forEach((stop, i) => {
    out[stop] = oklchToHex(L_CURVE[i], C_CURVE[i], hue);
  });
  return out;
}
function accentRampTokens(brandHex) {
  const ramp = makeAccentRamp(brandHex);
  const tokens = {};
  for (const stop of RAMP_STOPS) tokens[`--accent-${stop}`] = ramp[stop];
  return tokens;
}

export { ACCENT, AXIS_TICK, AutoGrid, BAR_RADIUS, BAR_RADIUS_H, Badge, BarGradient, Btn, CHART_HEIGHT, CHART_MARGIN, CHART_MARGIN_COMPACT, CHART_SERIES, Card, ChartCard, ChartDataTable, ChartEmpty, ChartGradient, ChartSkel, ChartTooltip, Checkbox, Copy, CountUp, DataGridWrapper, Def, Delta, DetailDrawer, EmptyState, ExpandableRow, Field, GRID, GridRow, Hint, Input, KpiStrip, KpiTile, KpiVariantContext, Label, MockTag, Modal, PageStack, PageTabList, PageTabTrigger, Pill, RAMP_STOPS, REDUCED, Radio, RankedListCard, SPACE, SectionLabel, SegContent, SegList, SegTabs, SegTrigger, Select, Skel, Sparkline, SplitPane, Stagger, Switch, SystemStyle, TIP, TOOLTIP_STYLE, Td, Textarea, Th, TipLayer, Toaster, WARM, WarmGrid, WarmLegend, WarmTable, WarmThead, WarmTooltip, WarmTr, WidgetContainer, accentRampTokens, activeDot, axisTick, barCursor, barValueLabel, categoryXAxis, categoryYAxis, chartTip, crosshairCursor, hexToOklch, makeAccentRamp, numberYAxis, oklchToHex, pressable, pressableSoft, referenceTarget, resetWarmCache, segItemClass, segTrackClass, seriesColor, timeXAxis, toast, tone };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map