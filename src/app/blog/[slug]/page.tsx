import { marked } from 'marked';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Container, Section } from '@/components/ui';
import Link from 'next/link';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Benson Home Solutions Blog`,
    description: post.content.split('\n')[0],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.content.split('\n')[0],
      url: `https://www.bensonhomesolutions.com/blog/${slug}`,
      images: ['/opengraph-image'],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const htmlContent = await marked(post.content);

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <h1 className="text-oxblood mb-6 text-5xl leading-tight font-black tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <div className="text-oxblood/60 flex items-center justify-center gap-4 text-sm font-bold tracking-widest uppercase">
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
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow">
          <article className="prose prose-lg max-w-none prose-headings:text-oxblood prose-headings:font-black prose-a:text-oxblood prose-a:underline hover:prose-a:opacity-70">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </article>

          <div className="border-oxblood/10 mt-16 border-t pt-8">
            <Link
              href="/blog"
              className="text-oxblood border-oxblood border-b-2 pb-1 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-70"
            >
              ← Back to Blog
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
