export type RetrievedChunk = {
  doc_id: string
  tweet_id: string
  customer_text: string
  company_reply_text: string | null
  retrieval_text: string
  similarity: number
}

export type RuntimeMetrics = {
  latency_ms: number
  prompt_tokens: number
  output_tokens: number
  total_tokens: number
}

export type PriorityPredictionResponse = {
  text: string
  clean_text: string
  predicted_priority: 'urgent' | 'normal' | string
  confidence: number
  probabilities: Record<string, number>
  reference_accuracy: number | null
  metrics: RuntimeMetrics
}

export type LlmPriorityPredictionResponse = {
  text: string
  clean_text: string
  predicted_priority: 'urgent' | 'normal' | string
  rationale: string
  reference_accuracy: number | null
  metrics: RuntimeMetrics
}

export type AnalyzeRequest = {
  query: string
  top_k: number
}

export type AnalyzeResponse = {
  query: string
  top_k: number
  sources: RetrievedChunk[]
  rag_answer: string
  rag_metrics: RuntimeMetrics
  non_rag_answer: string
  non_rag_metrics: RuntimeMetrics
  ml_priority: PriorityPredictionResponse
  llm_priority: LlmPriorityPredictionResponse
}
