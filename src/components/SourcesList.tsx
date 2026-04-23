import type { RetrievedChunk } from '../types/analyze'

type SourcesListProps = {
  sources: RetrievedChunk[]
}

export function SourcesList({ sources }: SourcesListProps) {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_18px_40px_-24px_rgba(20,25,38,0.45)] backdrop-blur md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            Retrieved Evidence
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 md:text-3xl">
            Similar historical support tickets
          </h2>
        </div>
        <p className="text-sm text-ink-500">Top {sources.length} sources used for grounded analysis.</p>
      </div>

      <div className="mt-6 space-y-4">
        {sources.map((source, index) => (
          <article
            key={`${source.doc_id}-${source.tweet_id}`}
            className="rounded-[1.5rem] border border-ink-100 bg-ink-50/70 p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Source ticket #{source.tweet_id}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-500">{source.doc_id}</p>
                </div>
              </div>

              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-600 ring-1 ring-ink-100">
                Similarity {(source.similarity * 100).toFixed(1)}%
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink-100">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Customer Ticket
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-700">{source.customer_text}</p>
              </div>

              <div className="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink-100">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Company Reply
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-700">
                  {source.company_reply_text || 'No company reply was available for this source ticket.'}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
