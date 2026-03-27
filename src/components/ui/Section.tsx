import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'cream' | 'oxblood' | 'charcoal' | 'white';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', spacing = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-white text-charcoal',
      white: 'bg-white text-charcoal',
      cream: 'bg-cream text-charcoal',
      oxblood: 'bg-oxblood text-cream',
      charcoal: 'bg-charcoal text-cream',
    };

    const spacings = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16 lg:py-24',
      lg: 'py-16 md:py-24 lg:py-32',
      xl: 'py-24 md:py-32 lg:py-48',
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], spacings[spacing], className)}
        {...props}
      />
    );
  },
);
Section.displayName = 'Section';
