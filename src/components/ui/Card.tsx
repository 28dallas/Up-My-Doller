import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: 'green' | 'gold' | 'none'
}

export default function Card({ children, className, glow = 'none' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-6 transition-all duration-300',
        {
          'hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)]': glow === 'green',
          'hover:border-gold/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]': glow === 'gold',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
