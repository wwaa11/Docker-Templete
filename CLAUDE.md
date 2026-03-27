## Project Overview
- **Project:** Healthcare Website
- **Goal:** Secure, HIPAA-compliant (standards), and highly reliable system.
- **Optimization:** Responsive design, Accessibility (WCAG 2.1 AA).

Avoid over-engineering. Prefer clarity over cleverness.

## Tech Stack
- **Frontend:** Next.js 15 (App Router / React 19)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + daisyUI
- **Backend:** Python + FastAPI
- **Database:** Postgres (via SQLModel)
- **Migration:** Alembic
- **Testing:** Vitest (Frontend), Pytest (Backend)

## Architecture
- `frontend/`
    - `app/`                  → Routes and Server Components
    - `components/ui/`        → Reusable daisyUI primitives (Buttons, Inputs)
    - `components/product/`   → Product-specific UI (Patient Cards, Forms)
    - `lib/`                  → API clients and shared utilities
    - `types/`                → Shared TypeScript interfaces (Sync with Backend)
- `backend/`
    - `app/api/`              → Endpoint routers
    - `app/models/`           → SQLModel definitions (Source of Truth)
    - `app/schemas/`          → Pydantic V2 models for Request/Response
    - `app/services/`         → Business logic (Calculations, DB Operations)
    - `migrations/`           → Alembic migration scripts

## Database & Migration Rules (Alembic)
- **Never manual SQL:** Do not modify database schema directly via SQL. Use Alembic only.
- **Auto-generate:** Always use `make makemigrations m="description"` for schema changes.
- **Review:** AI must verify the generated migration script for accuracy (especially unique constraints and non-nullable fields).

## Coding Conventions
### Frontend (TS/Next.js)
- Strict types only — no `any`.
- Named exports only (except Next.js route/page files).
- Keep components < 200 lines.
- No abbreviations: `patient_id` not `pid`, `quantity` not `qty`.
- Error states: Always handle loading, empty, and error UI using daisyUI.

### Backend (Python/FastAPI)
- Mandatory type hints for all parameters and return types.
- Use `async def` for all I/O bound endpoints.
- Dependency Injection: Use `Depends()` for DB sessions and Auth.
- Follow PEP 8 (Ruff for linting).
- Use sqlalchemy ORM for database operations.
- break down the code into smaller files

## API Design Rules
- **No SQL in Endpoints:** Never write raw SQL queries in endpoint files.
- **Use ORM:** Always use SQLAlchemy ORM models for database operations.
- **No String Concatenation:** Do not build SQL queries using f-strings or string concatenation.
- **Use Parameters:** Always use parameter binding for dynamic values.
- **Helper Functions:** Move complex queries to service layer or use ORM query methods.

## Healthcare Security & Safety
- **PII Scrubbing:** Never log Personally Identifiable Information (Names, Birthdates, SSN).
- **Pervasive Validation:** Every input must be validated by Pydantic before processing.
- **Secure Error Handling:** Return generic error IDs to users; log detailed errors internally. No stack traces in production.
- **Auth Flow:** Do not modify login/session/JWT handling without explicit approval.
