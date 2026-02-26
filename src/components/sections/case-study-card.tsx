import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui';

interface CaseStudyCardProps {
  title: string;
  slug: { current: string };
  excerpt?: string;
  heroImageUrl?: string;
  metrics?: { label: string; value: string }[];
  location?: string;
}

export function CaseStudyCard({
  title,
  slug,
  excerpt,
  heroImageUrl,
  metrics,
  location,
}: CaseStudyCardProps) {
  return (
    <Link href={`/projects/${slug.current}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        {heroImageUrl && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-6">
          <h3 className="font-heading text-lg font-semibold text-[var(--color-charcoal)] group-hover:text-[var(--color-oxblood)]">
            {title}
          </h3>

          {location && (
            <p className="mt-1 text-sm text-[var(--color-muted)]">{location}</p>
          )}

          {excerpt && (
            <p className="mt-2 text-sm text-[var(--color-slate)] line-clamp-2">
              {excerpt}
            </p>
          )}

          {metrics && metrics.length > 0 && (
            <div className="mt-4 flex gap-4">
              {metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-lg font-bold text-[var(--color-oxblood)]">
                    {m.value}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
