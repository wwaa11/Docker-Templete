.PHONY: up down build prod logs-be logs-fe shell-be shell-fe ps test-fe test-be check migrate makemigrations

# --- Development ---
# เริ่มต้นรันโปรเจกต์ในโหมดพัฒนา (Frontend, Backend, Postgres)
up:
	docker compose -f docker-compose.dev.yml up -d

# หยุดการทำงานและลบคอนเทนเนอร์/เน็ตเวิร์ก
down:
	docker compose -f docker-compose.dev.yml down

# รีบิลด์ Image และเริ่มรันใหม่ (ใช้เมื่อมีการแก้ไข Dockerfile หรือเปลี่ยน dependencies)
build:
	docker compose -f docker-compose.dev.yml up -d --build

# --- Production ---
# บิลด์และรันในโหมดใช้งานจริง
prod:
	docker compose -f docker-compose.yml up -d --build

# --- Logs & Shell ---
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

# --- Database & Alembic (Migrations) ---
# สร้างไฟล์ Migration ใหม่ (ตัวอย่าง: make makemigrations m="add_user_table")
makemigrations:
	cd backend && python -m alembic revision --autogenerate -m "$(m)"

# อัปเดต Database Schema ให้เป็นเวอร์ชันล่าสุด
migrate:
	cd backend && python -m alembic upgrade head

# ดูประวัติการ Migration
history:
	cd backend && python -m alembic history --verbose

# --- Testing & Quality (ตามกฎใน CLAUDE.md) ---
test-fe:
	docker compose exec frontend npm test

test-be:
	docker compose exec backend pytest

# คำสั่งรวม: เช็คความเรียบร้อยทั้งหมดก่อนจบงาน (AI ควรถูกสั่งให้รันคำสั่งนี้)
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