import type { Metadata } from 'next';
import { Container, Section, Badge, Card } from '@/components/ui';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Building Science Blog',
  description:
    'Technical insights on roof leaks, gutter overflow, dry rot, deferred maintenance, and seasonal property care for Oregon homeowners and facility managers.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = Object.values(BLOG_POSTS);

  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Building Science & Insights
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight mb-6">
            Diagnostic <span className="italic opacity-60">Intelligence.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            Expert advice on protecting your property from the Pacific Northwest&apos;s most persistent threats.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full p-8 hover:border-maroon/40 transition-colors bg-white shadow-lg border-maroon/10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-maroon opacity-60">
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-maroon/20"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-maroon opacity-60">
                      Building Science
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-charcoal leading-tight mb-4 group-hover:text-maroon transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate font-medium mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-maroon font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    Read Intelligence Report &rarr;
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-maroon/10 bg-cream/40 p-8 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-4">
              Need a Fast Answer?
            </h2>
            <p className="mx-auto max-w-2xl text-slate font-medium leading-relaxed mb-6">
              Use the Benson tool suite to estimate repair cost, gauge leak urgency, and build a seasonal maintenance plan before you book field work.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center rounded-2xl bg-oxblood px-8 py-4 text-sm font-black uppercase tracking-widest text-cream transition-colors hover:bg-oxblood/90"
            >
              Explore Diagnostic Tools
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
