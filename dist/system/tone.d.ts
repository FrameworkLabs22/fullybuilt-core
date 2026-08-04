/**
 * The system's state vocabulary. Five tones, each a foreground/background pair.
 *
 * `excess` exists because "too much" is a real state, not a neutral one — an
 * overstocked SKU is cash sitting still, and rendering it in the gray reserved
 * for missing data reads as "we don't know" rather than "this is a problem".
 */
type Tone = "pos" | "warn" | "neg" | "muted" | "excess";
/** Resolve a tone to its `{ fg, bg }` pair. A function, not a const map, so each
 *  read re-resolves the CSS vars — a const would freeze the first client's palette. */
declare function tone(t: Tone): {
    fg: string;
    bg: string;
};

export { type Tone, tone };
