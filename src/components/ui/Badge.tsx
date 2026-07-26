import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'yellow' | 'red' | 'blue' | 'gold' | 'default' | 'live'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold',
        {
          'bg-primary/15 text-primary border border-primary/25': variant === 'green',
          'bg-warning/15 text-warning border border-warning/25': variant === 'yellow',
          'bg-danger/15 text-danger border border-danger/25': variant === 'red',
          'bg-blue-500/15 text-blue-400 border border-blue-500/25': variant === 'blue',
          'bg-gold/15 text-gold border border-gold/25': variant === 'gold',
          'bg-zinc-800 text-zinc-400 border border-zinc-700': variant === 'default',
          'bg-primary/10 text-primary border border-primary/30 gap-1.5': variant === 'live',
        },
        className
      )}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live" />
      )}
      {children}
    </span>
  )
}
