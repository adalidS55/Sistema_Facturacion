# Arquitectura

## Objetivo

El sistema está pensado para cubrir productos, inventario, facturación y usuarios mediante una API TypeScript y una interfaz web que se incorporará progresivamente.

## Arquitectura actual

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
Prisma ORM (Collection API)
       |
       v
PostgreSQL / Supabase
```

## Backend

La aplicación Express se configura en `src/app.ts` y el servidor se inicia desde `src/server.ts`.

Actualmente se registran:

- `/api/products`
- `/api/health`
- `/api/health/database`

### Organización por módulo

El módulo `products` establece el patrón actual:

```text
products.routes.ts
       |
       v
products.controller.ts
       |
       +----> products.validation.ts
       |
       v
products.service.ts
       |
       v
src/prisma/db.ts
```

### Responsabilidades

**Routes:** definen método HTTP y URL, y delegan en un handler.

**Controllers:** interpretan la petición, validan parámetros, transforman errores conocidos en respuestas HTTP y coordinan validación y servicios.

**Validation:** valida y normaliza el body antes de acceder a la base de datos.

**Services:** contienen el acceso a datos mediante Prisma.

## Prisma

El proyecto usa Prisma 8 RC con `@prisma/orm-postgres` y un contrato definido en `src/prisma/contract.prisma`.

La conexión se crea en `src/prisma/db.ts` usando:

```ts
db.orm.public.Model
```

El estilo de consultas comprobado en el proyecto es basado en Collections:

```ts
db.orm.public.Product.all();

db.orm.public.Product
  .where({ id })
  .first();

db.orm.public.Product.create(data);

db.orm.public.Product
  .where({ id })
  .update(data);
```

No se debe asumir que están disponibles métodos del Prisma Client tradicional como `findUnique()` o `findMany()`.

## Configuración

`prisma.config.ts` carga `DATABASE_URL` y apunta a `src/prisma/contract.prisma`.

Los artefactos generados del contrato son:

- `src/prisma/contract.json`
- `src/prisma/contract.d.ts`

## Frontend

El frontend todavía no está implementado en el estado actual de `main`.

La estrategia prevista es desarrollar por funcionalidades verticales: backend, interfaz, integración y pruebas de cada módulo antes de pasar al siguiente.

## Estructura pendiente de aclarar

Existe `apps/api/package.json`, pero los scripts raíz ejecutan `src/server.ts`. Hasta que se decida una migración a monorepo o una reorganización, `src/` debe considerarse la implementación activa.
