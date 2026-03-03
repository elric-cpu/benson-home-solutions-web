import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'cream' | 'oxblood' | 'charcoal';
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({
  className,
  variant = 'default',
  spacing = 'md',
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        {
          'bg-surface text-charcoal': variant === 'default',
          'bg-cream text-charcoal': variant === 'cream',
          'bg-oxblood text-cream': variant === 'oxblood',
          'bg-charcoal text-cream': variant === 'charcoal',
        },
        {
          'py-12': spacing === 'sm',
          'py-16 md:py-20': spacing === 'md',
          'py-20 md:py-28': spacing === 'lg',
        },
        className,
      )}
      {...props}
    />
  );
}
