.PHONY: up down build prod logs-be logs-fe shell-be shell-fe ps test-fe test-be check migrate makemigrations

up:
	docker compose -f docker-compose.dev.yml up -d

down:
	docker compose -f docker-compose.dev.yml down

build:
	docker compose -f docker-compose.dev.yml up -d --build

prod:
	docker compose -f docker-compose.yml up -d --build

logs-be:
	docker compose logs -f backend

logs-fe:
	docker compose logs -f frontend

shell-be:
	docker compose exec backend sh

shell-fe:
	docker compose exec frontend sh

ps:
	docker compose ps

makemigrations:
	cd backend && python -m alembic revision --autogenerate -m "$(m)"

migrate:
	cd backend && python -m alembic upgrade head

db-fresh:
	docker compose -f docker-compose.dev.yml exec -T backend sh -c "cd /app && PYTHONPATH=/app python scripts/reset_public_schema.py"
	docker compose -f docker-compose.dev.yml exec -T backend sh -c "cd /app && PYTHONPATH=/app python -m alembic stamp base"
	docker compose -f docker-compose.dev.yml exec -T backend sh -c "cd /app && PYTHONPATH=/app python -m alembic upgrade head"

history:
	cd backend && python -m alembic history --verbose

test-fe:
	docker compose exec frontend npm test

test-be:
	docker compose exec backend pytest

check:
	@echo "🔍 Checking Frontend Type & Lint..."
	docker compose exec frontend npm run build
	docker compose exec frontend npm run lint
	@echo "🔍 Checking Backend Lint (Ruff)..."
	docker compose exec backend ruff check .
	@echo "🧪 Running All Tests..."
	make test-fe
	make test-be
	@echo "✅ All checks passed! Ready to commit."