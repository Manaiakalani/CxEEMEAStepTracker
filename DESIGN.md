---
name: Alpine Editorial
description: >
  An editorial, Munich-themed product surface for a small-team step
  tracker. Calm Bavarian-blue brand voice, generous whitespace,
  hairline rules instead of heavy shadows, and two carefully-rationed
  warm/cool accents (Alpenglow + Meadow) that signal completion and
  progress. Light by default, full dark theme available.
colors:
  brand:
    bayern: "#1761A0"
    bayern-deep: "#114F84"
    bayern-soft: "#E8F0F8"
  ink:
    ink: "#0B1620"
    muted: "#6B7785"
    hairline: "#E5E9EE"
  surface:
    canvas: "#FFFFFF"
    raised: "#FFFFFF"
    hover: "#F5F5F4"
    translucent: "rgba(255, 255, 255, 0.9)"
    translucent-soft: "rgba(255, 255, 255, 0.7)"
  hero:
    stop-1: "#F4F8FC"
    stop-2: "#FBFCFD"
    stop-3: "#FFFFFF"
    glow: "rgba(224, 138, 74, 0.10)"
  accent:
    alpenglow: "#E08A4A"
    alpenglow-soft: "#FDEEDE"
    meadow: "#6B9E78"
    meadow-soft: "#E7F1E9"
  semantic:
    success: "#2E7D5A"
    warn: "#C97A1A"
    bar-rest: "#9FB6CC"
  medal:
    gold: "#C8A548"
    gold-soft: "#F7EECF"
    silver: "#8A96A3"
    silver-soft: "#ECF0F4"
    bronze: "#A87148"
    bronze-soft: "#F3E3D4"
  dark:
    bayern: "#5BA3DB"
    bayern-deep: "#3E86BD"
    bayern-soft: "#14304A"
    ink: "#F1F5FA"
    muted: "#8FA1B5"
    hairline: "#1F3142"
    canvas: "#08111A"
    raised: "#11202D"
    hover: "#18293A"
    hero-stop-1: "#0E1A26"
    hero-stop-2: "#0B1620"
    hero-stop-3: "#08111A"
    hero-glow: "rgba(240, 165, 114, 0.07)"
    success: "#58C29A"
    warn: "#E0A55C"
    alpenglow: "#F0A572"
    meadow: "#8CC09A"
    gold: "#E0C478"
    silver: "#B1BCC8"
    bronze: "#D09269"
typography:
  font-family:
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif'
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
  weights:
    regular: "400"
    medium: "500"
    semibold: "600"
  display-xl:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: "600"
    lineHeight: "1.0"
    letterSpacing: -0.02em
    usage: "Top Stomp aggregate counter"
  display-lg:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: "600"
    lineHeight: "1.05"
    letterSpacing: -0.02em
    usage: "Hero greeting (sm and up)"
  display-md:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: "600"
    lineHeight: "1.05"
    letterSpacing: -0.015em
    usage: "Page H1 (sm and up)"
  display-sm:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: "600"
    lineHeight: "1.05"
    letterSpacing: -0.015em
    usage: "Hero greeting (mobile)"
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.05"
    letterSpacing: -0.015em
    usage: "Page H1 (mobile)"
  numeric-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "500"
    lineHeight: "1.1"
    letterSpacing: -0.01em
    fontVariantNumeric: tabular-nums
    usage: "Quick-entry input field"
  title:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: -0.01em
    usage: "Section H2 in editorial layouts"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "500"
    lineHeight: "1.4"
    usage: "Profile form inputs"
  prose:
    fontFamily: Inter
    fontSize: 14.5px
    fontWeight: "400"
    lineHeight: "1.65"
    usage: "About-page long-form copy"
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "400"
    lineHeight: "1.5"
    usage: "Subtitles and supporting paragraphs"
  ui:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: -0.005em
    usage: "Nav labels, table cells, primary buttons"
  caption:
    fontFamily: Inter
    fontSize: 12.5px
    fontWeight: "500"
    lineHeight: "1.4"
    usage: "Pills, chips, secondary chrome"
  micro:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.4"
    usage: "Footer text, fine print"
  eyebrow:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.18em
    textTransform: uppercase
    usage: "Section eyebrow above every H1/H2"
  eyebrow-tight:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "500"
    lineHeight: "1.3"
    letterSpacing: 0.16em
    textTransform: uppercase
    usage: "Form-field labels, micro-eyebrows"
