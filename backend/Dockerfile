FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copia solo i file delle dipendenze per sfruttare la cache di Docker
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-cache

# Copia il resto del codice
COPY . .

EXPOSE 8000

# Esegui l'app tramite uv
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]