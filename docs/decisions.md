# Decisiones técnicas

## DEC-001 — Importes monetarios en centavos

**Estado:** adoptada.

Los importes monetarios se almacenan como enteros para evitar problemas de precisión de punto flotante.

## DEC-002 — Soft delete para productos

**Estado:** implementada.

`DELETE /api/products/:id` establece `active = false`. La reactivación usa `PATCH /api/products/:id/activate`.

## DEC-003 — Listado normal solo de productos activos

**Estado:** implementada.

`GET /api/products` filtra `active: true`. La consulta individual por ID no aplica ese filtro para permitir localizar y reactivar productos inactivos.

## DEC-004 — Separación por capas

**Estado:** implementada en Products.

```text
Routes -> Controller -> Validation / Service -> Prisma -> Database
```

## DEC-005 — Prisma 8 RC con Collection API

**Estado:** implementada.

El proyecto usa `@prisma/orm-postgres` y contrato Prisma. No se deben introducir métodos del Prisma Client tradicional sin comprobar su disponibilidad.

## DEC-006 — Validación antes de persistencia

**Estado:** implementada en Products.

Los datos se validan y normalizan antes de llamar al servicio. Los códigos duplicados se comprueban en aplicación y `Product.code` conserva además su restricción `unique`.

## DEC-007 — PUT como actualización completa

**Estado:** implementada.

`PUT /api/products/:id` usa la validación completa. Los cambios parciales específicos se reservan para PATCH.

## DEC-008 — Desarrollo por funcionalidades verticales

**Estado:** estrategia de trabajo.

Cada funcionalidad debe avanzar combinando backend, frontend, integración y pruebas.

## DEC-009 — Monorepo ligero con npm workspaces

**Estado:** adoptada.

Frontend y backend permanecen en el mismo repositorio, separados como aplicaciones:

```text
apps/api
apps/web
```

La raíz coordina los workspaces. Cada aplicación mantiene su propia configuración y dependencias específicas.

## DEC-010 — Skills de Prisma fuera del código versionado

**Estado:** adoptada.

Las carpetas generadas por `prisma skills sync` no son necesarias para ejecutar la aplicación y no se versionan. Tampoco se ejecuta la sincronización automáticamente en `postinstall`.

Si una herramienta de desarrollo necesita esas skills, puede generarlas localmente sin convertirlas en parte del producto.

## DEC-011 — Frontend por funcionalidades con Vite

**Estado:** adoptada para la base de `apps/web`.

React y TypeScript estricto, con Tailwind 4 mediante `@tailwindcss/vite`.
`app` compone la aplicación, `features` agrupa cada módulo funcional y
`shared` contiene utilidades y componentes comunes. La configuración de
TypeScript del frontend es independiente de la API. Las dependencias se
instalan desde la raíz y se conserva un único lockfile.

El servidor de Vite redirige `/api` al backend durante desarrollo. El despliegue
deberá configurar un proxy equivalente o una base pública con CORS. El proxy
de desarrollo no se incluye en los archivos compilados.

## Pendientes de decisión

- Estrategia de autenticación y autorización.
- Manejo centralizado de errores.
- Biblioteca o estrategia de validación a largo plazo.
- Estrategia de pruebas automatizadas.
- Diseño de transacciones para inventario y facturación.
