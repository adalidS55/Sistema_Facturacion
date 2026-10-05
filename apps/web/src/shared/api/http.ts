import { API_BASE_URL } from './config'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function http<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)

  headers.set('Accept', 'application/json')

  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  let body: unknown

  try {
    body = await response.json()
  } catch {
    throw new ApiError(
      'El servidor devolvió una respuesta que no es JSON válido',
      response.status,
    )
  }

  if (!response.ok) {
    let message = `La solicitud falló: HTTP ${response.status}`

    if (
      typeof body === 'object' &&
      body !== null &&
      'message' in body &&
      typeof body.message === 'string'
    ) {
      message = body.message
    }

    throw new ApiError(message, response.status)
  }

  return body as T
}