spacing:
  unit: 4px
  scale:
    "0.5": 2px
    "1": 4px
    "1.5": 6px
    "2": 8px
    "2.5": 10px
    "3": 12px
    "4": 16px
    "5": 20px
    "6": 24px
    "8": 32px
    "10": 40px
    "12": 48px
    "16": 64px
  layout:
    container-max: 1200px
    container-padding-mobile: 24px
    container-padding-desktop: 40px
    section-py-mobile: 48px
    section-py-desktop: 56px
    column-gap-mobile: 24px
    column-gap-desktop: 48px
  grid:
    columns: 12
    gutter-mobile: 24px
    gutter-desktop: 40px
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
  brand-tile: "8px"
  glyph-tile: "8px"
elevation:
  none: "none"
  hairline: "inset 0 0 0 1px var(--color-hairline)"
  brand-tile: "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(17,79,132,0.35)"
  card: "0 1px 0 rgba(11,22,32,0.04)"
  modal: "0 24px 48px -12px rgba(11,22,32,0.18), 0 8px 16px -8px rgba(11,22,32,0.10)"
borders:
  hairline: "1px solid var(--color-hairline)"
  hairline-bottom: "border-bottom: 1px solid var(--color-hairline)"
  brand-ring: "2px solid var(--color-bayern)"
  focus-ring:
    width: "2px"
    color: "var(--color-bayern)"
    offset: "0px"
    style: "solid"
motion:
  durations:
    snap: 150ms
    base: 200ms
    soft: 250ms
  easings:
    standard: "cubic-bezier(0.4, 0, 0.2, 1)"
    out: "cubic-bezier(0, 0, 0.2, 1)"
    in-out: "cubic-bezier(0.4, 0, 0.2, 1)"
  transitions:
    color: "color 200ms ease"
    surface: "background-color 150ms ease"
    theme: "background-color 200ms ease, color 200ms ease"
    glyph-lift: "transform 200ms cubic-bezier(0, 0, 0.2, 1)"
  hover:
    glyph-translate-y: "-1px"
  reduced-motion: "Honoured: animations and transitions collapse to 0.01ms when prefers-reduced-motion: reduce."
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
icons:
  family: "lucide-react"
  weight: "1.5px stroke (1.75px on accented chips and section eyebrows)"
  sizes:
    xs: 12px
    sm: 14px
    md: 16px
    lg: 20px
