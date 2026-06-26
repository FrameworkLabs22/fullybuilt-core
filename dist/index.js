import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { X, ArrowUpRight, ArrowDownRight, CaretRight, DotsSixVertical } from '@phosphor-icons/react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import * as React3 from 'react';
import { createContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion, motion, AnimatePresence, animate } from 'framer-motion';
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
var BASE = {
  // ── neutrals (shared across all clients) ──
  bg: "#F7F8FA",
  card: "#FFFFFF",
  ink: "#1C1E24",
  sub: "#6E727B",
  faint: "#A6ABB5",
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
  danger: "#d94a36"
};
var BRAND_VARS = {
  primary: "--warm-primary",
  primarySoft: "--warm-primary-soft",
  pos: "--warm-pos",
  posSoft: "--warm-pos-soft",
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
var axisTick = { fontSize: 11, fill: WARM.sub };
var chartTip = {
  contentStyle: {
    fontSize: 12,
    borderRadius: 10,
    border: `1px solid ${WARM.border}`,
    background: "#fff"
  },
  cursor: { fill: WARM.chip, fillOpacity: 0.6 }
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
  stroke: WARM.track
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
var ELEVATION = {
  card: "shadow-card",
  raised: "shadow-raised",
  flat: "shadow-none"
};
function Card({ pad = 24, interactive, elevation = "card", className, style, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-warm-card border border-warm-border rounded-card",
        ELEVATION[elevation],
        interactive && cn("transition-shadow duration-300 hover:shadow-card-hover", pressableSoft),
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
var toneClass = {
  neutral: "bg-warm-chip text-warm-sub",
  danger: "bg-[#FCE9E6] text-warm-danger",
  warn: "bg-warm-warn-soft text-warm-warn",
  ok: "bg-warm-pos-soft text-warm-pos",
  accent: "bg-warm-primary-soft text-warm-primary"
};
function Badge({ tone = "neutral", className, children, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-pill font-bold whitespace-nowrap",
        "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
        toneClass[tone],
        className
      ),
      style: { fontSize: 11.5, padding: "3px 9px", ...style },
      ...props,
      children
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
var kindClass = {
  primary: "bg-brand-red text-white border-brand-red shadow-btn-primary hover:bg-brand-red-light",
  ghost: "bg-warm-card text-warm-ink border-warm-border hover:bg-warm-chip",
  dark: "bg-warm-ink text-white border-warm-ink"
};
function Btn({ kind = "primary", icon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "inline-flex items-center gap-2 h-[38px] px-4 rounded-pill text-[13px] font-bold border transition-colors",
        pressable,
        kindClass[kind],
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
  const ctxVariant = React3.useContext(KpiVariantContext);
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
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", style: { marginBottom: SPACE.headerGap }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-warm-ink font-bold", style: { fontSize: 14.5, letterSpacing: "-0.01em" }, children: title }),
        subtitle && /* @__PURE__ */ jsx("div", { className: "text-warm-sub", style: { fontSize: 12, marginTop: 2 }, children: subtitle })
      ] }),
      right
    ] }),
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
  ] });
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
var TabsList = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TabsTrigger = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TabsContent = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var staggerChildren = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04 } }
};
var cardEnter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }
};
var SPRING = { type: "spring", stiffness: 440, damping: 42 };
typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? { } : { };
var SegCtx = React3.createContext(null);
function SegTabs({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}) {
  const layoutId = React3.useId();
  const [internal, setInternal] = React3.useState(value ?? defaultValue);
  const current = value ?? internal;
  const handleChange = React3.useCallback(
    (v) => {
      setInternal(v);
      onValueChange?.(v);
    },
    [onValueChange]
  );
  return /* @__PURE__ */ jsx(SegCtx.Provider, { value: { value: current, layoutId }, children: /* @__PURE__ */ jsx(Tabs, { value, defaultValue, onValueChange: handleChange, ...props, children }) });
}
var SegList = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsList,
  {
    ref,
    className: cn("h-auto gap-0.5 rounded-pill bg-warm-chip p-1 text-warm-sub", className),
    ...props
  }
));
SegList.displayName = "SegList";
var SegTrigger = React3.forwardRef(({ className, value, children, ...props }, ref) => {
  const ctx = React3.useContext(SegCtx);
  const reduced = useReducedMotion();
  const active = ctx?.value != null && ctx.value === value;
  return /* @__PURE__ */ jsxs(
    TabsTrigger,
    {
      ref,
      value,
      className: cn(
        "relative rounded-pill px-3.5 py-1.5 text-body-sm font-semibold text-warm-sub transition-colors",
        "data-[state=active]:font-bold data-[state=active]:text-warm-ink",
        className
      ),
      ...props,
      children: [
        active && ctx && /* @__PURE__ */ jsx(
          motion.span,
          {
            layoutId: reduced ? void 0 : `seg-pill-${ctx.layoutId}`,
            transition: SPRING,
            className: "absolute inset-0 rounded-pill bg-white shadow-sm",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "relative", children })
      ]
    }
  );
});
SegTrigger.displayName = "SegTrigger";
var SegContent = TabsContent;
var segTrackClass = "gap-0.5 rounded-pill bg-warm-chip p-1";
var segItemClass = "rounded-pill px-3.5 py-1.5 text-body-sm font-semibold text-warm-sub transition-colors data-[state=on]:bg-white data-[state=on]:font-bold data-[state=on]:text-warm-ink data-[state=on]:shadow-sm";
function PageTabList({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsList,
    {
      className: cn(
        "h-auto w-fit gap-1 rounded-pill border border-warm-border bg-white p-1.5 shadow-card",
        className
      ),
      ...props,
      children
    }
  );
}
function PageTabTrigger({ active, icon, className, children, ...props }) {
  const reduced = useReducedMotion() ?? false;
  return /* @__PURE__ */ jsxs(
    TabsTrigger,
    {
      className: cn(
        "relative rounded-pill px-5 py-2 text-body-sm font-semibold text-warm-sub transition-colors",
        "hover:text-warm-ink data-[state=active]:font-bold data-[state=active]:text-brand-red",
        "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        className
      ),
      ...props,
      children: [
        active && /* @__PURE__ */ jsx(
          motion.span,
          {
            layoutId: reduced ? void 0 : "page-tab-pill",
            transition: SPRING,
            className: "absolute inset-0 rounded-pill bg-warm-primary-soft",
            "aria-hidden": true
          }
        ),
        icon && /* @__PURE__ */ jsx("span", { className: "relative mr-1.5 inline-flex", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "relative", children })
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
function Stagger({ className, children }) {
  const reduced = useReducedMotion();
  if (reduced) return /* @__PURE__ */ jsx("div", { className, children });
  return /* @__PURE__ */ jsx(motion.div, { className, variants: staggerChildren, initial: "initial", animate: "animate", children: React3.Children.map(
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
  const [isLg, setIsLg] = React3.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  React3.useEffect(() => {
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
  const [open, setOpen] = React3.useState(defaultOpen);
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
var SheetOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var SheetContent = React3.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
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
var SheetTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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

export { AXIS_TICK, AutoGrid, BAR_RADIUS, BAR_RADIUS_H, Badge, BarGradient, Btn, CHART_HEIGHT, CHART_MARGIN, CHART_MARGIN_COMPACT, CHART_SERIES, Card, ChartCard, ChartDataTable, ChartEmpty, ChartGradient, CountUp, DataGridWrapper, Delta, DetailDrawer, EmptyState, ExpandableRow, GRID, GridRow, KpiStrip, KpiTile, KpiVariantContext, PageStack, PageTabList, PageTabTrigger, Pill, RankedListCard, SPACE, SectionLabel, SegContent, SegList, SegTabs, SegTrigger, Sparkline, SplitPane, Stagger, TOOLTIP_STYLE, Td, Th, WARM, WarmGrid, WarmLegend, WarmTable, WarmThead, WarmTooltip, WarmTr, WidgetContainer, activeDot, axisTick, barCursor, barValueLabel, categoryXAxis, categoryYAxis, chartTip, crosshairCursor, numberYAxis, pressable, pressableSoft, referenceTarget, segItemClass, segTrackClass, seriesColor, timeXAxis };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map