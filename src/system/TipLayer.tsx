import * as React from "react";

/**
 * Tooltip layer for every `[data-tip]` element on the page.
 *
 * One delegated listener rather than per-element state, and the box renders
 * `position: fixed` so an `overflow-x-auto` table wrapper cannot clip it — the
 * failure mode that makes per-element tooltips useless inside data grids.
 *
 * Anything can carry a tip by adding `data-tip="…"`; no wrapper component and no
 * import required at the call site. Use <Def> when the tip defines a term and the
 * label should advertise that it is defined.
 *
 * Mount <TipLayer /> ONCE per page, alongside <Toaster />.
 */
export function TipLayer() {
  const [tip, setTip] = React.useState<{ text: string; x: number; y: number; below: boolean } | null>(null);

  React.useEffect(() => {
    let anchor: Element | null = null;
    let timer: number | undefined;

    const show = (el: Element) => {
      const text = el.getAttribute("data-tip");
      if (!text) return;
      const r = el.getBoundingClientRect();
      // Flip below the anchor when there is no room above (page header region),
      // and keep the box off both viewport edges so it never renders half-cut.
      const below = r.top < 76;
      const x = Math.min(Math.max(r.left + r.width / 2, 148), window.innerWidth - 148);
      setTip({ text, x, y: below ? r.bottom + 8 : r.top - 8, below });
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-tip]") ?? null;
      if (el === anchor) return;
      anchor = el;
      window.clearTimeout(timer);
      // A short delay so sweeping the cursor across a dense table does not strobe.
      if (el) timer = window.setTimeout(() => show(el), 120);
      else setTip(null);
    };

    const hide = () => {
      anchor = null;
      window.clearTimeout(timer);
      setTip(null);
    };

    document.addEventListener("mouseover", over);
    // Capture-phase scroll: a tip anchored to a row must not float free when any
    // ancestor scroll container moves, not just the document.
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
  return (
    <div
      className="fb-tipbox"
      role="tooltip"
      style={{ left: tip.x, top: tip.y, transform: `translate(-50%, ${tip.below ? "0" : "-100%"})` }}
    >
      <div className="fb-tipin">{tip.text}</div>
    </div>
  );
}

/**
 * A defined term: dotted underline plus the definition on hover. Use for jargon
 * and for metrics whose calculation is not obvious from the label.
 */
export function Def({ hint, children }: { hint: string; children: React.ReactNode }) {
  return (
    <span className="fb-def" data-tip={hint}>
      {children}
    </span>
  );
}
