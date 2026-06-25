import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerChildren, cardEnter } from "../lib/motion";

/**
 * Grid/row container that staggers its children in on mount (fade + rise).
 * Each child is wrapped in a motion item, so use it for KPI rows where the
 * children carry no col-span classes. Renders a plain div under
 * prefers-reduced-motion.
 */
export function Stagger({ className, children }: { className?: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerChildren} initial="initial" animate="animate">
      {React.Children.map(children, (child) =>
        child == null ? child : <motion.div variants={cardEnter}>{child}</motion.div>,
      )}
    </motion.div>
  );
}
