import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Blog - Benson Home Solutions',
  description:
    'Read articles about home maintenance, repair, and property preservation in Oregon.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - Benson Home Solutions',
    description:
      'Read articles about home maintenance, repair, and property preservation in Oregon.',
    url: 'https://www.bensonhomesolutions.com/blog',
    images: ['/opengraph-image'],
  },
};

export default function BlogPage() {
  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-oxblood mb-8 text-5xl leading-tight font-black tracking-tight md:text-6xl">
            Blog & Resources
          </h1>
          <p className="text-oxblood/80 mx-auto max-w-2xl text-xl font-medium">
            Articles on home maintenance, repair costs, property preservation,
            and practical guidance for Oregon property owners.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow">
          <div className="space-y-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="border-oxblood/10 pb-8 border-b last:border-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <h2 className="text-oxblood group-hover:text-oxblood/70 mb-3 text-2xl font-black tracking-tight transition-colors md:text-3xl">
                    {post.title}
                  </h2>
                </Link>
                <div className="text-oxblood/60 mb-4 flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="text-slate leading-relaxed font-medium">
                  {post.content.split('\n')[0]}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-oxblood group-hover:opacity-70 mt-4 inline-block border-b-2 border-oxblood pb-1 text-xs font-black tracking-widest uppercase transition-opacity"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
