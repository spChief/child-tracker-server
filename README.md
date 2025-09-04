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

```bash
# Разработка
yarn start:dev

# Продакшн
yarn start:prod
```

## Структура проекта

```
src/
├── entities/          # Модели базы данных
│   └── location.entity.ts
├── dto/              # DTO для валидации
│   └── location.dto.ts
├── location/         # Модуль для работы с GPS координатами
│   ├── location.controller.ts
│   ├── location.service.ts
│   └── location.module.ts
└── app.module.ts     # Главный модуль приложения
```

## Технологии

- NestJS
- TypeORM
- PostgreSQL
- class-validator
- class-transformer

## Лицензия

MIT