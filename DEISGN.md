---
name: Macchina Gialla UI
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#393939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#d0c6ab"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#999077"
  outline-variant: "#4d4632"
  surface-tint: "#e9c400"
  primary: "#fff5dc"
  on-primary: "#3a3000"
  primary-container: "#ffd600"
  on-primary-container: "#705d00"
  inverse-primary: "#705d00"
  secondary: "#b9c8de"
  on-secondary: "#233143"
  secondary-container: "#39485a"
  on-secondary-container: "#a7b6cc"
  tertiary: "#fff2f1"
  on-tertiary: "#68000a"
  tertiary-container: "#ffcdc9"
  on-tertiary-container: "#b91a24"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffe170"
  primary-fixed-dim: "#e9c400"
  on-primary-fixed: "#221b00"
  on-primary-fixed-variant: "#544600"
  secondary-fixed: "#d4e4fa"
  secondary-fixed-dim: "#b9c8de"
  on-secondary-fixed: "#0d1c2d"
  on-secondary-fixed-variant: "#39485a"
  tertiary-fixed: "#ffdad7"
  tertiary-fixed-dim: "#ffb3ad"
  on-tertiary-fixed: "#410004"
  on-tertiary-fixed-variant: "#930013"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-score:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: "700"
    lineHeight: 64px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Chivo
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Chivo
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-telemetry:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: "700"
    lineHeight: 16px
    letterSpacing: 0.1em
  label-action:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: "700"
    lineHeight: 18px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system channels high-stakes automotive instrumentation and sleek track-day competition. Built for fast-paced, real-time multiplayer spotting ("Yellow Car"), the aesthetic merges modern luxury cockpit telemetry with a tactile, mechanical presence. It targets teens and adults seeking an elevated, hyper-competitive version of the classic road trip tradition.

The visual direction uses a hybrid **Tactile Skeuo-Modern & High-Performance Motorsport** style:

- **Cockpit Physicality:** Heavy, bevel-edged pressable triggers, tactile cards with milled surfaces, and physical dashboard instrumentation.
- **Aggressive Contrast:** High-voltage hazard yellow cut violently across dark asphalt and carbon textures, designed for instantaneous glanceability under direct sunlight.
- **Zero-Latency Feel:** Decisive, mechanical button depressions, micro-haptic visual feedback, and track-inspired telemetry.

## Colors

The palette balances light absorption with acute optical visibility:

- **Primary (`#FFD600`):** Electric Taxi / Hazard Yellow. Reserved strictly for primary action states, real-time car claims, active streaks, and top-tier leaderboards. High-luminance punch ensures legibility in glare.
- **Secondary (`#94A3B8`):** Matte Slate. Used for mechanical telemetry, inactive state markers, track data, and secondary UI metadata.
- **Tertiary (`#EF4444`):** Track Penalty Crimson. Used for false spots, penalties, speed traps, and point deductions.
- **Neutral Base Surfaces (`#121212`, `#18181B`, `#1E1E24`):** Multi-tiered asphalt substrate. `#121212` anchors the viewport floor, `#18181B` forms structural chassis modules, and `#1E1E24` sits on the upper functional layer.
- **Mechanical Borders (`#27272A`):** Low-glare machined edge treatment defining panels and boundaries without visual noise.

## Typography

Typography is split between technical performance display and high-velocity legibility:

- **Space Grotesk:** Drives all telemetry readouts, lap splits, scores, and tactical headers. Its mechanical terminals evoke industrial instrumentation. Numeral glyphs maintain tabular alignment for fluctuating real-time scores.
- **Chivo:** Delivers balanced, legible body copy for game feeds, challenge logs, and driver settings under high-vibration conditions.
- **Styling Rules:** All score counters, lap times, and telemetry labels must be rendered in full uppercase with precise letter-spacing to replicate etched physical plates.

## Layout & Spacing

Designed mobile-first around thumb-reach ergonomics during dynamic motion:

- **Viewport Constraints:** Centered single-column layout strictly constrained to a 430px maximum width on mobile screens, anchoring interactions to bottom-dominant zones.
- **Tactical Grid:** Fluid 4-column layout with `1rem` gutters and margins to maximize usable touch target area.
- **Hit Zones:** Primary hit targets (such as the main "Spot" trigger) span full grid widths with vertical clearances exceeding 64px to eliminate missed inputs.

## Elevation & Depth

Elevation is constructed through physical material stacking rather than ambient floating layers:

- **Level 0 (Asphalt Floor):** `#121212` matte surface.
- **Level 1 (Chassis Paneling):** `#18181B` surface layered with a 1px solid perimeter of `#27272A`. Inset mechanical shadows (`inset 0 1px 1px rgba(255, 255, 255, 0.05)`) provide subtle chamfered edges.
- **Level 2 (Tactile Cards):** `#1E1E24` raised panels using crisp double-drop shadows: `0 4px 0 #09090B, 0 10px 20px rgba(0,0,0,0.6)` to simulate molded dashboard fixtures.
- **Active Trigger Elevation:** Primary push-buttons feature a physical bottom shelf (`box-shadow: 0 6px 0 #B29500`). When pressed, the element translates down by `4px` to provide immediate physical closure.

## Shapes

Geometry takes inspiration from machined performance parts—neither razor-sharp nor toy-like:

- **Radius Tokens:** Base elements use `0.5rem` (8px). Chassis modules, telemetry displays, and tactile cards utilize `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px) for prominent dashboard housings.
- **Physical Chamfers:** Subtle internal bevels and defined outer borders prevent shapes from bleeding into the dark asphalt base.

## Components

### Primary Spot Trigger

- **Visuals:** Massive `#FFD600` block button with `#121212` uppercase bold typography (`label-action`).
- **Physicality:** Deep 6px extruded bottom shelf (`#C8A700`). In active states, transforms by `translateY(4px)` with reduction of shadow to 2px, providing definitive mechanical feedback.
- **Haptics:** Full-width thumb target positioned in the lower third of the mobile screen.

### Telemetry Cards & Scoreboards

- **Visuals:** Matte surface `#18181B`, bounded by 1px `#27272A` borders. Contains sub-panels in `#1E1E24`.
- **Accents:** Active player's card features a top 3px hazard-striped or solid `#FFD600` status lip.
- **Scores:** High-impact tabular numerals using `display-score`.

### Feed & Event Chips

- **Visuals:** Compact rounded status markers (`rounded-lg`) using translucent charcoal `#1E1E24` with high-contrast text.
- **State Coloring:** Yellow perimeter for successful spots; deep crimson (`#EF4444`) glow and borders for disputed claims or penalties.

### Inputs & Toggles

- **Switches:** Recessed mechanical toggle switches set into dark grooves (`#121212`), with glowing `#FFD600` switch rockers.
- **Input Fields:** Inset chassis boxes with dark backgrounds (`#121212`), 1px border (`#27272A`), shifting to a solid `#FFD600` ring on focus.

### Penalty / Dispute Modal

- **Visuals:** Angular bottom sheet with intense `#EF4444` top edge. High-contrast typography for quick resolution without interrupting game pace.
