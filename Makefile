.PHONY: up down build logs shell-backend shell-frontend ps

# Run the project in development mode
up:
	docker compose -f docker-compose.dev.yml up -d

# Stop the project and remove containers/networks
down:
	docker compose -f docker-compose.dev.yml down

# Rebuild images and start
build:
	docker compose -f docker-compose.dev.yml up -d --build

# Follow backend logs
logs:
	docker compose logs -f backend

# Open a shell inside the backend container
shell-backend:
	docker compose exec backend sh

# Open a shell inside the frontend container
shell-frontend:
	docker compose exec frontend sh

# Show status of containers
ps:
	docker compose ps
