import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'emergency';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-maroon text-cream hover:bg-maroon/90 shadow-lg shadow-maroon/20',
      secondary: 'bg-cream text-maroon hover:bg-cream/90 border border-maroon/10',
      outline: 'border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream',
      ghost: 'text-maroon hover:bg-maroon/5',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20',
      emergency: 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? <span className="animate-pulse">Analyzing...</span> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
