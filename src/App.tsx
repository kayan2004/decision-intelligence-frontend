import { type FormEvent, useState } from 'react'
import { analyzeQuery } from './lib/api'
import type { AnalyzeResponse } from './types/analyze'
import { AnswerCard } from './components/AnswerCard'
import { EmptyState } from './components/EmptyState'
import { PriorityCard } from './components/PriorityCard'
import { QueryForm } from './components/QueryForm'
import { SourcesList } from './components/SourcesList'
import { StatusBanner } from './components/StatusBanner'

const DEFAULT_QUERY =
  'I was charged twice and still cannot log in to my account. Please help me fix this today.'

function App() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [topK, setTopK] = useState('5')
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [requestError, setRequestError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedQuery = query.trim()
    const parsedTopK = Number(topK)

    if (!trimmedQuery) {
      setValidationError('Please enter a support issue before running the analysis.')
      return
    }

    if (!Number.isInteger(parsedTopK) || parsedTopK < 1 || parsedTopK > 20) {
      setValidationError('Source depth must be a whole number between 1 and 20.')
      return
    }

    setValidationError(null)
    setRequestError(null)
    setIsSubmitting(true)

    try {
      const response = await analyzeQuery({
        query: trimmedQuery,
        top_k: parsedTopK,
      })
      setResult(response)
    } catch (error) {
      setResult(null)
      setRequestError(
        error instanceof Error
          ? error.message
          : 'The analysis could not be completed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 text-ink-800 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2.25rem] border border-white/70 bg-white/72 p-6 shadow-[0_24px_60px_-30px_rgba(20,25,38,0.45)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
                Decision Intelligence Assistant
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
                Compare support responses and urgency signals in one business-ready dashboard
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-600 md:text-base">
                Designed for stakeholders who need fast, credible insight into how retrieval,
                generation, and priority scoring behave on the same customer issue.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['1 request', 'Full comparison'],
                ['4 outputs', 'Answers + priorities'],
                ['1 view', 'Evidence included'],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-[1.5rem] border border-ink-100 bg-white/80 px-5 py-4"
                >
                  <p className="text-2xl font-semibold text-ink-900">{value}</p>
                  <p className="mt-1 text-sm text-ink-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="mt-6 space-y-6">
          <QueryForm
            query={query}
            topK={topK}
            isSubmitting={isSubmitting}
            validationError={validationError}
            onQueryChange={setQuery}
            onTopKChange={setTopK}
            onSubmit={handleSubmit}
          />

          {isSubmitting ? (
            <StatusBanner
              tone="loading"
              title="Analysis In Progress"
              message="The platform is retrieving evidence, generating both answer variants, and comparing the two urgency prediction methods."
            />
          ) : null}

          {requestError ? (
            <StatusBanner
              tone="error"
              title="Analysis Unavailable"
              message={requestError}
            />
          ) : null}

          {!result && !isSubmitting && !requestError ? <EmptyState /> : null}

          {result ? (
            <section className="space-y-6">
              <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_18px_40px_-24px_rgba(20,25,38,0.45)] backdrop-blur md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Active Brief
                </p>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-4xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
                      Submitted Query
                    </p>
                    <p className="mt-3 text-base leading-8 text-ink-800">{result.query}</p>
                  </div>
                  <div className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                    top_k = {result.top_k}
                  </div>
                </div>
              </div>

              <section className="grid gap-6 xl:grid-cols-2">
                <AnswerCard
                  eyebrow="AI Response Comparison"
                  title="RAG Answer"
                  description="Grounded in retrieved historical support evidence to provide a more context-aware reply."
                  answer={result.rag_answer}
                />
                <AnswerCard
                  eyebrow="AI Response Comparison"
                  title="Non-RAG Answer"
                  description="Generated without retrieval context, showing the baseline model response on the same issue."
                  answer={result.non_rag_answer}
                />
                <PriorityCard
                  kind="ml"
                  eyebrow="Priority Assessment"
                  title="Machine Learning Prediction"
                  description="The trained logistic regression baseline using handcrafted ticket features."
                  prediction={result.ml_priority}
                />
                <PriorityCard
                  kind="llm"
                  eyebrow="Priority Assessment"
                  title="LLM Zero-Shot Prediction"
                  description="Gemini’s urgency assessment using direct instruction without the trained classifier."
                  prediction={result.llm_priority}
                />
              </section>

              <SourcesList sources={result.sources} />
            </section>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default App
