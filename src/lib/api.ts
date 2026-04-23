import type { AnalyzeRequest, AnalyzeResponse } from '../types/analyze'

declare global {
  interface Window {
    __APP_CONFIG__?: {
      VITE_API_BASE_URL?: string
    }
  }
}

const API_BASE_URL =
  window.__APP_CONFIG__?.VITE_API_BASE_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  '/api'

type BackendError = {
  detail?: string
}

export async function analyzeQuery(payload: AnalyzeRequest): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = 'The analysis request failed. Please try again.'

    try {
      const errorBody = (await response.json()) as BackendError
      if (typeof errorBody.detail === 'string' && errorBody.detail.trim()) {
        message = errorBody.detail
      }
    } catch {
      // Keep the default fallback message if the backend did not return JSON.
    }

    throw new Error(message)
  }

  return (await response.json()) as AnalyzeResponse
}
