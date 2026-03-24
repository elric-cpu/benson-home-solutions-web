import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'cream' | 'oxblood' | 'charcoal'
  spacing?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-transparent',
  cream: 'bg-cream',
  oxblood: 'bg-oxblood text-cream',
  charcoal: 'bg-charcoal text-cream',
}

const spacingClasses = {
  sm: 'py-10 md:py-14',
  md: 'py-14 md:py-20',
  lg: 'py-20 md:py-28',
}

export function Section({ variant = 'default', spacing = 'md', className, ...props }: SectionProps) {
  return <section className={cn(variantClasses[variant], spacingClasses[spacing], className)} {...props} />
}
