import { http } from '../../shared/api/http'
import type { ProductInput, ProductResponse, ProductsResponse } from './types'

export async function listProducts(signal?: AbortSignal) {
  const response = await http<ProductsResponse>('/products', {
    signal,
  })
  return response.products
}

export async function getProduct(
  id: number,
  signal?: AbortSignal,
) {
  const response = await http<ProductResponse>(`/products/${id}`, {
    signal,
  })
  return response.product
}

export async function createProduct(data: ProductInput) {
  const response = await http<ProductResponse>('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.product
}

export async function updateProduct(
  id: number,
  data: ProductInput,
) {
  const response = await http<ProductResponse>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return response.product
}

export async function deactivateProduct(id: number) {
  const response = await http<ProductResponse>(`/products/${id}`, {
    method: 'DELETE',
  })
  return response.product
}

export async function activateProduct(id: number) {
  const response = await http<ProductResponse>(
    `/products/${id}/activate`,
    {
      method: 'PATCH',
    },
  )
  return response.product
}