# Project Template

This is a full-stack template using Python (FastAPI), React (TypeScript), and Alembic, with Docker support.

## Project Structure

- `backend/`: FastAPI application and Alembic migrations.
- `frontend/`: React application with Vite.
- `docker-compose.yml`: Standard Docker Compose for production-like local setup.
- `docker-compose.dev.yml`: Development Docker Compose with hot-reloading.
- `docker-stack.yml`: Docker Swarm stack definition.
- `docker-ci.yml`: CI/CD pipeline configuration.

## Support for Base Path

The project is configured to support being hosted under a sub-path (e.g., `/template-base/`).

### How to change the Base Path

1. Update `BASE_PATH` in `.env`.
2. The `backend` uses `BASE_PATH` from environment variables for its API documentation URLs.
3. The `frontend/vite.config.ts` uses `BASE_PATH` from the environment or `.env` to set the build base and proxy paths.
4. The `frontend/src/App.tsx` handles `BASE_PATH` dynamically.
5. The `frontend/default.conf.template` uses `${BASE_PATH}` to configure Nginx.
6. The `frontend/Dockerfile` build process takes `BASE_PATH` as a build argument to place the static files in the correct directory.
7. Both `docker-compose.yml` and `docker-compose.dev.yml` pass `BASE_PATH` to the services.

## Getting Started

### Development

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The frontend will be available at `http://localhost:5173` (or the configured base path if proxied).
The backend API will be available at `http://localhost:8000`.

### Production

```bash
docker-compose up --build
```
