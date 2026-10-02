# Arquitectura

## Organización del repositorio

El proyecto se organiza como un workspace con aplicaciones separadas:

```text
apps/
├── api/     # Backend
└── web/     # Frontend, pendiente de crear
```

Esto mantiene frontend y backend en el mismo repositorio, pero evita mezclar código, configuración y dependencias propias de cada aplicación.

## Backend

La API activa está completamente dentro de `apps/api/`.

```text
apps/api/
├── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── modules/
│   │   └── products/
│   └── prisma/
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Flujo actual

```text
Cliente / Postman
       |
       v
Express API
       |
       v
Routes
       |
       v
Controllers
       |
       +----> Validation
       |
       v
Services
       |
       v
Prisma Collection API
       |
       v
PostgreSQL / Supabase
```

### Responsabilidades

**Routes:** método HTTP y URL.

**Controllers:** petición/respuesta HTTP, parámetros, errores conocidos y coordinación.

**Validation:** valida y normaliza datos de entrada.

**Services:** acceso a datos y operaciones de persistencia.

**Prisma:** contrato, tipos generados y conexión a PostgreSQL.

## Prisma

El contrato vive en:

```text
apps/api/src/prisma/contract.prisma
```

Los artefactos generados son:

```text
apps/api/src/prisma/contract.json
apps/api/src/prisma/contract.d.ts
```

Las migraciones viven junto al backend:

```text
apps/api/migrations/
```

El proyecto usa la Collection API de Prisma 8 RC. No se deben asumir métodos del Prisma Client tradicional.

## Frontend

`apps/web` se creará como aplicación React + Tailwind. Tendrá su propio `package.json` y código fuente, pero compartirá el repositorio y la documentación con la API.

## Workspaces

El `package.json` raíz declara:

```json
{
  "workspaces": ["apps/*"]
}
```

La raíz sirve para coordinar aplicaciones. Las dependencias específicas del backend están declaradas en `apps/api/package.json`.

## Archivos generados por herramientas

Las carpetas `.agents/`, `.claude/`, `.cursor/` y `.devin/` generadas por `prisma skills sync` no son parte de la aplicación y se excluyen mediante `.gitignore`.

No se ejecuta `prisma skills sync` automáticamente durante `npm install`.
