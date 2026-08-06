import { cn } from '@/lib/utils'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export default function InfoCard({ icon, title, description, className }: InfoCardProps) {
  return (
    <div className={cn('bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-sm', className)}>
      <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
