# Sistema de Facturación e Inventario

Backend en desarrollo para gestionar productos, inventario, facturación y usuarios.

## Estado actual

El módulo de **productos** está implementado y expone operaciones para listar productos activos, consultar por ID, crear, actualizar, desactivar y reactivar productos.

Los modelos de base de datos definidos actualmente son:

- User
- Product
- Income
- Invoice
- InvoiceDetail

Los módulos de entradas de inventario, facturación y usuarios todavía no tienen API implementada.

## Tecnologías actuales

- Node.js
- TypeScript
- Express 5
- Prisma 8 RC mediante `@prisma/orm-postgres`
- PostgreSQL
- Supabase como base de datos alojada
- tsx para desarrollo

> Este proyecto usa la nueva API basada en contratos y Collections de Prisma 8 RC, no la API tradicional de Prisma Client.

## Ejecutar en desarrollo

1. Instalar dependencias:

```bash
npm install
```

2. Configurar `DATABASE_URL` en el entorno local.

3. Emitir el contrato de Prisma cuando corresponda:

```bash
npm run contract:emit
```

4. Iniciar la API:

```bash
npm run dev
```

Por defecto la API se inicia en:

```text
http://localhost:3000
```

## Scripts

| Script | Uso |
| --- | --- |
| `npm run dev` | Ejecuta la API con `tsx watch` |
| `npm run build` | Compila TypeScript |
| `npm start` | Ejecuta `dist/server.js` |
| `npm run contract:emit` | Genera los artefactos del contrato Prisma |

## Estructura principal

```text
src/
├── app.ts
├── server.ts
├── modules/
│   └── products/
│       ├── products.routes.ts
│       ├── products.controller.ts
│       ├── products.service.ts
│       └── products.validation.ts
└── prisma/
    ├── contract.prisma
    ├── contract.json
    ├── contract.d.ts
    └── db.ts

migrations/
└── app/
    └── 20260831T0659_initial_schema/

docs/
├── architecture.md
├── database.md
├── api.md
└── decisions.md
```

## Documentación

- [Arquitectura](docs/architecture.md)
- [Base de datos](docs/database.md)
- [API](docs/api.md)
- [Decisiones técnicas](docs/decisions.md)

## Próximos objetivos

1. Construir el frontend del módulo de productos.
2. Implementar entradas de inventario y actualización atómica del stock.
3. Implementar facturación y detalles de factura.
4. Implementar usuarios y autenticación.
5. Añadir pruebas automatizadas y preparar despliegue.

## Estado del repositorio

La implementación activa de la API se encuentra actualmente en `src/`. Existe un directorio `apps/api/` con un `package.json`, pero todavía no representa la estructura utilizada por los scripts principales. Su propósito deberá decidirse antes de reorganizar el proyecto.
