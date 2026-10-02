# Base de datos

## Fuente del esquema

El contrato actual está definido en:

```text
apps/api/src/prisma/contract.prisma
```

La migración inicial versionada está en:

```text
apps/api/migrations/app/20260831T0659_initial_schema
```

## Enumeraciones

### UserRole

- `ADMIN`
- `USER`

### InvoiceStatus

- `ACTIVE`
- `CANCELLED`

## Modelos

### User

| Campo | Tipo / regla |
| --- | --- |
| id | Int, PK, autoincrement |
| name | String |
| passwordHash | String |
| role | UserRole, default USER |
| active | Boolean, default true |
| createdAt | TimestamptzString |
| updatedAt | timestamp actualizado automáticamente |

Relaciones: un usuario puede tener múltiples `Income` y múltiples `Invoice`.

### Product

| Campo | Tipo / regla |
| --- | --- |
| id | Int, PK, autoincrement |
| code | String, unique |
| name | String |
| stock | Int, default 0 |
| salePriceCents | Int |
| costPriceCents | Int |
| entryDate | TimestamptzString |
| active | Boolean, default true |
| createdAt | TimestamptzString |
| updatedAt | timestamp actualizado automáticamente |

Relaciones: un producto puede aparecer en múltiples `Income` y `InvoiceDetail`.

### Income

| Campo | Tipo / regla |
| --- | --- |
| id | Int, PK, autoincrement |
| productId | FK a Product |
| quantity | Int |
| dateTime | TimestamptzString, default now |
| userId | FK a User |

### Invoice

| Campo | Tipo / regla |
| --- | --- |
| id | Int, PK, autoincrement |
| number | String, unique |
| dateTime | TimestamptzString, default now |
| subtotalCents | Int |
| totalDiscountCents | Int, default 0 |
| totalCents | Int |
| status | InvoiceStatus, default ACTIVE |
| userId | FK a User |
| createdAt | TimestamptzString |
| updatedAt | timestamp actualizado automáticamente |

### InvoiceDetail

| Campo | Tipo / regla |
| --- | --- |
| id | Int, PK, autoincrement |
| invoiceId | FK a Invoice |
| productId | FK a Product |
| productName | String |
| quantity | Int |
| salePriceCents | Int |
| costPriceCents | Int |
| discountCents | Int, default 0 |
| subtotalCents | Int |

`productName`, precios y costos se almacenan en el detalle para conservar información propia de la transacción.

## Relaciones

```text
User 1 ---- N Income N ---- 1 Product

User 1 ---- N Invoice
                  |
                  1
                  |
                  N
             InvoiceDetail
                  |
                  N
                  |
                  1
               Product
```

## Convención monetaria

Los valores monetarios se almacenan como enteros en centavos para evitar depender de punto flotante en importes monetarios.

## Estado de implementación

Todos los modelos anteriores existen en el contrato. Actualmente solo `Product` tiene módulo HTTP implementado.