components:
  top-nav:
    backgroundColor: "{colors.surface.translucent}"
    backdropFilter: "blur(8px)"
    borderBottom: "{borders.hairline}"
    height: 56px
    position: "sticky top-0 z-20"
    safeArea: "padding-left/right via env(safe-area-inset-*)"
  brand-tile:
    width: 28px
    height: 28px
    rounded: "{rounded.md}"
    background: "linear-gradient(160deg, #1F75B8 0%, #114F84 100%)"
    shadow: "{elevation.brand-tile}"
    glyph: "Inline Alpine ridge SVG (white snow + Alpenglow tint)"
    hoverTransform: "translateY(-1px)"
    motionSafe: true
  pill-meadow:
    height: 28px
    paddingX: 12px
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.accent.meadow-soft}"
    textColor: "{colors.accent.meadow}"
    typography: "{typography.caption}"
    iconSize: "{icons.sizes.sm}"
    usage: "Date / event chips. 'Progress' semantics."
  pill-alpenglow:
    height: 28px
    paddingX: 12px
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.accent.alpenglow-soft}"
    textColor: "{colors.accent.alpenglow}"
    typography: "{typography.caption}"
    iconSize: "{icons.sizes.sm}"
    usage: "Place / completion chips. 'Celebration' semantics."
  pill-bayern:
    height: 28px
    paddingX: 12px
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.brand.bayern-soft}"
    textColor: "{colors.brand.bayern}"
    typography: "{typography.caption}"
    usage: "Inline brand tags, code-style highlights."
  pill-status:
    height: 36px
    paddingX: 12px
    rounded: "{rounded.pill}"
    border: "{borders.hairline}"
    backgroundColor: "{colors.surface.translucent-soft}"
    textColor: "{colors.ink.ink}"
    secondaryTextColor: "{colors.ink.muted}"
    iconSize: "{icons.sizes.md}"
    iconStrokeWidth: "1.5px"
    usage: "Hero weather chip and Profile cloud-sync indicator."
  hero:
    background:
      base: "linear-gradient(180deg, {colors.hero.stop-1} 0%, {colors.hero.stop-2} 70%, {colors.hero.stop-3} 100%)"
      glow: "radial-gradient(60rem 28rem at 88% -10%, {colors.hero.glow} 0%, transparent 65%)"
      decoration: "Mountain silhouette SVG, fixed to bottom edge, hairline-light"
    paddingTop:
      mobile: 48px
      desktop: 64px
    paddingBottom:
      mobile: 80px
      desktop: 96px
    layout: "Two-column flex; greeting + date eyebrow on the left, status pills on the right; stacks below sm."
  section:
    paddingY:
      mobile: 48px
      desktop: 56px
    borderBottom: "{borders.hairline}"
    grid: "12-col with col-span 12 / md:4 (label) + col-span 12 / md:8 (body)"
    eyebrow: "{typography.eyebrow}"
    contentVisibility: "auto on the About long-read sections (contain-intrinsic-size: 1px 600px)"
  card-quiet:
    backgroundColor: "{colors.surface.raised}"
    border: "{borders.hairline}"
    rounded: "{rounded.md}"
    padding: 20px
    shadow: "{elevation.card}"
  button-primary:
    backgroundColor: "{colors.brand.bayern}"
    textColor: "#FFFFFF"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: 44px
    paddingX: 20px
    focusRing: "{borders.focus-ring}"
    touchAction: "manipulation"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink.ink}"
    border: "{borders.hairline}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: 44px
    paddingX: 20px
    hoverBackground: "{colors.surface.hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink.muted}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: 44px
    paddingX: 12px
    hoverBackground: "{colors.surface.hover}"
  input-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink.ink}"
    typography: "{typography.body-lg}"
    borderBottom: "1px solid {colors.ink.hairline}"
    borderBottomFocus: "2px solid {colors.brand.bayern}"
    height: 48px
    minFontSize: "16px (anti-iOS-zoom guarantee)"
  input-numeric:
    backgroundColor: "transparent"
    textColor: "{colors.ink.ink}"
    typography: "{typography.numeric-xl}"
    fontVariantNumeric: "tabular-nums"
    borderBottom: "1px solid {colors.ink.hairline}"
    inputMode: "numeric"
    placeholder: "0"
  modal-sheet:
    desktop:
      maxWidth: 480px
      rounded: "{rounded.lg}"
      shadow: "{elevation.modal}"
      anchor: "viewport center"
    mobile:
      anchor: "viewport bottom (sheet)"
      rounded: "16px 16px 0 0"
      maxHeight: "92vh"
      overscrollBehavior: "contain"
    backdropColor: "rgba(11, 22, 32, 0.55)"
  bar-progress:
    trackColor: "{colors.semantic.bar-rest}"
    fillColor: "{colors.brand.bayern}"
    height: 6px
    rounded: "{rounded.pill}"
  ring-progress:
    trackColor: "{colors.ink.hairline}"
    fillColor: "{colors.brand.bayern}"
    fillCompleteColor: "{colors.accent.meadow}"
    strokeWidth: 8px
    capStyle: "round"
  leaderboard-row:
    paddingY: 14px
    borderBottom: "{borders.hairline}"
    rankColor: "{colors.ink.muted}"
    rankColorTop3: "{colors.medal.gold | silver | bronze}"
    nameTypography: "{typography.ui}"
    stepsTypography: "{typography.ui} with tabular-nums"
    youHighlightBackground: "{colors.brand.bayern-soft}"
    youHighlightTextColor: "{colors.brand.bayern}"
  podium-tile:
    rounded: "{rounded.md}"
    paddingX: 16px
    paddingY: 12px
    backgroundColors: "{colors.medal.[gold|silver|bronze]-soft}"
    labelColors: "{colors.medal.[gold|silver|bronze]}"
  footer:
    paddingY: 40px
    borderTop: "{borders.hairline}"
    typography: "{typography.micro}"
    textColor: "{colors.ink.muted}"
    bullets:
      "1": "{colors.accent.meadow}"
      "2": "{colors.accent.alpenglow}"
    safeArea: "padding-bottom via env(safe-area-inset-bottom)"
