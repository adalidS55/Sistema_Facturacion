/** Las variables VITE_* son públicas; nunca contienen secretos. */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '')
