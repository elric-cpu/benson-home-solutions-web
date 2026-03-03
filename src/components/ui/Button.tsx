import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'emergency'
    | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          'focus-visible:ring-oxblood/50 inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-oxblood text-cream hover:bg-oxblood/90 shadow-sm':
              variant === 'primary',
            'bg-cream text-oxblood border-oxblood/20 hover:bg-oxblood/5 border':
              variant === 'secondary',
            'border-oxblood text-oxblood hover:bg-oxblood hover:text-cream border-2 bg-transparent':
              variant === 'outline',
            'text-oxblood hover:bg-oxblood/10': variant === 'ghost',
            'bg-red-700 text-white shadow-md shadow-red-900/20 hover:bg-red-800':
              variant === 'emergency',
            'text-oxblood h-auto p-0 underline-offset-4 hover:underline':
              variant === 'link',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-5 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };
