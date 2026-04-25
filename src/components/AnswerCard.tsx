import type { RuntimeMetrics } from '../types/analyze'

type AnswerCardProps = {
  eyebrow: string
  title: string
  description: string
  answer: string
  metrics: RuntimeMetrics
}

export function AnswerCard({ eyebrow, title, description, answer, metrics }: AnswerCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-white/60 bg-white/90 p-6 shadow-[0_16px_36px_-28px_rgba(20,25,38,0.45)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-600">{description}</p>
      <div className="mt-5 flex-1 rounded-[1.4rem] bg-ink-50 p-4 text-sm leading-7 text-ink-700">
        {answer}
      </div>
      <div className="mt-4 grid gap-3 rounded-[1.25rem] border border-ink-100 bg-white p-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Latency</p>
          <p className="mt-2 text-lg font-semibold text-ink-900">{metrics.latency_ms.toFixed(0)} ms</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Prompt Tokens</p>
          <p className="mt-2 text-lg font-semibold text-ink-900">{metrics.prompt_tokens}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Output Tokens</p>
          <p className="mt-2 text-lg font-semibold text-ink-900">{metrics.output_tokens}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Total Tokens</p>
          <p className="mt-2 text-lg font-semibold text-ink-900">{metrics.total_tokens}</p>
        </div>
      </div>
    </article>
  )
}
