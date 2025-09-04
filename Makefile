# Child Tracker Server - Makefile для Docker

.PHONY: help build up down logs dev-up dev-down dev-logs clean

# Показать справку
help:
	@echo "Доступные команды:"
	@echo "  build     - Собрать Docker образ"
	@echo "  up        - Запустить продакшн окружение"
	@echo "  down      - Остановить продакшн окружение"
	@echo "  logs      - Показать логи продакшн окружения"
	@echo "  dev-up    - Запустить окружение для разработки"
	@echo "  dev-down  - Остановить окружение для разработки"
	@echo "  dev-logs  - Показать логи окружения разработки"
	@echo "  clean     - Удалить все контейнеры и volumes"

# Продакшн окружение
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Окружение для разработки
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Очистка
clean:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f
