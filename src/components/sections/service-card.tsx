import Link from 'next/link';
import { Card } from '@/components/ui';

interface ServiceCardProps {
  title: string;
  slug: { current: string };
  category: string;
  excerpt?: string;
  icon?: string;
  pricingNote?: string;
}

const categoryColors: Record<string, string> = {
  residential: 'bg-green-100 text-green-800',
  commercial: 'bg-blue-100 text-blue-800',
  emergency: 'bg-red-100 text-red-800',
  restoration: 'bg-amber-100 text-amber-800',
};

export function ServiceCard({
  title,
  slug,
  category,
  excerpt,
  icon,
  pricingNote,
}: ServiceCardProps) {
  const href = `/services/${category}/${slug.current}`;

  return (
    <Link href={href} className="group block">
      <Card className="flex h-full flex-col p-6 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          {icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-oxblood)]/10 text-[var(--color-oxblood)]">
              {/* Icon placeholder — integrate lucide-react icons */}
              <span className="text-lg" aria-hidden="true">🔧</span>
            </span>
          )}
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${categoryColors[category] ?? 'bg-gray-100 text-gray-800'}`}
          >
            {category}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-lg font-semibold text-[var(--color-charcoal)] group-hover:text-[var(--color-oxblood)]">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 flex-1 text-sm text-[var(--color-slate)] line-clamp-3">
            {excerpt}
          </p>
        )}

        {pricingNote && (
          <p className="mt-3 text-sm font-medium text-[var(--color-oxblood)]">
            {pricingNote}
          </p>
        )}

        <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--color-oxblood)] group-hover:underline">
          Learn more →
        </span>
      </Card>
    </Link>
  );
}
