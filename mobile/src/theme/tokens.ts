// mobile/theme/tokens.ts
// Generated from DESIGN.md ("Tarmac Apex" Design System)

import { TextStyle, ViewStyle } from "react-native";

/**
 * 1. PRIMITIVE TOKENS
 * Raw values from Stitch YAML frontmatter & prose specs.
 * Never reference these directly inside screens—use semantic tokens below.
 */
export const palette = {
  // Asphalt & Carbon Surfaces
  surfaceLowest: "#0e0e0e",
  surfaceFloor: "#121212",
  surfaceBase: "#131313",
  surfaceChassis: "#18181b",
  surfaceLow: "#1c1b1b",
  surfaceContainer: "#201f1f",
  surfaceRaised: "#1e1e24",
  surfaceHigh: "#2a2a2a",
  surfaceHighest: "#353534",
  surfaceBright: "#393939",
  mechanicalBorder: "#27272a",
  shadowDrop: "#09090b",

  // Electric Taxi Yellow
  yellow500: "#ffd600",
  yellow600: "#e9c400",
  yellowShelf: "#c8a700", // Primary Spot Trigger 6px shelf
  yellowLip: "#b29500", // Secondary tactile shelf
  yellow300: "#ffe170",
  yellow100: "#fff5dc",
  yellow800: "#705d00",
  yellow900: "#3a3000",
  yellow950: "#221b00",

  // Warm Sand & Slate Neutrals
  sand100: "#e5e2e1",
  sand300: "#d0c6ab",
  sand500: "#999077",
  sand700: "#4d4632",
  slate400: "#94a3b8",
  steel300: "#b9c8de",
  steel700: "#39485a",

  // Track Penalty Crimson & Error
  crimson500: "#ef4444",
  error400: "#ffb4ab",
  error900: "#93000a",
  tertiary300: "#ffb3ad",
  tertiary900: "#930013",
} as const;

/**
 * 2. SEMANTIC COLOR TOKENS
 * Purpose-driven aliases consumed by UI components.
 */
export const colors = {
  // Backgrounds & Elevation Levels (DESIGN.md Levels 0–2)
  level0Floor: palette.surfaceBase, // #131313 / #121212
  level0Recessed: palette.surfaceLowest, // #0e0e0e (inputs, toggle grooves)
  level1Chassis: palette.surfaceLow, // #1c1b1b / #18181b
  level2Card: palette.surfaceContainer, // #201f1f
  level2CardHigh: palette.surfaceHigh, // #2a2a2a
  level2CardHighest: palette.surfaceHighest, // #353534

  // Borders & Outlines
  borderSubtle: palette.mechanicalBorder, // #27272a
  borderWarm: palette.sand700, // #4d4632
  outline: palette.sand500, // #999077

  // Brand Actions (Taxi Yellow)
  primary: palette.yellow500, // #ffd600
  primaryDim: palette.yellow600, // #e9c400
  primaryShelf: palette.yellowShelf, // #c8a700 (6px bottom extrusion)
  primaryLip: palette.yellowLip, // #b29500
  onPrimary: palette.yellow900, // #3a3000
  onPrimaryStrong: palette.surfaceFloor, // #121212 (for massive Spot trigger)

  // Typography Colors
  textPrimary: palette.sand100, // #e5e2e1
  textSecondary: palette.sand300, // #d0c6ab
  textMuted: palette.sand500, // #999077
  textTelemetry: palette.slate400, // #94a3b8

  // Secondary & Badges
  secondary: palette.steel300, // #b9c8de
  secondaryContainer: palette.steel700, // #39485a

  // Penalty / VAR / Dispute States
  penalty: palette.crimson500, // #ef4444 (VAR modal edge & dispute glow)
  error: palette.error400, // #ffb4ab
  errorContainer: palette.error900, // #93000a
} as const;

/**
 * 3. SPACING & RADII (Converted from rem -> px at 16px base)
 */
export const spacing = {
  xs: 4, // space-xs: 0.25rem
  sm: 8, // space-sm: 0.5rem
  md: 16, // space-md / gutter / margin: 1rem
  lg: 24, // space-lg: 1.5rem
  xl: 40, // space-xl: 2.5rem
} as const;

export const radii = {
  sm: 4, // 0.25rem
  base: 8, // DEFAULT: 0.5rem
  md: 12, // md: 0.75rem
  lg: 16, // lg: 1rem (chassis & tactile cards)
  xl: 24, // xl: 1.5rem (prominent housings)
  full: 9999, // pill / circular triggers
} as const;

/**
 * 4. TYPOGRAPHY SCALE
 * Includes tabular-nums on Space Grotesk for jitter-free live score updates.
 */
export const typography: Record<string, TextStyle> = {
  displayScore: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 64,
    lineHeight: 64,
    letterSpacing: -2.56, // -0.04em
    fontVariant: ["tabular-nums"],
  },
  headlineLg: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.72, // -0.02em
    fontVariant: ["tabular-nums"],
  },
  headlineLgMobile: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.56, // -0.02em
    fontVariant: ["tabular-nums"],
  },
  headlineMd: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.24, // -0.01em
    fontVariant: ["tabular-nums"],
  },
  labelAction: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.6, // 0.04em
    textTransform: "uppercase",
  },
  labelTelemetry: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2, // 0.1em
    textTransform: "uppercase",
    fontVariant: ["tabular-nums"],
  },
  bodyLg: {
    fontFamily: "Chivo_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: "Chivo_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
} as const;

/**
 * 5. MECHANICAL ELEVATION & TACTILE PHYSICS
 * Replicates extruded bottom shelves and recessed chassis borders in React Native.
 */
export const elevation = {
  level1Chassis: {
    backgroundColor: colors.level1Chassis,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  } satisfies ViewStyle,

  level2TactileCard: {
    backgroundColor: colors.level2Card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderBottomWidth: 4,
    borderBottomColor: palette.shadowDrop,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  } satisfies ViewStyle,

  // Primary Spot Trigger resting vs pressed physical shelf
  triggerResting: {
    backgroundColor: colors.primary,
    borderBottomWidth: 6,
    borderBottomColor: colors.primaryShelf,
    transform: [{ translateY: 0 }],
  } satisfies ViewStyle,

  triggerPressed: {
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryShelf,
    transform: [{ translateY: 4 }],
  } satisfies ViewStyle,
} as const;

export const theme = {
  palette,
  colors,
  spacing,
  radii,
  typography,
  elevation,
} as const;

export type Theme = typeof theme;
