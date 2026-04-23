type StatusBannerProps = {
  tone: 'loading' | 'error'
  title: string
  message: string
}

export function StatusBanner({ tone, title, message }: StatusBannerProps) {
  const toneClasses =
    tone === 'error'
      ? 'border-danger-100 bg-danger-50 text-danger-500'
      : 'border-brand-100 bg-brand-50 text-brand-700'

  return (
    <section className={`rounded-[1.6rem] border p-5 ${toneClasses}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-2 text-sm leading-7">{message}</p>
    </section>
  )
}
