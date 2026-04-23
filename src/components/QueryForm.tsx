import type { FormEvent } from 'react'

type QueryFormProps = {
  query: string
  topK: string
  isSubmitting: boolean
  validationError: string | null
  onQueryChange: (value: string) => void
  onTopKChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function QueryForm({
  query,
  topK,
  isSubmitting,
  validationError,
  onQueryChange,
  onTopKChange,
  onSubmit,
}: QueryFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_-24px_rgba(20,25,38,0.45)] backdrop-blur md:p-8"
    >
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
            Query Workspace
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 md:text-3xl">
            Analyze one support issue across all decision layers
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-600 md:text-base">
            Submit a customer support message to compare grounded response quality, baseline AI
            output, and two urgency prediction methods in one executive-friendly view.
          </p>
        </div>

        <label className="flex w-full flex-col gap-2 md:w-36">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Source Depth
          </span>
          <input
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            value={topK}
            onChange={(event) => onTopKChange(event.target.value)}
            className="h-12 rounded-2xl border border-ink-200 bg-ink-50 px-4 text-base text-ink-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
            aria-label="Top K"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
          Customer Query
        </span>
        <textarea
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          rows={6}
          placeholder="Example: I was charged twice and still cannot log in to my account. Please help."
          className="w-full resize-none rounded-[1.5rem] border border-ink-200 bg-ink-50 px-5 py-4 text-base leading-7 text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
      </label>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-ink-500">
          {validationError ? (
            <p className="rounded-full bg-danger-50 px-4 py-2 font-medium text-danger-500">
              {validationError}
            </p>
          ) : (
            <p>Use realistic support language to get the most meaningful comparison.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(20,25,38,0.75)] transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:bg-ink-400"
        >
          {isSubmitting ? 'Analyzing...' : 'Run Full Analysis'}
        </button>
      </div>
    </form>
  )
}
