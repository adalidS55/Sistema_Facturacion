# API

Base local por defecto:

```text
http://localhost:3000
```

## Health

### GET /api/health

Comprueba que Express está funcionando.

### GET /api/health/database

Comprueba acceso a la base de datos realizando una consulta de productos.

## Products

Base:

```text
/api/products
```

### GET /api/products

Lista productos activos.

La consulta del servicio filtra actualmente:

```ts
.where({ active: true })
```

Respuesta exitosa: `200 OK`.

### GET /api/products/:id

Obtiene un producto por ID. Esta consulta puede encontrar tanto productos activos como inactivos.

Errores conocidos:

- `400`: ID inválido.
- `404`: producto inexistente.
- `500`: error inesperado.

### POST /api/products

Crea un producto.

Body:

```json
{
  "code": "PROD-001",
  "name": "Producto de prueba",
  "stock": 10,
  "salePriceCents": 15000,
  "costPriceCents": 9000,
  "entryDate": "2026-09-28T12:00:00.000Z",
  "active": true
}
```

Validaciones actuales:

- `code` obligatorio y no vacío.
- `name` obligatorio y no vacío.
- `stock` entero y >= 0.
- `salePriceCents` entero y >= 0.
- `costPriceCents` entero y >= 0.
- `entryDate` debe ser una fecha interpretable.
- `active`, cuando se envía, debe ser booleano.
- El código se comprueba antes de crear para detectar duplicados.

Respuestas relevantes:

- `201`: creado.
- `400`: datos inválidos.
- `409`: ya existe un producto con ese código.
- `500`: error inesperado.

### PUT /api/products/:id

Actualiza completamente los datos editables del producto usando la misma validación del POST.

El código puede mantenerse sin conflicto. Si pertenece a otro producto, devuelve `409`.

Respuestas relevantes:

- `200`: actualizado.
- `400`: ID o body inválido.
- `404`: producto inexistente.
- `409`: código utilizado por otro producto.
- `500`: error inesperado.

### DELETE /api/products/:id

Implementa desactivación lógica, no eliminación física:

```text
active = false
```

Respuestas relevantes:

- `200`: desactivado.
- `400`: ID inválido.
- `404`: producto inexistente.
- `409`: el producto ya estaba desactivado.
- `500`: error inesperado.

### PATCH /api/products/:id/activate

Reactiva un producto:

```text
active = true
```

No requiere body.

Respuestas relevantes:

- `200`: reactivado.
- `400`: ID inválido.
- `404`: producto inexistente.
- `409`: el producto ya estaba activo.
- `500`: error inesperado.

## Formato general

Las respuestas exitosas utilizan `status: "ok"`. Los errores controlados utilizan `status: "error"` y un `message`.

## APIs aún no implementadas

Aunque existen modelos en el contrato, en `main` todavía no hay rutas HTTP para:

- Income
- Invoice
- InvoiceDetail
- User / autenticación
