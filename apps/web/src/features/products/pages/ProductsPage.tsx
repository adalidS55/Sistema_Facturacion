import { useEffect, useState } from 'react'
import { formatCents } from '../../../shared/lib/money'
import { listProducts } from '../api'
import type { Product } from '../types'

type ProductsState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'error'; message: string }

export function ProductsPage() {

  const [state, setState] = useState<ProductsState>({
    status: 'loading',
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setState({ status: 'loading' })
      try {
        const products = await listProducts(controller.signal)
        if (controller.signal.aborted) return
        setState({ status: 'success', products })
      } catch (error) {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los productos',
        })
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [attempt])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Donde Nacho
          </p>
          <h1 className="mt-2 text-3xl font-bold">Productos</h1>
          <p className="mt-2 text-slate-600">
            Consulta los productos activos y sus existencias.
          </p>
        </header>

        {state.status === 'loading' && (
          <p role="status" className="rounded-xl bg-white p-6">
            Cargando productos…
          </p>
        )}

        {state.status === 'error' && (
          <div role="alert" className="rounded-xl bg-red-50 p-6">
            <p className="text-red-800">{state.message}</p>
            <button
              type="button"
              onClick={() => setAttempt((current) => current + 1)}
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {state.status === 'success' && state.products.length === 0 && (
          <p role="status" className="rounded-xl bg-white p-6 text-slate-600">
            No hay productos activos.
          </p>
        )}

        {state.status === 'success' && state.products.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Productos activos, existencias y precios
              </caption>
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">ID</th>
                  <th scope="col" className="px-4 py-3">Código</th>
                  <th scope="col" className="px-4 py-3">Nombre</th>
                  <th scope="col" className="px-4 py-3 text-right">Stock</th>
                  <th scope="col" className="px-4 py-3 text-right">Venta</th>
                  <th scope="col" className="px-4 py-3 text-right">Costo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {state.products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3 font-medium">{product.code}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatCents(product.salePriceCents)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatCents(product.costPriceCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}