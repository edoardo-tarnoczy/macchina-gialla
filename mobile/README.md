# Macchina Gialla Mobile

The React Native client uses Expo, Expo Router, and strict TypeScript. Its interface is being built incrementally with the **Macchina Gialla UI** design system.

## Current state

- Root layout loads Space Grotesk and Chivo and configures stack navigation.
- Three tabs provide **Gioca**, **Storico**, and **Profilo**, with vector icons.
- Room and create/join modal routes have minimal placeholder components.
- `ScreenContainer` provides safe-area handling, optional scrolling, and a centered content width.
- `TelemetryText` is a typed skeleton with implementation TODOs.
- `TactileButton` uses a stationary rounded shelf offset beneath a separate rounded face. Pressing moves only the face, exposing 2px of the 6px shelf at the bottom without revealing a shelf above it or changing layout height; disabled buttons remain still and skip haptics.
- Disabled buttons composite their overlapping surfaces together before applying opacity, preventing the shelf from showing through the face on Android.
- Screens do not yet reproduce the mockups or connect to the backend.

## Structure

```text
mobile/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── (tabs)/         # Gioca, Storico, Profilo and tab layout
│   │   ├── room/[code].tsx
│   │   └── modals/         # Create room and join PIN
│   ├── components/ui/     # ScreenContainer, TelemetryText and TactileButton
│   ├── theme/tokens.ts    # Semantic colors, typography, spacing and elevation
│   └── mockups/homepage.html
├── assets/
├── example/               # Archived starter code; ignored by Git
├── app.json
├── package.json
└── tsconfig.json
```

Only screens and navigation layouts belong in `src/app/`. Every route must default-export a component; reusable primitives belong in `src/components/ui/`.

## Install and run

From `mobile/`:

```bash
npm ci
npm start
```

Open the project using a compatible Expo Go client or development build. Platform shortcuts:

```bash
npm run android
npm run ios
npm run web
```

These commands start Expo for the selected platform; they do not build a native development client. An Android emulator requires Android Studio and the Android SDK; an iOS simulator requires macOS and Xcode.

To start Expo in LAN mode with the backend, run `npm run dev` from the repository root. See the [root README](../README.md) and [backend README](../backend/README.md).

## Design references

Before building a screen, inspect its corresponding view in [homepage.html](src/mockups/homepage.html). It contains homepage, history, profile, game, winner, modal, and navigation references. You can open the HTML in a browser; its fonts and Tailwind styling require internet access.

Translate the reference into React Native primitives using [tokens.ts](src/theme/tokens.ts) and the [Macchina Gialla UI specification](../DEISGN.md):

- Use `StyleSheet.create` and semantic tokens, not Tailwind or NativeWind.
- Reuse UI primitives rather than repeating typography and card styling.
- Keep user-facing copy in Italian, with short telemetry badges such as `LIVE`, `HOST`, and `PIN`.
- Treat mockup player names, scores, and rooms as sample data.
- Match the mockup's icon meanings: speedometer, trophy, and account circle. The current tab icons are preliminary.

Follow the repository's [Copilot instructions](../.github/copilot-instructions.md) for learn-by-doing guidance. Use `/step` for concepts, files to touch, typed skeletons with TODOs, and a verification step.

## Checks and dependency updates

From `mobile/`:

```bash
npm run lint
npx tsc --noEmit
```

ESLint is not currently configured; the first lint run may offer to install and configure it. The archived `example/` directory is included by the current TypeScript globs and can produce unrelated starter-code errors.

Use Expo's installer for SDK-compatible packages:

```bash
npx expo install package-name
```

Commit dependency manifest and lockfile changes together. After pulling changes, run `npm ci` and restart Expo. Changes to native dependencies may require rebuilding the development client.

Do not run `reset-project` during normal development: it is a starter-template reset command, not a cache reset.
