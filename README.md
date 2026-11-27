# Macchina Gialla

Macchina Gialla is a multiplayer yellow-car spotting game with a React Native/Expo client and a FastAPI backend. The mobile client is being built incrementally with the Macchina Gialla UI design system; its screens are currently placeholders, not a complete game interface.

## Repository structure

```text
.
├── mobile/              # React Native + Expo Router client; see mobile/README.md
│   └── src/
│       ├── app/         # Screens and navigation layouts
│       ├── components/ui/ # Reusable native UI primitives
│       ├── theme/       # Macchina Gialla UI semantic tokens
│       └── mockups/     # HTML visual and interaction references
├── backend/             # FastAPI + SQLModel server; see backend/README.md
├── shared/
│   └── openapi.json     # Backend API schema used to generate app types
├── .bruno/              # Bruno API request collection
├── .github/             # Copilot project instructions and skills
├── DEISGN.md            # Macchina Gialla UI design specification
├── docker-compose.yaml  # Container setup for the backend
└── package.json         # Root development and type-generation commands
```

## Prerequisites

- Node.js and npm
- Python 3.12 and [uv](https://docs.astral.sh/uv/getting-started/installation/)
- For native app development, the platform tools described in [mobile/README.md](mobile/README.md)
- Docker, if you want to run the backend in a container

## Install dependencies

Install root tools, JavaScript app dependencies, and Python backend dependencies:

```bash
npm install
cd mobile && npm ci
cd ../backend && uv sync --locked
cd ..
```

The mobile app and backend each have their own dependency manifests and lockfiles. Install or update packages from their respective directories; see [mobile/README.md](mobile/README.md) and [backend/README.md](backend/README.md).

## Run the full project locally

The backend listens on port 8000. A physical phone and computer must be on the same network, and the backend must be reachable from the phone when backend integration is added. The current mobile scaffold does not yet connect to the backend.

From the repository root:

```bash
npm run dev
```

This starts the FastAPI server and Expo's development server together. Open the app with Expo Go or a development build compatible with the installed SDK and native modules. For separate terminals, run the backend with `npm run dev:backend` and the mobile app with `npm run dev:mobile`.

The backend API is available at `http://127.0.0.1:8000`; its interactive documentation is at `http://127.0.0.1:8000/docs`. See [backend/README.md](backend/README.md) for backend-specific setup and [mobile/README.md](mobile/README.md) for device, emulator, and app setup details.

## Run the backend with Docker Compose

From the repository root:

```bash
docker compose up --build
```

The compose service exposes port 8000 and mounts `backend/` into the container, so the local SQLite database survives container restarts. Stop the service with `docker compose down`.

## Useful root commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start backend and app development servers together |
| `npm run dev:backend` | Start the backend with reload |
| `npm run dev:mobile` | Start Expo in LAN mode and clear its cache |
| `npm run gen:backend:types` | Export the backend OpenAPI schema to `shared/openapi.json` |

Install root dependencies with `npm install` before using the root commands; `concurrently` is used by `npm run dev`.

The root `gen:mobile:types` and `gen:types` scripts are not yet usable: they depend on a `generate-types` script that the new mobile package does not currently define.

## Design and learning workflow

Use [DEISGN.md](DEISGN.md), [mobile/src/theme/tokens.ts](mobile/src/theme/tokens.ts), and [mobile/src/mockups/homepage.html](mobile/src/mockups/homepage.html) together when developing UI. The HTML includes references for the homepage, history, profile, game, winner, modals, and bottom navigation. Translate these references into native components and semantic tokens rather than copying HTML or Tailwind.

Copilot follows the guide-first workflow in [.github/copilot-instructions.md](.github/copilot-instructions.md): concepts, exact files, typed skeletons with TODOs, then verification. Invoke `/step` to use the [step skill](.github/skills/step/SKILL.md).

## Updating the project

Pull the latest changes, then sync dependencies from the affected project directory:

```bash
cd mobile && npm ci
cd ../backend && uv sync --locked
```

Restart development servers after updating. See the app and backend READMEs for instructions on updating packages, rebuilding native clients, and managing the local SQLite database.
