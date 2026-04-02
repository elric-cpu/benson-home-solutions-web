import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const baseClass = 'flex h-14 w-full rounded-2xl border-2 border-maroon/10 bg-cream/30 px-6 py-4 text-sm font-bold ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-maroon/30 focus-visible:outline-none focus-visible:border-maroon disabled:cursor-not-allowed disabled:opacity-50 transition-all';
    
    return (
      <input
        type={type}
        className={`${baseClass} ${className || ''}`.trim()}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