accessibility:
  contrast: "All ink-on-surface and brand-on-soft pairings clear AA at body sizes; eyebrow + caption sizes meet AA Large."
  focus: "Keyboard focus uses a 2px Bayern ring (focus-visible only); tap-highlight is suppressed and replaced by the same ring."
  motion: "All transforms and transitions collapse to 0.01ms under prefers-reduced-motion: reduce."
  touch-target: "Interactive elements minimum 44x44 (top-nav buttons h-11; primary buttons h-11)."
  ios: "viewport-fit=cover; safe-area insets on body; input font-size floor 16px to prevent focus-zoom."
---

## Brand & voice

This is the visual identity of a small, internal step-tracker built for a
team offsite in Munich. The brief is "Bavarian alpine, but editorial" —
calm, confident, sparing, and grown-up. Nothing here shouts. Color is
rationed; the page does most of its work with whitespace, hairlines, and
restraint, letting two warm/cool accents and a single brand blue carry
the personality.

The product feels like a well-made print magazine that happens to live
in a browser: a generous hero spread, a 12-column editorial body, and
quiet section breaks instead of cards-everywhere. The reader's eye
should always know where to land first.

## Color

The system has one primary brand colour and four supporting palettes,
each with a deliberate role. Saturation is held back across the board.

**Bayern Blue** (`#1761A0`) is the brand. It carries every primary
action, every progress fill, every link, and the brand mark itself. Its
deep variant (`#114F84`) is reserved for gradient endpoints on the
brand mark; the soft variant (`#E8F0F8`) backs inline tags and
code-style chips. In dark mode it shifts up to `#5BA3DB` so the same
semantic role still has the contrast it needs.

**Ink and hairlines** are the page's neutrals. Ink (`#0B1620`) is a
near-black with a faint blue cast — never pure `#000`. Muted
(`#6B7785`) handles secondary text, eyebrows, and meta. Hairlines
(`#E5E9EE`) replace shadows almost everywhere; a single 1px line is
the dominant divider in the system. In dark mode the hairline is
`#1F3142` and the canvas is a deep navy (`#08111A`) — the alpine
twilight, not pure black.

**Two accents are rationed for meaning**, not decoration:

- **Alpenglow** (`#E08A4A`) — warm sunrise on peaks. Reserved for
  *celebration / completion / place* semantics: a podium-tile chip,
  the "Microsoft München" location pill, the radial glow that
  warms the hero's top-right corner.
- **Meadow** (`#6B9E78`) — cool alpine green. Reserved for *progress
  / time / calm* semantics: the date chip, the success state, the
  first decorative dot in the footer rule.

The two are intentionally complementary and intentionally never
appear together at full saturation in the same component — they
trade off across page regions to give the eye somewhere to travel.

**Medal hues** (gold / silver / bronze) appear *only* on the top three
leaderboard rows and the Top Stomp podium tiles. They are
desaturated (gold `#C8A548`, not `#FFD700`) so they read as editorial
trophy marks rather than novelty stickers.

**Surface white is true white** (`#FFFFFF`) in light mode. Cards and
modals use the same surface colour as the canvas — depth is
hairlines, not shadow. The only systemic use of translucency is the
sticky top-nav, which sits over the hero glow at 90% opacity with an
8px backdrop blur so the gradient bleeds through gently when you
scroll.

## Typography

**Inter**, three weights only: 400 / 500 / 600. There is no 700 — the
type system tops out at semibold and uses size, leading, and tracking
to do the rest. This keeps the page feeling considered rather than
loud.

The hierarchy is deliberately wide so editorial pages have a clear
spine:

