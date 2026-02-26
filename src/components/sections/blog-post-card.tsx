import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui';

interface BlogPostCardProps {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  author?: { name: string; photoUrl?: string };
}

export function BlogPostCard({
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImageUrl,
  featuredImageAlt,
  author,
}: BlogPostCardProps) {
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${slug.current}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        {featuredImageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={featuredImageUrl}
              alt={featuredImageAlt ?? title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-5">
          <time className="text-xs font-medium text-[var(--color-muted)]">
            {date}
          </time>

          <h3 className="mt-2 font-heading text-base font-semibold text-[var(--color-charcoal)] group-hover:text-[var(--color-oxblood)] line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-2 text-sm text-[var(--color-slate)] line-clamp-2">
              {excerpt}
            </p>
          )}

          {author && (
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              By {author.name}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
