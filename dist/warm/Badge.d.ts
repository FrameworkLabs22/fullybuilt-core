import * as React from 'react';
import { Tone } from '../system/tone.js';

/**
 * State badge — a leading dot, then the label.
 *
 * The dot carries the state; the tinted background is support, not the signal.
 * That ordering matters twice over: a saturated dot reads at a glance in a dense
 * table where a pale fill does not, and the state survives for anyone who cannot
 * separate the tint from its neighbours.
 */
/** Legacy tone names, mapped onto the system's five-tone vocabulary. */
type BadgeTone = "neutral" | "danger" | "warn" | "ok" | "accent" | Tone;
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    tone?: BadgeTone;
    children: React.ReactNode;
}
declare function Badge({ tone, className, children, style, ...props }: BadgeProps): React.JSX.Element;

export { Badge, type BadgeTone };
