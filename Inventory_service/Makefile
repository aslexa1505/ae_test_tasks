	# Имя вашего docker-compose файла
COMPOSE_FILE=docker-compose.yml

# Команды для управления контейнерами
up:
	docker-compose -f $(COMPOSE_FILE) up -d

down:
	docker-compose -f $(COMPOSE_FILE) down

restart:
	@make down
	@make up

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

ps:
	docker-compose -f $(COMPOSE_FILE) ps

# Удаление контейнеров и данных
clean:
	docker-compose -f $(COMPOSE_FILE) down -v

# Команда для пересборки контейнеров
build:
	docker-compose -f $(COMPOSE_FILE) build

# Просмотр состояния системы
status:
	docker-compose -f $(COMPOSE_FILE) ps

# Помощь
help:
	@echo "Список доступных команд:"
	@echo "  make up       - Запустить Docker контейнеры"
	@echo "  make down     - Остановить Docker контейнеры"
	@echo "  make restart  - Перезапустить Docker контейнеры"
	@echo "  make logs     - Посмотреть логи контейнеров"
	@echo "  make ps       - Список запущенных контейнеров"
	@echo "  make clean    - Удалить контейнеры и данные"
	@echo "  make build    - Пересобрать Docker контейнеры"
	@echo "  make status   - Посмотреть статус контейнеров"
