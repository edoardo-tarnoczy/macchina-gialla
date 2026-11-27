# Macchina Gialla — Project & Mentorship Instructions

## 1. Mentorship & Teaching Mode (CRITICAL)

The developer is building this project to **learn React Native (Expo), Design Systems, and FastAPI**.

- **NEVER generate complete files or full feature implementations upfront.**
- **Default Behavior (Guide First):**
  1. Explain the architectural or UI concept and _why_ it is structured this way (2–4 concise bullet points).
  2. List the exact files to create or modify and their responsibilities.
  3. Provide a **minimal typed skeleton** (TypeScript interfaces, Pydantic schemas, function signatures, or JSX structure with `// TODO:` hints) so the developer writes the logic themselves.
  4. End with one verification step or micro-question before moving on.
- **Explicit Code Override:** Only provide full, working implementations when the user explicitly asks _"provide the code"_, _"show me the full implementation"_, or asks to debug code they wrote.
- **Placeholder Scope:** When fixing navigation or rendering errors, distinguish minimal route placeholders from finished screens. Do not treat a running app as a completed visual implementation.

## 2. Design System ("Macchina Gialla UI" — See `DESIGN.md`)

- **Visual Reference:** Read the relevant HTML mockup in `mobile/src/mockups/` before guiding or implementing a screen. `mobile/src/mockups/homepage.html` contains the homepage, history, profile, game, winner, modal, and bottom-navigation references. Use it to explain screen structure, icon choices, hierarchy, copy, and interactions, and compare the native result with the relevant view.
- **Native Translation:** Mockup HTML, Tailwind classes, CSS, and JavaScript are visual references, not mobile implementation code. Translate them into React Native primitives and semantic tokens. Follow the design-system rules and token values when mockup styling differs; identify missing tokens rather than hardcoding replacements. Treat sample players, scores, and rooms as mock data, not live backend state.
- **Zero CSS Frameworks:** Do NOT use NativeWind or Tailwind. Use React Native `StyleSheet.create` paired exclusively with semantic tokens from `mobile/src/theme/tokens.ts` (`colors`, `spacing`, `radii`, `typography`, `elevation`).
- **No Hardcoded Values:** Never write raw hex colors, magic padding numbers, or font names inside screen/component files.
- **Core UI Primitives (`mobile/src/components/ui/`):** Build and reuse small composable primitives (`TelemetryText`, `AsphaltCard`, `TactileButton`, `EventChip`, `DisputeSheet`) that encapsulate the physical rules in `DESIGN.md`:
  - **Tactile Press Physics:** Primary buttons extrude with a `6px` bottom shelf (`elevation.triggerResting`) and depress by `translateY: 4` with a `2px` shelf (`elevation.triggerPressed`) + `expo-haptics`.
  - **Tabular Numerals:** All live scores, timers, and telemetry readouts must use `Space Grotesk` in `UPPERCASE` with `tabular-nums`.
  - **Thumb Ergonomics:** Max container width `430px` centered; primary spot trigger must exceed `64px` height and stay anchored in the lower third without scrolling.
- **UI Language:** All user-facing copy must be in **Italian** (_Crea Stanza_, _Entra con Codice_, _MACCHINA GIALLA!_, _Contesta_), keeping short telemetry badges in English (`LIVE`, `PIN`, `HOST`, `MVP`, `VAR`).

## 3. Core Game Loop & Domain Rules

1. **Room Creation:** Host creates a room (`A Tempo` or `A Obiettivo`) -> backend generates a 6-character PIN (`#XXX-000`).
2. **Real-Time Sync:** Players join via PIN and connect to FastAPI WebSocket (`/ws/rooms/{room_code}`).
3. **Spotting:** Tapping **MACCHINA GIALLA!** awards `+1 pt` and broadcasts a `SPOT_ADDED` event.
4. **VAR / Dispute Flow:** Within `30s` of a spot, other players can trigger **Contesta** (crimson `#ef4444` sheet/chip). Majority vote revokes the spot, deducts `-1 pt`, and applies a `60s` cooldown.
5. **Passenger Safety:** Enforce a passenger-only acknowledgment/lock mode so drivers are not distracted.

## 4. Tech Stack & Folder Structure

- **Mobile (`/mobile`):** Expo SDK + Expo Router (file-based navigation), TypeScript (`strict: true`), `expo-haptics`, `@expo-google-fonts/space-grotesk`, `@expo-google-fonts/chivo`.
  - Routes live in `mobile/src/app/`; keep reusable components outside this directory.
  - 3 bottom tabs max: `Gioca` (`(tabs)/index.tsx`), `Storico` (`(tabs)/history.tsx`), `Profilo` (`(tabs)/profile.tsx`). Match the mockup's speedometer, trophy, and account-circle icon meanings, using navigator-provided color and size.
- **Backend (`/backend`):** Python + FastAPI (async), Pydantic v2, SQLAlchemy 2.0 (async), native WebSocket `ConnectionManager` broadcasting typed JSON events.
