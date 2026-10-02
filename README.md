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
│   └── web/                 # Frontend (se creará en la siguiente etapa)
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

Esto instala las dependencias de los workspaces y genera un nuevo `package-lock.json` compatible con la estructura actual.

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
```

La API usa por defecto:

```text
http://localhost:3000
```

## Documentación

- [Arquitectura](docs/architecture.md)
- [Base de datos](docs/database.md)
- [API](docs/api.md)
- [Decisiones técnicas](docs/decisions.md)

## Próximos objetivos

1. Crear `apps/web` con React y Tailwind.
2. Integrar la UI de Products con la API real.
3. Implementar entradas de inventario con actualización atómica de stock.
4. Implementar facturación.
5. Implementar usuarios y autenticación.
6. Añadir pruebas automatizadas y despliegue.
