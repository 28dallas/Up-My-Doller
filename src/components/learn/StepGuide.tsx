interface StepGuideProps {
  steps: { title: string; body: string }[]
  title?: string
}

export default function StepGuide({ steps, title = 'Step-by-Step Guide' }: StepGuideProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <ol className="space-y-5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="pb-1">
              <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
