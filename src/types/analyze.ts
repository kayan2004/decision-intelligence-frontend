export type RetrievedChunk = {
  doc_id: string
  tweet_id: string
  customer_text: string
  company_reply_text: string | null
  retrieval_text: string
  similarity: number
}

export type PriorityPredictionResponse = {
  text: string
  clean_text: string
  predicted_priority: 'urgent' | 'normal' | string
  confidence: number
  probabilities: Record<string, number>
}

export type LlmPriorityPredictionResponse = {
  text: string
  clean_text: string
  predicted_priority: 'urgent' | 'normal' | string
  rationale: string
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
  non_rag_answer: string
  ml_priority: PriorityPredictionResponse
  llm_priority: LlmPriorityPredictionResponse
}
