# The Fully Built design system

The rules every dashboard follows. They originated in the Osmo Planning module,
which was built against a prototype and kept its own styling so it could match it
exactly; as of core v0.3.0 they are the system for every client dashboard and for
the team hub.

If you are adding a surface, read the six rules. If you are adding a *component*,
read them and then put it in `src/system/` — not in the app.

---

## 1. Two color layers, and only two

**Layer 1 — the neutral foundation.** Surfaces, borders, the text triad. Shared by
every client. This is what a page is made of.

**Layer 2 — one functional accent.** A 10-step ramp in the client's brand hue,
reserved for interaction affordances: focus rings, input focus glow, slider
thumbs. That is the entire list.

The accent never paints a surface and never becomes a chart series. An accent that
shows up as decoration stops reading as *this is the thing you are touching*,
which is the only job it has.

The ramp is generated, not hand-authored — `makeAccentRamp(brandHex)`. Only the
**hue** comes from the brand: lightness and chroma follow fixed curves so a focus
ring carries identical weight on every tenant. Scaling chroma to each brand's own
saturation would make a muted brand's focus ring invisible and a vivid brand's
shout. Brand identity proper lives in `primary`, the surfaces and the chart
series.

**Focus rings use stop 600.** Not 400, which is the stop the ramp was originally
tuned around: on white it lands between 2.57 and 2.79 against a 3.0 WCAG non-text
minimum, for every tenant. 500 still fails the teal palettes. 600 clears it
everywhere (4.06–4.51) and is the darkest stop that still reads as the brand's
color rather than as ink.

A brand whose accent should not derive from `primary` — Untoxicated's primary is a
near-black while its actual brand color is yellow — can pin `--accent-*` directly
in its `branding` block; explicit values always beat the derived ones.

## 2. Edges define, dividers whisper

A card is defined by its **edge**, not by a shadow.

| | Token | Use |
|---|---|---|
| Card outer edge | `borderStrong` `#D8DBE1` | Makes the card a distinct object |
| Divider inside a card | `border` `#E7E9EE` | Organizes without carving it up |

Shadows are for things that genuinely float — drawers, popovers. On a dashboard
that is almost nothing. A page of shadowed cards reads as clutter, and once
everything has depth, depth stops meaning anything.

`<Card>` defaults to flat. `elevation="raised"` is the deliberate exception.

## 3. The text triad has three real steps

| Tier | Token | Use |
|---|---|---|
| `ink` `#1C1E24` | headings, values | |
| `sub` `#3E424A` | body, table text | |
| `faint` `#6E727B` | labels, subtext, units | |

The body tier is deliberately dark. A mid-gray body reads as *disabled* next to a
near-black heading. The faintest tier stops well short of invisible because it
carries units, timestamps and column labels — things people actually need.

## 4. Rank by darkness, not by hue

Buttons: **primary** (ink) > **secondary** (muted fill) > **ghost** (bare text),
plus **danger** as an outlined destructive confirm.

Darkness survives rebranding. It reads correctly whether the tenant's primary is
navy, near-black or red. A hue-coded hierarchy ("blue means primary") collapses
the moment a client's brand color *is* the warning color.

## 5. State is carried by a mark, not by a tint

`<Badge>` leads with a saturated dot; the tinted background is support. A dot
reads at a glance in a dense table where a pale fill does not, and the state
survives for anyone who cannot separate the tint from its neighbours.

Five tones: `pos`, `warn`, `neg`, `muted`, `excess`. `excess` exists because *too
much* is a real state — an overstocked SKU is cash sitting still, and rendering it
in the gray reserved for missing data reads as "we don't know" rather than "this
is a problem".

Provenance is **not** urgency: `<MockTag>` is deliberately gray and dashed.
Borrowing an urgency color to mean "we made this number up" trains people to
discount the colors that matter.

## 6. Loading shows blocks, never zeros

A `0` in a KPI slot reads as data. The user believes they sold nothing and finds
out otherwise a second later. Use `<Skel>` / `<ChartSkel>`, sized to the content
they stand in for so nothing reflows when data lands. Solid fill and an opacity
pulse — no gradient shimmer.

---

## Motion

Transitions are 0.1–0.2s. Every animation in the system is listed in the reduced-
motion block of `SystemStyle.tsx` and is removed outright when the OS asks —
motion here is decoration on top of states that already read without it, so
shortening it would be a worse answer than dropping it.

Two specifics worth knowing:

- **Segments lift, they don't slide.** A sliding pill animates the control rather
  than the change it causes; on a filter that re-renders a table underneath, the
  eye follows the pill instead of the data that just moved.
- **`TIP` disables Recharts' tooltip easing.** The 400ms default makes the tip
  rubber-band behind the cursor on a dense axis.

## The three page-level layers

Mount **once at the app root** — not in the dashboard layout, or login and every
other surface outside the shell comes out unstyled:

```tsx
<SystemStyle />   {/* every hover/focus/animation state */}
<Toaster />       {/* toast(title, { tone, sub }) from anywhere */}
<TipLayer />      {/* tooltips for any [data-tip] element */}
```

`SystemStyle` exists because inline styles cannot express `:hover`,
`:focus-visible` or `@keyframes`, and because interaction states are a system
contract: one focus ring, one hover timing, one disabled treatment, defined once
so a control added next year cannot invent its own.

`TipLayer` uses one delegated listener and renders `position: fixed`, so an
`overflow-x-auto` table wrapper cannot clip a tooltip — the failure that makes
per-element tooltips useless inside data grids. Anything can carry a tip with
`data-tip="…"`; no import needed. Use `<Def>` when the tip defines a term.

Toasts are for confirming a **blocking write** (place / receive / save, where the
list behind a busy button gives no feedback) and for failures. Not for narrating
what the user can already see.

## Tokens

Everything resolves from CSS custom properties, so it themes per client with no
JavaScript. `WARM` and `ACCENT` read those same variables from JS for the places
that need a literal — Recharts passes colors as SVG presentation attributes, where
`var()` does not resolve.

Two consequences worth remembering:

- **Never snapshot a token at module scope.** `const x = { fill: WARM.sub }` at
  the top of a file resolves once, before the stylesheet is applied, and pins that
  value forever. Use a getter (see `axisTick` in `theme.ts`).
- **Call `resetWarmCache()` after injecting a new client's tokens**, or the first
  client's palette stays cached and charts never re-theme.

Per-client overrides hold **deltas only**. Copying the full neutral set into a
client's `branding` block freezes that client on today's values while every other
dashboard moves — which is exactly what had happened to Untoxicated.

## Spacing

12px card rhythm (`section`, `gutter`); 24px content-card padding; 16px KPI-tile
padding. `SPACE` in `warm/spacing.ts` mirrors the Tailwind tokens for the props
that take JS numbers.
