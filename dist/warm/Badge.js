import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import { tone as resolveTone } from "../system/tone";
const ALIASES = {
  neutral: "muted",
  ok: "pos",
  danger: "neg",
  // `accent` predates the accent ramp being interaction-only. It now renders as
  // the neutral tone rather than painting a surface with the accent color.
  accent: "muted"
};
function Badge({ tone = "muted", className, children, style, ...props }) {
  const t = resolveTone(ALIASES[tone] ?? tone);
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
export {
  Badge
};
//# sourceMappingURL=Badge.js.map