# Macchina Gialla

Macchina Gialla is a multiplayer bump game with a React Native/Expo client and a FastAPI backend. Players create or join a room, connect over WebSocket, and compete on a live score leaderboard.

## Repository structure

```text
.
├── app/                 # React Native + Expo client; see app/README.md
├── backend/             # FastAPI + SQLModel server; see backend/README.md
├── shared/
│   └── openapi.json     # Backend API schema used to generate app types
├── .bruno/              # Bruno API request collection
├── docker-compose.yaml  # Container setup for the backend
└── package.json         # Root development and type-generation commands
```

## Prerequisites

- Node.js and npm
- Python 3.12 and [uv](https://docs.astral.sh/uv/getting-started/installation/)
- For native app development, the platform tools described in [app/README.md](app/README.md)
- Docker, if you want to run the backend in a container

## Install dependencies

Install root tools, JavaScript app dependencies, and Python backend dependencies:

```bash
npm install
cd app && npm ci
cd ../backend && uv sync --locked
cd ..
```

The app and backend each have their own dependency manifests and lockfiles. Install or update packages from their respective directories; see [app/README.md](app/README.md) and [backend/README.md](backend/README.md).

## Run the full project locally

The app automatically uses the Expo development server's host for the backend on port 8000. A physical phone and computer must be on the same network, and the backend must be reachable from the phone.

From the repository root:

```bash
npm run dev
```

This starts the FastAPI server and Expo's development server together. Open the app with Expo Go or a development build. For separate terminals, run the backend with `npm run dev:backend` and the app with `npm run dev:app`.

The backend API is available at `http://127.0.0.1:8000`; its interactive documentation is at `http://127.0.0.1:8000/docs`. See [backend/README.md](backend/README.md) for backend-specific setup and [app/README.md](app/README.md) for device, emulator, and app setup details.

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
| `npm run dev:app` | Start Expo in LAN mode and clear its cache |
| `npm run gen:backend:types` | Export the backend OpenAPI schema to `shared/openapi.json` |
| `npm run gen:app:types` | Generate TypeScript types from the shared OpenAPI schema |
| `npm run gen:types` | Run both API type-generation steps |

Install root dependencies with `npm install` before using the root commands; `concurrently` is used by `npm run dev`.

## Updating the project

Pull the latest changes, then sync dependencies from the affected project directory:

```bash
cd app && npm ci
cd ../backend && uv sync --locked
```

Restart development servers after updating. See the app and backend READMEs for instructions on updating packages, rebuilding native clients, and managing the local SQLite database.
