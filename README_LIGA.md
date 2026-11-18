# ⚽ Liga Barrial API

API REST desarrollada para gestionar un campeonato de fútbol de barrio. Permite administrar equipos, jugadores, árbitros, canchas, programar partidos, registrar resultados y tarjetas, y calcula automáticamente la tabla de posiciones.

El sistema incluye seguridad basada en roles y permisos (RBAC), autenticación con JSON Web Tokens (JWT) y documentación interactiva con Swagger.

## 🧱 Stack Tecnológico

- **NestJS 12** – Framework de Node.js para arquitecturas modulares (Módulos, Controladores, Servicios).
- **TypeScript** – Tipado estático para mayor robustez del código.
- **Prisma 6 (ORM)** + **PostgreSQL 16** – Base de datos relacional y mapeo de datos.
- **JWT** (`@nestjs/jwt` + Passport) – Autenticación sin estado.
- **Argon2id** – Hash de contraseñas recomendado por OWASP.
- **Swagger** (`@nestjs/swagger`) – Documentación de la API.
- **Throttler** (`@nestjs/throttler`) – Rate limiting (límite de peticiones por IP).
- **class-validator** + `ValidationPipe` – Validación estricta de datos entrantes (whitelist).

## 📦 Requisitos Previos

- Node.js ≥ 20
- Docker y Docker Compose instalados

## 🚀 Instalación y Arranque

```bash
# 1. Clonar el repositorio e instalar dependencias
npm install

# 2. Levantar la base de datos (PostgreSQL) y el gestor visual (Adminer)
docker compose up -d postgres adminer

# 3. Configurar variables de entorno
cp .env.example .env
# IMPORTANTE: Abre el archivo .env y edita el JWT_SECRET por un valor seguro.

# 4. Preparar la base de datos (crear tablas)
npx prisma migrate dev --name init

# 5. Sembrar la base de datos (crear roles, permisos y usuario admin)
npx prisma db seed

# 6. Arrancar el servidor en modo desarrollo
npm run start:dev