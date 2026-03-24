import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary'
}

const variantClasses = {
  default: 'bg-oxblood text-cream border border-transparent',
  secondary: 'bg-cream text-oxblood border border-oxblood/20',
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider', variantClasses[variant], className)}
      {...props}
    />
  )
}
