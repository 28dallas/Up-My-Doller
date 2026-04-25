'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-primary text-black hover:opacity-90 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]': variant === 'primary',
            'border border-primary text-primary hover:bg-primary hover:text-black': variant === 'outline',
            'text-white hover:bg-white/10': variant === 'ghost',
            'bg-gold text-black hover:opacity-90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]': variant === 'gold',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-7 py-3.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
