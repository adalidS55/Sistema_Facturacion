# Frontend

## Alcance de esta etapa

Base creada en `apps/web` sobre `main` (`741638f912c2798c86102c2133e88db5fba2bb92`),
en la rama `feature/products-ui`. Se revisaron README, todos los documentos de
`docs`, rutas, controllers, validación, servicio y contrato de Products.

Incluye arranque React, TypeScript estricto, Tailwind 4, comandos de workspace,
proxy de desarrollo y tipos HTTP. La pantalla inicial confirma el arranque;
el CRUD y la conexión HTTP desde los componentes todavía están pendientes.
El backend permanece sin cambios.

## Arranque desde la raíz

```bash
npm ci
npm run dev:api
```

En otra terminal, también desde la raíz:

```bash
npm run dev:web
```

- API: `http://localhost:3000` por defecto; configura `apps/api/.env` como indica README.
- Web: `http://localhost:5173`; el puerto es fijo para evitar cambiarlo silenciosamente.
- Node.js: 22.12+; recomendado Node 24 LTS.
- Verificación: `npm run build:web`, `npm run lint:web`, `npm run typecheck:web`.
- Vista del build: `npm run preview:web`. No incorpora el proxy de desarrollo.

No ejecutar instalaciones independientes en `apps/web`: declarar cada dependencia
en su workspace y mantener el lockfile en la raíz. Para añadir una dependencia:

```bash
npm install nombre-paquete --workspace=@sistema-facturacion/web
```

## Responsabilidades

| Ubicación | Responsabilidad |
| --- | --- |
| `src/main.tsx` | Montar React y cargar estilos globales |
| `src/app/App.tsx` | Componer pantallas y, más adelante, rutas y proveedores |
| `src/features/products/types.ts` | Contrato HTTP de Products, independiente de Prisma |
| `src/features/products/` | Próximamente: cliente de Products, hooks, páginas y formularios |
| `src/shared/api/config.ts` | Base pública de la API |
| `src/shared/ui/` | Componentes reutilizados entre módulos |
| `src/shared/lib/` | Utilidades puras de dinero y fechas |
| `src/styles.css` | Import de Tailwind y estilos base |

Crear `features/inventory`, `features/invoices` y `features/users` cuando se
trabaje en esos módulos. No requieren aplicaciones o repositorios separados.
Los componentes no deben conocer detalles de Prisma ni importar código de la API.

**Por qué features:** agrupa el código que cambia junto. Un formulario de Products
vive junto a su contrato y su acceso HTTP, en lugar de repartirse entre carpetas
globales de todos los formularios y todos los servicios.

**Por qué Vite:** proporciona el servidor de desarrollo y produce los archivos
estáticos del frontend. React maneja la interfaz; TypeScript comprueba tipos;
Tailwind genera CSS a partir de clases. `build` ejecuta TypeScript antes de Vite,
porque compilar el JavaScript por sí solo no verifica sus tipos.

No se incorpora aún un router, estado global ni una biblioteca de consultas.
Estas decisiones se tomarán al construir la funcionalidad, según necesidades reales.

## Entorno y proxy

Sin variables adicionales, el frontend usará `/api`. Vite recibe las peticiones
a `/api/products` en el puerto 5173 y las redirige a `http://localhost:3000`
conservando la ruta. El navegador trabaja con el mismo origen en desarrollo.

Para cambiarlo, copiar `apps/web/.env.example` a `apps/web/.env.local`:

- `API_PROXY_TARGET`: destino del proxy, usado solo por Vite en desarrollo.
- `VITE_API_BASE_URL`: base pública del cliente, por defecto `/api`.

Reiniciar Vite después de modificar el entorno. Las variables `VITE_*` terminan
en el bundle y son visibles al usuario: nunca poner ahí `DATABASE_URL`, claves
privadas o credenciales. En producción se necesita un proxy `/api` o una URL
pública de backend que permita el origen web por CORS.

## Contrato comprobado de Products

| Operación | Método y ruta | Respuesta exitosa |
| --- | --- | --- |
| Listar activos | `GET /api/products` | `{ status: "ok", products: Product[] }` |
| Consultar por ID | `GET /api/products/:id` | `{ status: "ok", product: Product }` |
| Crear | `POST /api/products` | `{ status: "ok", product: Product }`, HTTP 201 |
| Editar completamente | `PUT /api/products/:id` | `{ status: "ok", product: Product }` |
| Desactivar | `DELETE /api/products/:id` | `{ status: "ok", message, product: Product }` |
| Reactivar | `PATCH /api/products/:id/activate` | `{ status: "ok", message, product: Product }` |

Los errores controlados devuelven `{ status: "error", message }`.
Detalle de validaciones y códigos: [API](api.md).

### Límites que debe respetar la UI

1. El listado devuelve solo activos. No existe filtro ni endpoint de listado de
   inactivos: para reactivar, la primera UI ofrecerá consulta por ID y acceso al
   detalle. Un listado general requeriría ampliar explícitamente el backend.
2. `PUT` exige todos los datos editables. Se enviará `active` explícitamente:
   omitirlo hace que el servicio use `true`, incluso al editar un inactivo.
3. No hay paginación ni búsqueda en servidor. No inventar parámetros de consulta.
4. Los precios permanecen en centavos en el modelo y payload. La visualización
   convierte, por ejemplo, `15000` en `150.00`; el formulario convertirá el texto
   decimal a centavos sin depender de multiplicaciones de punto flotante.
5. El contrato no define moneda. Confirmarla antes de fijar un símbolo monetario.
6. Las fechas son strings de timestamp. Al editar, preservar el instante y definir
   explícitamente la conversión entre la hora local del formulario y la API.
7. TypeScript no valida respuestas en ejecución; los tipos documentan el contrato.
   Al implementar fetch, manejar errores HTTP, de red y respuestas inesperadas.

## Siguiente etapa: UI de Products

- Cliente HTTP común y cliente específico de Products con las rutas verificadas.
- Listado activo con carga, error, reintento y estado vacío.
- Crear y ver/editar con validación, guardado en curso y errores del servidor.
- Desactivar y reactivar; refrescar el listado después de cambios exitosos.
- Detalle por ID para recuperar también productos inactivos.
- Utilidades y comprobaciones de conversión monetaria.
- Comprobación integral con API real configurada; no confundir mocks con esa prueba.

## Referencias de configuración

- [Vite](https://vite.dev/guide/)
- [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite)