- **Display** sizes (36 / 40 / 44 / 56 px) are tight: line-height
  1.0 – 1.05, letter-spacing -0.015 to -0.02 em, semibold. They're
  used sparingly — one display size per screen.
- **Numeric display** uses `font-variant-numeric: tabular-nums` so
  step counts don't shimmer as digits change.
- **Body prose** is set at 14.5 px / 1.65 — a comfortable reading
  measure for the long-form About page; subtitles step up to 15 px
  with shorter line-height because they're rarely more than two
  lines.
- **Eyebrows** are the system's most recognizable type marker:
  uppercase, 12 px, weight 500, letter-spacing 0.18em, muted ink.
  Every section has one, and it's always 12 px above the H1/H2 it
  introduces — that vertical rhythm is part of the brand.
- **UI** type is 13 px / weight 500 with a faint -0.005em tracking;
  used for nav labels, primary buttons, and table cells.

Inputs default to a 16 px floor regardless of intent, to prevent iOS
Safari from auto-zooming on focus.

## Layout & rhythm

Every page sits in a 1200 px max-width container with 24 px gutters on
mobile and 40 px on desktop. Within the container, content is laid
out on a 12-column grid. Editorial sections (About, Profile, the
hero) consistently use a `4 + 8` split: a label/eyebrow column on
the left, a content column on the right — the same shape as a
print sidebar.

Vertical rhythm is governed by section padding (`48 px` mobile, `56 px`
desktop) and a single hairline between sections. There are no card
walls between sections; the page reads top-to-bottom like a long
column of magazine spreads. The result is that long pages feel
unhurried and short pages feel generous.

The hero is the one place where the page breaks discipline — it's
allowed to be quietly cinematic. A three-stop vertical gradient
(near-white → white) provides a soft canvas; on top, a large radial
Alpenglow glow anchored to the top-right tints the corner without
ever lighting up the type behind it. A subtle mountain-silhouette
SVG sits flush to the bottom edge as a horizon line. The whole
thing is a layered watercolour, never a hero "image".

## Shape

Corners are restrained. The system's vocabulary is:

- **`rounded-md` (8 px)** — the default for cards, buttons, and the
  brand tile. The "house" radius.
- **`rounded-pill` (full)** — chips, status indicators, progress
  bars. Pills always read as "metadata" — never primary actions.
- **`rounded-lg` (12 px)** — modals and the onboarding sheet only.
- **No `rounded-xl` or larger.** Soft, but not toy-like.

The brand mark itself follows the same vocabulary: a 28×28 `rounded-md`
tile with a Bayern-blue gradient and an inline white-snow Alpine
ridge. The same shape language repeats in the favicon, the OG
image, and the maskable PWA icon, so the system feels coherent
across operating-system surfaces.

## Elevation & depth

Depth in this system is built from hairlines, not shadow. The
hierarchy is:

1. **Canvas** — the page itself, plain `surface` color.
2. **Hairline-bounded surface** — sections, leaderboard rows, cards.
   No background change, just a 1 px hairline rule.
3. **Soft-tinted surface** — pills and chips, with `*-soft` color
   tokens (~10–12% saturation tints of the parent accent).
4. **Inset-glow surface** — the brand tile only. A 1 px inner
   highlight at the top edge plus a small Bayern-deep drop shadow
   gives it the look of an enamel pin.
5. **Modal / sheet** — the only place the system uses a real outer
   shadow. A two-stop shadow (`0 24px 48px / 0 8px 16px`) on a
   12 px-radius surface, with a `rgba(11,22,32,0.55)` scrim behind.

That's the whole stack. Nothing else casts a shadow.

## Motion

Motion is purposeful and short. The system uses three durations
(150 / 200 / 250 ms) and a single easing family (`cubic-bezier(0.4, 0,
0.2, 1)` for both directions, with the "out" curve `(0, 0, 0.2, 1)`
for entrances).

The few places motion appears:

- **Theme toggle** — body color and background cross-fade over 200 ms.
- **Hover on the brand tile** — translates up 1 px over 200 ms with
  the "out" curve. A small physical lift, not a bounce.
- **Brand glyph pan** — on hover/focus, the snowy ridge inside the
  brand tile pans horizontally on a seamless 6 s linear loop (two
  ridge copies tiled at 28 px so it never seams). A second motion
  axis on the same hit-target as the lift, separating "you can click
  this" from "this is decorative".
