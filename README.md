## Project Overview
- Healthcare website
- Primary goal: Secure, performant, and reliable healthcare services.

Optimize for:
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

Avoid over-engineering. Prefer clarity over cleverness.

## Tech Stack
- **Frontend:** Next.js 15 with App Router (React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + daisyUI
- **Backend:** Python + FastAPI
- **Database:** Postgres (via SQLModel/SQLAlchemy)
- **Testing:** Vitest (Frontend), Pytest (Backend)

Do not introduce:
- Redux or MobX (Use React state or Context)
- styled-components or Emotion
- Material UI or Ant Design
unless explicitly requested.

## Architecture
- `frontend/`
    - `app/`                  → routes and server components
    - `components/ui/`        → reusable design-system primitives (daisyUI)
    - `components/product/`   → product-specific UI (cards, gallery, filters)
    - `lib/`                  → shared utilities and API helpers (backend-client)
    - `types/`                → shared TypeScript interfaces
- `backend/`
    - `app/api/`              → Endpoints (routers)
    - `app/core/`             → Config, security, database setup
    - `app/models/`           → SQLModel definitions
    - `app/schemas/`          → Pydantic models (Data validation)
    - `app/services/`         → Complex business logic
    - `tests/`                → Pytest suite

## Coding Conventions
### Frontend (TypeScript/Next.js)
- TypeScript strict mode — avoid `any` at all times.
- Named exports only (except Next.js route files).
- `async/await` over chained `.then()`.
- Keep components under 200 lines unless justified.
- Descriptive variable names — no abbreviations (`qty` → `quantity`).
- No dead code, no commented-out blocks.
- Extract repeated logic into hooks under `features/{name}/hooks/`.

### Backend (Python/FastAPI)
- Use **Pydantic v2** for validation and serialization.
- Follow **PEP 8** (use `ruff` or `black` for formatting).
- Strict type hints for all function signatures.
- Use `async def` for I/O operations (DB, APIs).
- Dependency Injection: Use `Depends()` for sessions and auth.

## Backend Integration Rules
- **Single Source of Truth:** FastAPI handles heavy processing and healthcare logic; Next.js handles UI and Auth sessions.
- **Contract-First:** Update Pydantic schemas first, then update TypeScript interfaces in `frontend/types/`.
- **API Documentation:** Always maintain Swagger docs at `/docs`.
- **CORS:** Strictly allow only the Next.js origin.

## UI & Design System
- 8px spacing rhythm (p-2, p-4, p-8).
- Tailwind utilities only — no custom CSS files.
- Use `next/image` with proper aspect ratios for all images.
- Every interactive element must have: `hover`, `focus`, and `disabled` states.
- CTA buttons: Solid primary only — no ghost buttons for main actions.

## Healthcare Security & Safety
- **Pervasive Validation:** Use Pydantic to strictly validate all incoming healthcare data.
- **No Sensitive Data in Logs:** Scrub PII (Personally Identifiable Information) before logging.
- **No Tracebacks:** Never expose Python stack traces in production API responses.
- **Data Minimization:** Fetch only necessary fields from the backend.
- **Auth Flow:** Do not modify login/session handling without explicit request.
- **Environment Variables:** Never hardcode keys or tokens.

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Python 3.12+ (for local development)

### Quick Start
1. **Clone the repository**
2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   # Update .env with your specific configurations
   ```
3. **Start the project in development mode:**
   ```bash
   make up
   ```
4. **Run migrations:**
   ```bash
   make migrate
   ```
5. **Access the applications:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - Swagger Docs: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

## Development Workflow
Use the provided `Makefile` for common tasks:
- `make up`: Start development environment
- `make build`: Rebuild and start environment
- `make logs-be` / `make logs-fe`: View logs
- `make migrate`: Apply database migrations
- `make check`: Run all linting and build checks before committing

## Definition of Done (Checklist)
Before marking any task complete, run:
1. `make check` (Includes build verification, linting, and tests)
2. Verify empty, loading, and error states for data-driven UI.
3. Ensure mobile responsiveness.