import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: 'emerald' | 'none'
}

export default function Card({ children, className, glow = 'none' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-6 transition-all duration-300',
        {
          'hover:border-primary/40 hover:shadow-glow-sm': glow === 'emerald',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
