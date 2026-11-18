# ⚽ Liga Barrial API

API REST para gestionar una liga barrial de fútbol: equipos, jugadores, partidos,
resultados, tarjetas y tabla de posiciones calculada automáticamente.

## 🧱 Stack

- **NestJS 12** – modular, DI, guards, pipes
- **Prisma 6** + **PostgreSQL 16** (Docker)
- **JWT** (`@nestjs/jwt` + Passport) para autenticación
- **Argon2id** para hash de contraseñas (OWASP)
- **Swagger** (`@nestjs/swagger`) en `/api/v1/docs`
- **Throttler** (`@nestjs/throttler`) – 10 req/min por IP
- **class-validator** + `ValidationPipe` global (`whitelist: true`)

## 📦 Requisitos

- Node.js ≥ 20
- Docker + Docker Compose

## 🚀 Arranque

```bash
# 1. Dependencias
npm install

# 2. Base de datos
docker compose up -d postgres adminer

# 3. Variables de entorno
cp .env.example .env
# edita JWT_SECRET

# 4. Migración + seed (roles, permisos, admin)
npx prisma migrate dev --name init
npx prisma db seed

# 5. API
npm run start:dev