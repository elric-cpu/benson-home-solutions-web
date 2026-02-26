import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('container-page py-3', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="no-underline hover:text-heading transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="no-underline hover:text-heading transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-heading" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
