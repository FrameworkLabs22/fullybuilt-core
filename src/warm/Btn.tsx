import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Action button.
 *
 * Rank is expressed by DARKNESS, not by hue: primary (ink) > secondary (muted
 * fill) > ghost (bare text), with `danger` as an outlined destructive confirm.
 *
 * Darkness ranking survives rebranding — it reads correctly whether the tenant's
 * primary is navy, near-black or red — where a hue-coded hierarchy ("blue means
 * primary") collapses the moment a client's brand color IS the warning color.
 *
 * All visual states live in the system stylesheet (`<SystemStyle />`), so hover,
 * focus and disabled are identical to every other control in the system.
 */
/** `dark` predates `primary` and pins the button to ink regardless of the tenant's
 *  primary. Kept distinct rather than aliased: for a client whose primary is not
 *  near-black, folding the two together would silently recolor existing buttons. */
type Kind = "primary" | "secondary" | "ghost" | "danger" | "dark";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: Kind;
  icon?: React.ReactNode;
}

// The default stays `primary`: a bare <Btn> has always meant "the main action on
// this surface", and quietly demoting those call sites to a muted fill would
// change what the page emphasizes without anyone asking for it.
export function Btn({ kind = "primary", icon, className, children, ...props }: BtnProps) {
  return (
    <button type="button" className={cn(`fb-btn fb-btn--${kind}`, className)} {...props}>
      {icon}
      {children}
    </button>
  );
}
