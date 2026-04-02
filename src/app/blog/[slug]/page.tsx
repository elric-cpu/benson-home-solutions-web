import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section, Badge } from '@/components/ui';
import { getBlogPost, BLOG_POSTS } from '@/lib/blog';
import { BUSINESS } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | Benson Home Solutions`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-to-html conversion for the hardcoded posts
  // Replace ### with h2, ** with bold, etc.
  const formattedContent = post.content
    .split('\n\n')
    .map(paragraph => {
      const html = paragraph.trim();
      if (!html) return null;
      
      if (html.startsWith('### ')) {
        return <h2 key={html} className="text-2xl md:text-3xl font-black text-oxblood uppercase tracking-tight mt-12 mb-6">{html.replace('### ', '')}</h2>;
      }
      
      // Basic bold and italic parsing
      const parseText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-black text-charcoal">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
          }
          return part;
        });
      };

      if (html.startsWith('- ') || html.match(/^\d+\.\s/)) {
        const items = html.split('\n');
        const isNumbered = html.match(/^\d+\.\s/);
        const ListTag = isNumbered ? 'ol' : 'ul';
        const listClass = isNumbered ? 'list-decimal pl-6 space-y-3 mb-8 text-lg font-medium text-slate leading-relaxed' : 'list-disc pl-6 space-y-3 mb-8 text-lg font-medium text-slate leading-relaxed';
        
        return (
          <ListTag key={html} className={listClass}>
            {items.map((item, i) => (
              <li key={i} className="pl-2 marker:text-oxblood/40 marker:font-black">
                {parseText(item.replace(/^-\s|^\d+\.\s/, ''))}
              </li>
            ))}
          </ListTag>
        );
      }

      return (
        <p key={html} className="text-lg font-medium text-slate leading-relaxed mb-6">
          {parseText(html)}
        </p>
      );
    });

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <Badge className="mb-6 bg-oxblood/10 text-oxblood border-oxblood/20 px-4 py-1.5 uppercase tracking-widest font-black">
            {post.date} • {post.author}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-oxblood leading-tight tracking-tight mb-8">
            {post.title}
          </h1>
          <p className="text-xl text-slate font-medium max-w-2xl mx-auto leading-relaxed border-l-4 border-oxblood pl-6 text-left italic">
            {post.excerpt}
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow">
          <div className="prose prose-lg prose-slate mx-auto">
            {formattedContent}
          </div>

          <div className="mt-16 p-8 bg-oxblood/5 rounded-3xl border border-oxblood/10">
            <h3 className="text-2xl font-black text-oxblood uppercase tracking-tight mb-4">
              Stop Reacting. Start Planning.
            </h3>
            <p className="text-slate font-medium mb-6">
              Don&apos;t wait for the damage to become visible. Schedule a diagnostic property audit with {BUSINESS.name} and get a clear picture of your maintenance liabilities.
            </p>
            <a href="/contact" className="inline-block bg-oxblood text-cream px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-oxblood/90 transition-colors">
              Request Your Audit
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
