/** Contrato HTTP comprobado en docs/api.md y products.controller.ts. */
export interface Product {
  id: number
  code: string
  name: string
  stock: number
  salePriceCents: number
  costPriceCents: number
  entryDate: string
  active: boolean
  createdAt: string
  updatedAt: string
}

/** Se envía active explícitamente: el backend usa true si se omite. */
export type ProductInput = Pick<
  Product,
  'code' | 'name' | 'stock' | 'salePriceCents' | 'costPriceCents' | 'entryDate' | 'active'
>

export interface ProductsResponse {
  status: 'ok'
  products: Product[]
}

export interface ProductResponse {
  status: 'ok'
  product: Product
  message?: string
}
