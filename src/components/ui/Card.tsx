import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, ...props }, ref) => {
    const baseClass = 'rounded-[2rem] overflow-hidden';
    const variantClass = variant === 'outlined' ? 'bg-white border-2 border-maroon/10 shadow-sm' : 'bg-white border-2 border-maroon/5 shadow-xl';
    const hoverClass = hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl' : '';
    
    return (
      <div
        ref={ref}
        className={`${baseClass} ${variantClass} ${hoverClass} ${className || ''}`.trim()}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-8 border-b border-maroon/5 ${className || ''}`.trim()} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={`text-2xl font-black uppercase tracking-tight ${className || ''}`.trim()} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={`p-8 ${className || ''}`.trim()} {...props} />
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
