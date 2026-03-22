import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto w-full px-4 md:px-6 lg:px-8',
        size === 'default' && 'max-w-7xl',
        size === 'narrow' && 'max-w-3xl',
        className
      )}
      {...props}
    />
  )
);
Container.displayName = 'Container';
