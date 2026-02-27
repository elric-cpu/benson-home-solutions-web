import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood/50 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-oxblood text-cream hover:bg-oxblood/90': variant === 'primary',
            'bg-cream text-oxblood border border-oxblood/20 hover:bg-cream/80':
              variant === 'secondary',
            'border-2 border-oxblood text-oxblood bg-transparent hover:bg-oxblood hover:text-cream':
              variant === 'outline',
            'text-oxblood hover:bg-oxblood/10': variant === 'ghost',
            'bg-red-700 text-white hover:bg-red-800': variant === 'emergency',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-5 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
