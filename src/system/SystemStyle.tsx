import * as React from "react";

/**
 * The design system's interaction stylesheet.
 *
 * Every hover, focus, active and animation state in the system lives here rather
 * than at the call site. Two reasons:
 *
 * 1. Inline styles cannot express `:hover` / `:focus-visible` / `@keyframes`, and
 *    much of the system is inline-styled so it renders identically regardless of
 *    the host app's Tailwind configuration.
 * 2. Interaction states are a system-level contract. One focus ring, one hover
 *    timing, one disabled treatment — defined once, so a control added next year
 *    cannot invent its own.
 *
 * Everything below resolves from CSS custom properties, so it themes per client
 * with no JavaScript. (The var() indirection that Recharts cannot handle — SVG
 * presentation attributes — does not apply here; this is real CSS.)
 *
 * Mount <SystemStyle /> ONCE per page that uses the system.
 */

const CSS = `
/* ── buttons — ranked by darkness, not by hue ──────────────────────────────
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

/* ── focus — ONE ring for the whole system ────────────────────────────────
   Accent 600 at 2px with a 1px offset. Never remove it; never redefine it
   locally. This is the only place the accent ramp is allowed to touch a
   control's outline.

   WHY 600 AND NOT 400: 400 is the stop the ramp was originally hand-tuned
   around, and it fails WCAG 1.4.11 non-text contrast on white for every
   tenant — 2.57 to 2.79 against a 3.0 minimum. 500 still fails for the teal
   palettes (2.95). 600 clears it everywhere (4.06 to 4.51) with room to
   spare, and is the darkest stop that still reads as the brand's color
   rather than as ink. A focus ring that only some keyboard users can see is
   not a focus ring. */
.fb-btn:focus-visible, .fb-tab:focus-visible, .fb-seg-btn:focus-visible,
.fb-add:focus-visible, .fb-sorth:focus-visible {
  outline:2px solid var(--accent-600); outline-offset:1px; }

/* ── inputs ──────────────────────────────────────────────────────────────── */
.fb-input { border:1px solid var(--warm-border); background:var(--warm-card); color:var(--warm-ink); border-radius:6px;
  transition: border-color .12s, box-shadow .12s; }
.fb-input:hover { border-color:var(--warm-border-strong); }
.fb-input:focus { outline:none; border-color:var(--accent-600); box-shadow:0 0 0 3px var(--accent-100); }
.fb-qty::-webkit-outer-spin-button, .fb-qty::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
.fb-qty { -moz-appearance:textfield; appearance:textfield; }
.fb-check { width:13px; height:13px; cursor:pointer; accent-color:var(--warm-primary); }

/* ── form fields ──────────────────────────────────────────────────────────
   The control shell is .fb-inp, a NEW class rather than sizing added to the
   .fb-input above it. This stylesheet renders in the body, so a padding
   declaration on .fb-input would beat the Tailwind padding utility that every
   existing call site already passes — same specificity, later in document order.
   A separate class leaves those call sites untouched.

   The label sits at the BODY tier (sub), not the faint tier that carries column
   labels and units. A field label is the control's name — the thing you read to
   know what you are typing into — and a form whose labels are all faint reads as
   a disabled form. The hint below it is genuinely secondary, so that one is faint.

   Invalid state is a border plus a message, never a border alone: a red outline
   with no text tells someone that something is wrong and not what. */
.fb-field { display:flex; flex-direction:column; gap:5px; }
.fb-label { font-size:12px; font-weight:600; line-height:16px; color:var(--warm-sub); }
.fb-label--req::after { content:"*"; margin-left:3px; color:var(--warm-danger); }
.fb-hint { font-size:11px; line-height:1.45; color:var(--warm-faint); }
.fb-hint--err { color:var(--warm-danger); }

/* .fb-inp carries only what a utility CANNOT express — the states. The BOX
   (width, padding, font-size) deliberately lives on the component as Tailwind
   classes instead, because this stylesheet is in the body and would beat any
   utility a call site passes for the same property. A control asked to be
   w-[180px] would have come out full-width, and the diff would have looked
   innocent. See "Traps that have already cost us". */
.fb-inp { border:1px solid var(--warm-border); background:var(--warm-card); color:var(--warm-ink);
  border-radius:6px; font-family:inherit; transition: border-color .12s, box-shadow .12s; }
.fb-inp::placeholder { color:var(--warm-faint); }
.fb-inp:hover:not(:disabled):not([aria-invalid="true"]) { border-color:var(--warm-border-strong); }
.fb-inp:focus { outline:none; border-color:var(--accent-600); box-shadow:0 0 0 3px var(--accent-100); }
.fb-inp:disabled { background:var(--warm-chip); color:var(--warm-faint); cursor:default; }
.fb-inp[aria-invalid="true"] { border-color:var(--warm-danger); }
.fb-inp[aria-invalid="true"]:focus { border-color:var(--warm-danger); box-shadow:0 0 0 3px var(--warm-danger-soft); }
textarea.fb-inp { resize:vertical; }
select.fb-inp { appearance:none; -webkit-appearance:none; cursor:pointer; }
/* The caret is a sibling element, not a background-image data URI: a data URI
   cannot read var(--warm-faint), so an inlined SVG would be the one neutral in
   the system that ignores a client's token overrides. */
.fb-selwrap { position:relative; display:block; }
.fb-selcaret { position:absolute; right:8px; top:50%; transform:translateY(-50%); pointer-events:none;
  display:flex; color:var(--warm-faint); }

/* ── checkbox, radio, switch ──────────────────────────────────────────────
   All three take their ON color from --warm-primary, not from the accent ramp.
   The ramp is interaction-only (rule 1) — it says "you are touching this", which
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

/* ── modal ────────────────────────────────────────────────────────────────
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

/* ── dropdowns ───────────────────────────────────────────────────────────── */
.fb-dd-trigger { cursor:pointer; font-weight:500; transition: border-color .12s; }
.fb-dd-trigger:hover { border-color:var(--warm-border-strong); }
.fb-dd-trigger:focus-visible { outline:2px solid var(--accent-600); outline-offset:1px; }
.fb-dd { animation:fb-tip-in .14s ease-out; }
.fb-dd-item { border:0; background:transparent; cursor:pointer; transition: background-color .1s; }
.fb-dd-item:hover { background:var(--warm-chip); }
.fb-dd-item:focus-visible { outline:2px solid var(--accent-600); outline-offset:-2px; }

/* ── tabs and segmented controls ────────────────────────────────────────
   Active state is a weight and a rule, not a colored fill — the tab bar sits
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

/* ── table rows and row-scoped affordances ───────────────────────────────
   The copy and remove buttons are invisible until their row is hovered or they
   take keyboard focus — present when wanted, silent otherwise. The :focus-visible
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

/* ── definitions and tooltips ────────────────────────────────────────────
   A dotted underline marks a term that has a definition — discoverable without
   an icon cluttering the label. The tip itself is dark-on-light: it is transient
   UI, and inverting it separates it from the page instead of competing with it. */
.fb-def { cursor:help; text-decoration:underline dotted var(--warm-faint); text-decoration-thickness:1px; text-underline-offset:3px; }
.fb-tipbox { position:fixed; z-index:70; width:max-content; max-width:260px; pointer-events:none;
  background:var(--warm-ink); color:var(--warm-border); border:1px solid color-mix(in srgb, var(--warm-ink) 82%, #FFFFFF); border-radius:8px; padding:8px 11px;
  font-size:12px; line-height:1.5; font-weight:400; letter-spacing:normal; text-transform:none; text-align:left;
  box-shadow:0 8px 24px rgba(16,18,24,0.22); }
.fb-tipin { animation:fb-tip-in .14s ease-out; }

/* ── toasts ──────────────────────────────────────────────────────────────── */
.fb-toaster { position:fixed; right:20px; bottom:20px; z-index:60; display:flex; flex-direction:column; gap:8px; }
.fb-toast { display:flex; align-items:flex-start; gap:9px; width:320px; max-width:calc(100vw - 40px);
  background:var(--warm-ink); border:1px solid color-mix(in srgb, var(--warm-ink) 82%, #FFFFFF); border-radius:8px; padding:10px 12px;
  box-shadow:0 8px 24px rgba(0,0,0,0.25); animation:fb-toast-in .18s ease-out; }
.fb-toast-title { font-size:12.5px; font-weight:600; line-height:1.375; color:var(--warm-bg); }
.fb-toast-sub { margin-top:2px; font-size:11px; line-height:1.375; color:color-mix(in srgb, var(--warm-bg) 68%, var(--warm-ink)); }
.fb-toast-x { flex-shrink:0; font-size:13px; line-height:1; background:transparent; border:0; cursor:pointer;
  color:color-mix(in srgb, var(--warm-bg) 48%, var(--warm-ink)); }
.fb-toast-x:hover { color:var(--warm-bg); }

/* ── sliders ─────────────────────────────────────────────────────────────── */
.fb-range { -webkit-appearance:none; appearance:none; height:4px; border-radius:2px; background:var(--warm-track); outline:none; cursor:pointer; }
.fb-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:16px; height:16px; border-radius:50%;
  background:var(--accent-500); border:2.5px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.25); cursor:grab; }
.fb-range::-moz-range-thumb { width:13px; height:13px; border-radius:50%;
  background:var(--accent-500); border:2.5px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.25); cursor:grab; }
.fb-range:focus-visible { outline:2px solid var(--accent-600); outline-offset:2px; }
.fb-tickslider { position:relative; }
.fb-tickslider:focus-within { outline:2px solid var(--accent-600); outline-offset:3px; border-radius:4px; }
.fb-tickslider input[type=range] { position:absolute; inset:0; width:100%; height:100%; opacity:0; cursor:ew-resize; margin:0; }

/* ── calendar ────────────────────────────────────────────────────────────── */
.fb-cal-day { border-radius:6px; transition: background-color .08s; cursor:pointer; }
.fb-cal-day:hover { background:var(--warm-chip); }

/* ── overlays ────────────────────────────────────────────────────────────── */
.fb-drawer { animation:fb-drawer-in .2s ease-out; }
.fb-scrim { animation:fb-fade-in .15s ease-out; }
.fb-chart-reveal { animation:fb-chart-reveal .5s ease-out both; }

@keyframes fb-tip-in { from { opacity:0; transform:translateY(3px); } }
@keyframes fb-modal-in { from { opacity:0; transform:translate(-50%,-48%) scale(.98); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
@keyframes fb-toast-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
@keyframes fb-drawer-in { from { transform:translateX(28px); opacity:0; } to { transform:none; opacity:1; } }
@keyframes fb-fade-in { from { opacity:0; } to { opacity:1; } }
@keyframes fb-chart-reveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

/* ── reduced motion ──────────────────────────────────────────────────────
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

/** Mount once per page that uses the design system. */
export function SystemStyle() {
  return <style>{CSS}</style>;
}