- **Hero parallax** — two ridge layers in the mountain silhouette
  ease in opposing directions (back ~+18 px / front ~−10 px) as the
  pointer moves across the hero. On touch (no fine pointer) the same
  layers drift continuously on a slow ~14 s sine wave. Transform-only,
  written via CSS custom properties so React doesn't re-render.
- **Hover surfaces** — buttons, list rows, and ghost actions tint
  to `surface-hover` over 150 ms. Color only, no transform.
- **Modal entrance** — the desktop dialog fades in; the mobile bottom
  sheet slides up from the edge. (Both via Tailwind defaults inside
  the system.)

Everything else is static. The whole site collapses motion to 0.01 ms
under `prefers-reduced-motion: reduce`.

## Iconography

Lucide line icons throughout, drawn at **1.75 px stroke** (slightly
heavier than the previous 1.5 to read crisp at 16 px on retina).
Icons appear at four sizes — 12 / 14 / 16 / 20 px. They inherit
color from their parent text or pill in most places, with one
deliberate exception: the four **primary tab icons** in the top
nav each carry a brand-family tint to give the chrome quick visual
landmarks — Dashboard = Bayern blue, Leaderboard = Gold, Profile =
Meadow green, About = Alpenglow. The active underline beneath each
tab mirrors that same colour. The colour is paired with the label
(visible from `sm` up) so it's never the only signal.

The brand glyph (top-nav and favicon) is the system's only
custom-drawn mark: a three-peak Alpine ridge in white snow with a
single Alpenglow-tinted face on the tallest peak. It's the visual
shorthand for the whole identity.

## Components in summary

The vocabulary is small on purpose:

- **Top nav** — sticky, translucent, hairline-bottom; brand tile +
  short label; 4 tab icons; theme toggle.
- **Hero** — once per page that has it, layered watercolour gradient
  with mountain silhouette and rationed status pills.
- **Section** — eyebrow + H1/H2 in the left column, body in the
  right column, hairline at the bottom. That's the whole grammar
  of the editorial pages.
- **Pills** — tinted (Meadow / Alpenglow / Bayern) for metadata,
  hairline-bordered with a leading icon for live status.
- **Leaderboard rows** — hairline-divided, tabular-nums for steps,
  medal-color rank only on top 3, soft Bayern background for the
  current user's row.
- **Buttons** — primary (Bayern fill), secondary (hairline + text),
  ghost (text only with hover tint). All 44 px tall to satisfy
  touch-target minimums on mobile.
- **Inputs** — borderless except for a single bottom hairline that
  thickens to a 2 px Bayern rule on focus. Minimum 16 px font.
- **Modal** — centered card on desktop; bottom sheet on mobile. The
  one place the system uses real shadow.

## Accessibility

The system targets WCAG AA across all body and UI text. The Bayern
brand colour was chosen specifically so it passes against both light
and dark canvases without needing a different "on dark" variant
beyond the dark-theme token swap.

Keyboard navigation uses a 2 px Bayern focus ring (`:focus-visible`
only — never on mouse-driven focus). Tap highlights on touch devices
are suppressed in favour of the same ring. Touch targets are at
least 44×44 throughout the chrome.

The whole system collapses motion to near-zero under
`prefers-reduced-motion: reduce`, including the brand-tile lift and
the theme-toggle fade.

## Light & dark

Both themes are first-class. The light theme is the default and is
the canonical "magazine spread" feel — bright canvas, deep ink,
soft accents. The dark theme is an alpine twilight: a deep navy
canvas (`#08111A`), brighter Bayern (`#5BA3DB`) for accessibility
contrast, and a slightly warmer Alpenglow (`#F0A572`) so the
sunrise-on-peaks metaphor still reads at low light. All accent
soft-fills invert from pale tints to deep tints (`#E7F1E9` →
`#1C2E22`), keeping the same role-pairings intact across modes.

Theme switching is instant and animated only at the body level
(200 ms colour cross-fade). All component tokens resolve through
the same CSS variable system, so a theme change never reflows
the layout.
