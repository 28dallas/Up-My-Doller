import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'yellow' | 'red' | 'gold' | 'blue' | 'default'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        {
          'bg-success/20 text-success': variant === 'green',
          'bg-warning/20 text-warning': variant === 'yellow',
          'bg-danger/20 text-danger': variant === 'red',
          'bg-gold/20 text-gold': variant === 'gold',
          'bg-blue-500/20 text-blue-400': variant === 'blue',
          'bg-white/10 text-white/70': variant === 'default',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
