.PHONY: up down build prod logs-be logs-fe shell-be shell-fe ps test-fe test-be check migrate

# --- Development ---
# เริ่มต้นรันโปรเจกต์ในโหมดพัฒนา
up:
	docker compose -f docker-compose.dev.yml up -d

# หยุดการทำงานและลบคอนเทนเนอร์
down:
	docker compose -f docker-compose.dev.yml down

# รีบิลด์ Image และเริ่มรันใหม่
build:
	docker compose -f docker-compose.dev.yml up -d --build

# --- Production ---
# บิลด์และรันในโหมดใช้งานจริง
prod:
	docker compose -f docker-compose.yml up -d --build

# --- Logs & Shell ---
# ดู Log ของ Backend
logs-be:
	docker compose logs -f backend

# ดู Log ของ Frontend
logs-fe:
	docker compose logs -f frontend

# เข้าไปใน Terminal ของ Backend
shell-be:
	docker compose exec backend sh

# เข้าไปใน Terminal ของ Frontend
shell-fe:
	docker compose exec frontend sh

# ตรวจสอบสถานะคอนเทนเนอร์
ps:
	docker compose ps

# --- Database ---
# สำหรับรัน Migration (ถ้าใช้ Alembic ใน FastAPI)
migrate:
	docker compose exec backend alembic upgrade head

# --- Testing & Quality (ตามกฎใน CLAUDE.md) ---
# รัน Unit Test ฝั่ง Frontend
test-fe:
	docker compose exec frontend bun test

# รัน Unit Test ฝั่ง Backend
test-be:
	docker compose exec backend pytest

# คำสั่งสำคัญ: เช็คความเรียบร้อยทั้งหมดก่อนจบงาน (Pre-commit check)
check:
	@echo "🔍 Checking Frontend Type & Lint..."
	docker compose exec frontend bun typecheck
	docker compose exec frontend bun lint
	@echo "🔍 Checking Backend Lint (Ruff)..."
	docker compose exec backend ruff check .
	@echo "🧪 Running All Tests..."
	make test-fe
	make test-be
	@echo "✅ All checks passed!"