# Macchina Gialla Backend

The backend is a Python 3.12 API server built with FastAPI. It provides HTTP endpoints and WebSocket connections for game rooms, player scores, and live score updates. It uses SQLite for persistence and SQLModel for its database models.

## Project structure

```text
backend/
├── app/
│   ├── main.py              # FastAPI app, HTTP/WebSocket routes, and database setup
│   ├── models.py            # SQLModel tables and WebSocket message schema
│   └── websocket_manager.py # Tracks connections and broadcasts updates by room
├── macchina_gialla.db       # SQLite database (created at runtime; ignored by Git)
├── generate_openapi.py      # Exports the FastAPI OpenAPI schema
├── pyproject.toml           # Python version constraints and project dependencies
├── uv.lock                  # Locked dependency versions
├── .python-version          # Python version used by uv
├── Dockerfile               # Container build and server startup instructions
└── README.md
```

## Prerequisites

- Python 3.12
- [uv](https://docs.astral.sh/uv/getting-started/installation/) for Python and dependency management

The repository pins Python to 3.12 in `.python-version`. Install uv using the instructions for your operating system in the linked documentation.

## Run locally

From the `backend` directory:

```bash
uv sync --locked
uv run uvicorn app.main:app --reload
```

The server listens on `http://127.0.0.1:8000`. FastAPI's interactive API documentation is at `http://127.0.0.1:8000/docs`; the root endpoint (`/`) returns a simple server status message. `--reload` restarts the server when Python files change; omit it when running without development reload.

The SQLite database is `macchina_gialla.db` in the current working directory. The app creates the file and its tables on startup. Keep the working directory as `backend` so the database is created in the expected location.

## Run with Docker

From the `backend` directory:

```bash
docker build -t macchina-gialla-backend .
docker run --rm -p 8000:8000 macchina-gialla-backend
```

The container exposes port 8000. Its SQLite database is not persisted when the container is removed. To persist it, first create `macchina_gialla.db` in `backend` (for example, by starting the app locally once), then add `-v "$PWD/macchina_gialla.db:/app/macchina_gialla.db"` to the `docker run` command.

## Update the backend

After pulling the latest repository changes, from `backend` run:

```bash
uv sync --locked
```

This installs the exact dependency versions recorded in `uv.lock`. Restart the local server or recreate the Docker image/container to run the updated code. Back up `macchina_gialla.db` before changes that may affect stored data; the database file is local and is not included in Git.

## Add, remove, or update packages

Use uv from the `backend` directory; do not install packages directly with `pip`. uv updates `pyproject.toml` and `uv.lock` together:

```bash
# Add a runtime dependency
uv add package-name

# Add a development-only dependency
uv add --dev package-name

# Remove a dependency
uv remove package-name
```

Commit both changed dependency files. To update one package within the constraints in `pyproject.toml`, run:

```bash
uv lock --upgrade-package package-name
uv sync --locked
```

To update all packages within their declared version constraints, run `uv lock --upgrade` and then `uv sync --locked`. Review the lockfile changes and run the relevant checks before committing.

## API overview

- `GET /rooms` lists rooms; `POST /rooms` creates one.
- `GET /rooms/{room_code}` returns the room's scores; `POST /rooms/{room_code}/reset` resets them.
- `WS /ws/{room_code}/{username}` joins a room. Send `{"action":"bump"}` to increment a score; the server broadcasts score updates and winner messages to that room.

The local connection manager keeps WebSocket connections in process memory, so live broadcasts are limited to clients connected to the same backend process.