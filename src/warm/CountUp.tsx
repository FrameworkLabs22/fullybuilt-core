import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

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
export function CountUp({ value, format = (n) => Math.round(n).toLocaleString(), duration = 0.7 }: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(() => (reduced ? value : 0));
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
      onUpdate: (latest) => setDisplay(latest),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration, reduced]);

  return <span>{format(display)}</span>;
}
