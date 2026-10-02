# Sistema de Facturación e Inventario

Sistema en desarrollo para gestionar productos, inventario, facturación y usuarios.

## Estructura

El repositorio usa npm workspaces para mantener frontend y backend separados dentro del mismo proyecto.

```text
Sistema_Facturacion/
├── apps/
│   ├── api/                 # Backend Express + TypeScript
│   │   ├── src/
│   │   ├── migrations/
│   │   ├── prisma.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── web/                 # Frontend React + TypeScript + Tailwind
├── docs/
├── package.json
└── README.md
```

## Estado actual

El módulo de productos está implementado. Permite listar productos activos, consultar por ID, crear, actualizar, desactivar y reactivar.

Modelos definidos en la base de datos:

- User
- Product
- Income
- Invoice
- InvoiceDetail

Income, Invoice, InvoiceDetail y User todavía no tienen módulos HTTP implementados.

## Tecnologías del backend

- Node.js
- TypeScript
- Express 5
- Prisma 8 RC con `@prisma/orm-postgres`
- PostgreSQL
- Supabase
- tsx

> El proyecto usa la API de Collections basada en contratos de Prisma 8 RC, no el Prisma Client tradicional.

## Instalación

Desde la raíz:

```bash
npm install
```

Esto instala las dependencias de ambos workspaces. El `package-lock.json` raíz se versiona; para una instalación reproducible usa `npm ci`.

Requiere Node.js 22.12+ (recomendado Node 24 LTS).

## Variables de entorno

Copia:

```text
apps/api/.env.example
```

como:

```text
apps/api/.env
```

y configura `DATABASE_URL`.

Nunca se debe subir `.env` al repositorio.

## Comandos desde la raíz

```bash
npm run dev:api
npm run build:api
npm run start:api
npm run contract:emit
npm run dev:web
npm run build:web
npm run lint:web
npm run typecheck:web
npm run preview:web
```

La API usa por defecto:

```text
http://localhost:3000
```

El frontend usa `http://localhost:5173`. Ejecuta `dev:api` y `dev:web` en terminales separadas desde la raíz. Vite redirige `/api` al backend durante desarrollo.

Opcionalmente copia `apps/web/.env.example` a `apps/web/.env.local` para cambiar los destinos. No pongas secretos en variables `VITE_*`.

## Documentación

- [Arquitectura](docs/architecture.md)
- [Base de datos](docs/database.md)
- [API](docs/api.md)
- [Decisiones técnicas](docs/decisions.md)
- [Frontend: configuración y plan de Products](docs/frontend.md)

## Próximos objetivos

1. Base de `apps/web` creada con React, TypeScript y Tailwind; construir la interfaz de Products.
2. Integrar la UI de Products con la API real.
3. Implementar entradas de inventario con actualización atómica de stock.
4. Implementar facturación.
5. Implementar usuarios y autenticación.
6. Añadir pruebas automatizadas y despliegue.
