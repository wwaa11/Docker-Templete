## Project Overview
- heathcare website

Optimize for:
- mobile-first responsive design

Avoid over-engineering. Prefer clarity over cleverness.

## Tech Stack
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS + daisyUI
- Postgres Database
- Vitest for unit tests
- Python + Fast API for backend

Do not introduce:
- Redux or MobX
- styled-components or Emotion
- Material UI or Ant Design
unless explicitly requested.

## Architecture
- frontend/
    - app/                   → routes and server components
    - components/ui/         → reusable design-system primitives
    - components/product/    → product-specific UI (cards, gallery, filters)
    - lib/                   → shared utilities and API helpers
    - types/                 → shared TypeScript interfaces

- backend/               → Python FastAPI root
  - app/
    - api/               → Endpoints (routers)
    - core/              → Config, security, database setup
    - models/            → SQLAlchemy/SQLModel definitions
    - schemas/           → Pydantic models (data validation)
    - services/          → Complex business logic
  - tests/               → Pytest suite

Rules:
- Keep API calls in lib/ or server actions only
- Never put side effects inside presentational components
- New feature? Create under features/{feature-name}/
- Prefer editing existing components over creating near-duplicates

## Coding Conventions
- TypeScript strict mode — avoid `any` at all times
- Named exports only (except Next.js route files)
- async/await over chained .then()
- Keep components under 200 lines unless justified
- Descriptive variable names — no abbreviations (qty → quantity)
- No dead code, no commented-out blocks
- Add comments only when intent is non-obvious
- Extract repeated logic into hooks under features/{name}/hooks/

## Python & FastAPI Conventions
- Use **Pydantic v2** for data validation and serialization.
- Follow **PEP 8** style guide (use `black` or `ruff` for formatting).
- Type hints are mandatory for all function signatures.
- Use `async def` for endpoints that perform I/O operations (DB, external APIs).
- Dependency Injection: Use `Depends()` for database sessions and authentication.
- Structure: Router -> Service -> Repository (if complex) or Model.

## UI & Design System
- Use daisyui primitives as default foundation
- 8px spacing rhythm throughout (p-2, p-4, p-8)
- Tailwind utilities only — no custom CSS files
- Product images: always use next/image with proper aspect ratios
- Every interactive element needs: hover, focus, and disabled states
- Forms must be scannable and mobile-friendly
- Meet WCAG 2.1 AA for contrast and keyboard navigation
- CTA buttons: solid primary only — no ghost buttons for main actions

## Content & Copy
- Error messages: tell users what to do, not just what went wrong
- CTA labels: action verbs ("Add to Cart", "Continue to Payment")
- Price display: always show currency symbol, use comma separator (฿1,290)

Before marking any task complete:
- run typecheck (bun typecheck)
- run lint (bun lint)
- run relevant tests (bun test)

Rules:
- Unit tests required for: cart calculations, discount logic, 
  form validation, price formatting
- No heavy test scaffolding for simple presentational components
- For all data-driven UI: verify empty, loading, and error states
- Checkout flow changes require E2E test coverage

## Backend Integration Rules
- **Single Source of Truth:** FastAPI handles heavy data processing and healthcare logic; Next.js handles UI and Auth sessions.
- **API Documentation:** Always maintain Swagger/OpenAPI docs (`/docs`).
- **Communication:** Next.js Server Actions should call FastAPI via internal network (if possible) using a dedicated `backend-client` in `lib/`.
- **CORS:** Strictly define allowed origins (Next.js URL only).

## File Placement
- New product UI components → components/product/
- Reusable UI primitives → components/ui/
- Cart/wishlist logic → features/cart/ or features/wishlist/
- Shared helpers → lib/
- API route handlers → app/api/{resource}/route.ts

Rules:
- Do not create a new abstraction for one-off usage
- Edit existing component before creating near-duplicate
- Component filename must match exported name (ProductCard.tsx → ProductCard)

## Safety Rules
- Do not rename or restructure public API routes (/api)
- Do not modify Stripe webhook handler without explicit request
- Do not change Supabase schema without flagging it clearly first
- Do not modify auth flow (login, register, session handling)
- Preserve backward compatibility for all shared components
- Flag major architectural changes before implementing — 
  describe the change and wait for approval

## Python Security & Healthcare Data
- **Pervasive Validation:** Use Pydantic to strictly validate all incoming healthcare data.
- **No Sensitive Data in Logs:** Scrub PII (Personally Identifiable Information) before logging to any provider.
- **SQL Injection:** Use ORM (SQLModel/SQLAlchemy) to prevent raw SQL vulnerabilities.
- **Error Handling:** Don't expose Python traceback in production API responses; return generic error IDs.

  ## Security Rules
- Never hardcode API keys, tokens, or passwords in source code
- Never log sensitive data:
  - no console.log(user.password)
  - no logging full request bodies containing payment info
  - no logging Stripe webhook payloads in full
- All user input must be validated server-side before hitting database

- **Pytest required for:**
  - Healthcare calculation logic
  - Data transformation services
  - Authentication middleware/dependency
- Run `pytest` before marking backend tasks as complete.