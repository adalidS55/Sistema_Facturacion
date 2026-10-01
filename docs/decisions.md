# Decisiones técnicas

Este archivo registra decisiones observables en el código actual y decisiones de arquitectura ya adoptadas para evitar rediscutirlas sin contexto.

## DEC-001 — Importes monetarios en centavos

**Estado:** adoptada.

Los importes se almacenan como enteros:

- `salePriceCents`
- `costPriceCents`
- `subtotalCents`
- `discountCents`
- `totalDiscountCents`
- `totalCents`

**Motivo:** evitar problemas de precisión propios del punto flotante en cálculos monetarios.

## DEC-002 — Soft delete para productos

**Estado:** implementada.

`DELETE /api/products/:id` no elimina la fila. Cambia:

```text
active = false
```

La reactivación se realiza mediante:

```text
PATCH /api/products/:id/activate
```

**Motivo:** los productos están relacionados con movimientos de inventario y detalles de factura; conservar el registro permite mantener historial y referencias.

## DEC-003 — Listado normal de productos solo activos

**Estado:** implementada.

`GET /api/products` filtra `active: true`.

La consulta individual por ID no aplica ese filtro para permitir localizar productos inactivos y reactivarlos.

## DEC-004 — Separación por capas dentro de cada módulo

**Estado:** implementada en Products.

Patrón:

```text
Routes -> Controller -> Validation / Service -> Prisma -> Database
```

La intención es reutilizar el mismo patrón en módulos posteriores cuando resulte apropiado.

## DEC-005 — Prisma 8 RC con Collection API

**Estado:** implementada.

El proyecto utiliza `@prisma/orm-postgres` y un contrato Prisma.

Las consultas comprobadas usan `Collection`, por ejemplo:

```ts
Product.where({ id }).first();
Product.where({ id }).update(data);
Product.all();
Product.create(data);
```

No se deben introducir métodos del Prisma Client tradicional sin verificar que existan en la versión instalada.

## DEC-006 — Validación antes de persistencia

**Estado:** implementada en Products.

El body se valida y normaliza antes de llamar al servicio. Para códigos de producto duplicados se realiza una comprobación previa y se responde `409 Conflict`.

La restricción `unique` de base de datos sobre `Product.code` se mantiene como protección de integridad.

## DEC-007 — PUT como actualización completa

**Estado:** implementada.

`PUT /api/products/:id` usa la validación completa del producto.

Los cambios parciales específicos se reservan para endpoints PATCH cuando sean necesarios.

## DEC-008 — Desarrollo por funcionalidades verticales

**Estado:** estrategia de trabajo.

A partir del módulo Products se pretende desarrollar cada funcionalidad combinando backend, frontend, integración y pruebas, en lugar de completar todo el backend antes de iniciar la interfaz.

## Pendientes de decisión

- Estructura definitiva del frontend.
- Si el repositorio evolucionará a monorepo; actualmente existe `apps/api/`, pero la implementación activa está en `src/`.
- Estrategia de autenticación y autorización.
- Manejo centralizado de errores.
- Biblioteca o estrategia de validación a largo plazo.
- Estrategia de pruebas automatizadas.
- Diseño de transacciones para entradas de inventario y facturación.
