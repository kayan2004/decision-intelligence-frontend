import type {
  LlmPriorityPredictionResponse,
  PriorityPredictionResponse,
} from '../types/analyze'

type PriorityCardProps =
  | {
      kind: 'ml'
      eyebrow: string
      title: string
      description: string
      prediction: PriorityPredictionResponse
    }
  | {
      kind: 'llm'
      eyebrow: string
      title: string
      description: string
      prediction: LlmPriorityPredictionResponse
    }

function badgeClasses(priority: string) {
  return priority.toLowerCase() === 'urgent'
    ? 'bg-danger-50 text-danger-500 ring-danger-100'
    : 'bg-success-50 text-success-500 ring-success-50'
}

export function PriorityCard(props: PriorityCardProps) {
  const priority = props.prediction.predicted_priority

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-white/60 bg-white/90 p-6 shadow-[0_16px_36px_-28px_rgba(20,25,38,0.45)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{props.eyebrow}</p>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink-900">{props.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-600">{props.description}</p>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.4rem] bg-ink-50 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Predicted Priority
          </p>
          <div
            className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ring-1 ${badgeClasses(priority)}`}
          >
            {priority}
          </div>
        </div>

        {'confidence' in props.prediction ? (
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Confidence
            </p>
            <p className="mt-3 text-3xl font-semibold text-ink-900">
              {Math.round(props.prediction.confidence * 100)}%
            </p>
          </div>
        ) : null}
      </div>

      {'confidence' in props.prediction ? (
        <div className="mt-4 rounded-[1.4rem] border border-ink-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Probability Split
          </p>
          <div className="mt-4 space-y-3">
            {Object.entries(props.prediction.probabilities).map(([label, probability]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium capitalize text-ink-700">{label}</span>
                  <span className="text-ink-500">{Math.round(probability * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink-100">
                  <div
                    className={`h-2 rounded-full ${label === 'urgent' ? 'bg-danger-500' : 'bg-success-500'}`}
                    style={{ width: `${Math.max(6, probability * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-[1.4rem] border border-ink-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Rationale
          </p>
          <p className="mt-3 text-sm leading-7 text-ink-700">{props.prediction.rationale}</p>
        </div>
      )}
    </article>
  )
}
