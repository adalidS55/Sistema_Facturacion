# Base de datos

## Fuente del esquema

El contrato actual está definido en:

```text
src/prisma/contract.prisma
```

La migración inicial versionada se encuentra en:

```text
migrations/app/20260831T0659_initial_schema
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

Representa una entrada de inventario asociada a un producto y a un usuario.

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

Una factura pertenece a un usuario y tiene múltiples detalles.

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

Los valores monetarios se almacenan como enteros en centavos:

```text
15000 -> 150.00
9000  ->  90.00
```

Esto evita depender de números de punto flotante para importes monetarios.

## Estado de implementación

El esquema incluye todos los modelos anteriores, pero actualmente solo `Product` tiene un módulo HTTP implementado. La existencia de un modelo en el contrato no implica que su API ya exista.
