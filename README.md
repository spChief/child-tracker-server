# Child Tracker Server

Веб-сервер на NestJS для приема и сохранения GPS координат от мобильных устройств.

## Описание

Сервер предоставляет API для приема GPS координат от мобильных устройств и сохранения их в базу данных PostgreSQL. Поддерживает как одиночные запросы, так и пакетную отправку координат.

## API Endpoints

### POST /location
Отправка одной GPS точки

```json
{
  "deviceId": "device123",
  "latitude": 55.7558,
  "longitude": 37.6176,
  "accuracy": 10.5,
  "altitude": 150.0,
  "speed": 5.2,
  "bearing": 45.0,
  "timestamp": 1640995200000,
  "provider": "gps"
}
```

### POST /locations/batch
Отправка множества GPS точек

```json
{
  "locations": [
    {
      "deviceId": "device123",
      "latitude": 55.7558,
      "longitude": 37.6176,
      "accuracy": 10.5,
      "timestamp": 1640995200000
    },
    {
      "deviceId": "device123",
      "latitude": 55.7559,
      "longitude": 37.6177,
      "accuracy": 8.2,
      "timestamp": 1640995260000
    }
  ]
}
```

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
yarn install
```

3. Настройте базу данных PostgreSQL
4. Скопируйте файл конфигурации:
```bash
cp env.example .env
```

5. Отредактируйте `.env` файл с вашими настройками базы данных

## Запуск

### Локальная разработка

```bash
# Разработка
yarn start:dev

# Продакшн
yarn start:prod
```

### Docker

#### Продакшн окружение

```bash
# Запуск всех сервисов (приложение + база данных)
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down

# Остановка с удалением данных
docker-compose down -v
```

#### Разработка

```bash
# Запуск только базы данных для разработки
docker-compose -f docker-compose.dev.yml up -d

# Запуск приложения локально (с подключением к Docker БД)
yarn start:dev

# pgAdmin доступен по адресу http://localhost:8080
# Логин: admin@admin.com, Пароль: admin
```

#### Использование Makefile (опционально)

```bash
# Показать все доступные команды
make help

# Запуск продакшн окружения
make up

# Запуск окружения для разработки
make dev-up

# Просмотр логов
make logs
make dev-logs

# Остановка
make down
make dev-down

# Очистка всех контейнеров и данных
make clean
```

#### Отдельный запуск

```bash
# Сборка образа приложения
docker build -t child-tracker-server .

# Запуск только базы данных
docker-compose up postgres -d

# Запуск приложения (требует запущенную БД)
docker run -p 3000:3000 --env-file .env child-tracker-server
```

## Структура проекта

```
├── src/
│   ├── entities/          # Модели базы данных
│   │   └── location.entity.ts
│   ├── dto/              # DTO для валидации
│   │   ├── location.dto.ts
│   │   └── location-batch.dto.ts
│   ├── location/         # Модуль для работы с GPS координатами
│   │   ├── location.controller.ts
│   │   ├── location.service.ts
│   │   └── location.module.ts
│   └── app.module.ts     # Главный модуль приложения
├── Dockerfile            # Docker образ для приложения
├── docker-compose.yml    # Docker Compose конфигурация
├── .dockerignore         # Исключения для Docker
├── init.sql             # SQL скрипт инициализации БД
└── env.example          # Пример переменных окружения
```

## Технологии

- NestJS
- TypeORM
- PostgreSQL
- class-validator
- class-transformer
- Docker
- Docker Compose

## Лицензия

MIT