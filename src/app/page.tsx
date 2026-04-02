import Link from 'next/link';
import { Container, Section, Button, Badge, Card, CardHeader, CardContent } from '@/components/ui';
import { StatsSection } from '@/components/content/StatsSection';
import { FAQSection } from '@/components/content/FAQSection';
import { Quote, CheckCircle2 } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { getHomePageContent } from '@/lib/content/site-content';
import { canonicalMetadata } from '@/lib/seo';

export const metadata = canonicalMetadata({
  title: 'Benson Home Solutions | Licensed Oregon Contractor',
  description:
    'Licensed Oregon contractor for home maintenance, emergency restoration, remodeling, and monthly property stewardship across the Mid-Willamette Valley and Harney County.',
  path: '/',
});

/**
 * Benson Home Solutions Home Page - Rebuild V1 (2026)
 * Answer-First SEO Strategy.
 */
export default async function HomePage() {
  const data = await getHomePageContent();

  return (
    <>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg" className="relative overflow-hidden">
        <Container className="text-center relative z-10">
          <Badge variant="secondary" className="mb-8 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Oregon CCB #258533
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-oxblood">
            {data?.heroHeadline || "Stop Reacting to Leaks."} <br />
            <span className="text-oxblood/60 italic">{data?.heroSubheadline || "Start Maintaining."}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            We provide proactive, diagnostic home maintenance for the Mid-Willamette Valley and Harney County. If we aren&apos;t on your property once a month, you aren&apos;t protected.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Link href={data?.heroCtaLink || "/tools/cost-calculator"}>
              <Button size="lg" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20">
                {data?.heroCtaText || "True Cost Calculator"}
              </Button>
            </Link>
            <Link href="/services/maintenance-subscriptions">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood hover:bg-oxblood hover:text-cream">
                View Plans
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-oxblood/60">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-cream bg-oxblood/10 flex items-center justify-center">
                  <span className="text-oxblood text-xs">★</span>
                </div>
              ))}
            </div>
            <span>Join 150+ Protected Properties</span>
          </div>
        </Container>
      </Section>

      {/* Comprehensive Audits / Value Props */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Comprehensive Audits</h3>
              <p className="text-slate font-medium leading-relaxed">
                We find moisture, heat loss, and structural decay before they become insurance claims. Standard inspections are visual; we are diagnostic.
              </p>
            </div>
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Valley Protection</h3>
              <p className="text-slate font-medium leading-relaxed">
                Specifically engineered for the Mid-Willamette Valley climate. Gutters, drainage, and building envelopes optimized for Oregon rain.
              </p>
            </div>
            <div className="group">
              <div className="h-2 w-12 bg-oxblood mb-6 group-hover:w-full transition-all duration-500" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">High Desert Prep</h3>
              <p className="text-slate font-medium leading-relaxed">
                Harney County winterization and wildfire hardening. We protect properties from Burns to Drewsey against extreme climate swings.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section (GEO Focus) */}
      <StatsSection />

      {/* Expert Quote (GEO Focus) */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <Quote className="w-16 h-16 text-oxblood/20 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-4xl font-black italic text-oxblood mb-8 leading-tight tracking-tight">
            &ldquo;A visual home inspection is like checking the oil with the engine off. We go diagnostic because you can&apos;t protect what you can&apos;t see.&rdquo;
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="font-black text-xl uppercase tracking-widest text-oxblood mb-1">
              {BUSINESS.owner}
            </div>
            <div className="text-oxblood/60 font-bold uppercase tracking-widest text-xs">
              Founder & General Contractor
            </div>
          </div>
        </Container>
      </Section>

      {/* Maintenance Subscriptions Preview */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Monthly Protection Plans
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Proactive, board-ready maintenance for every type of property.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Residential</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Monthly Comprehensive Audit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Gutter & Drainage Clearing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">HVAC & Plumbing Health Checks</span>
                  </li>
                </ul>
                <Link href="/services/maintenance-subscriptions">
                  <Button className="w-full font-black uppercase tracking-widest">Plan Details</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-oxblood text-cream">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight">Commercial</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">Board-Ready Asset Reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">Priority 4hr Emergency SLA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cream shrink-0 mt-1" />
                    <span className="font-medium">Lifecycle Expense Mapping</span>
                  </li>
                </ul>
                <Link href="/services/maintenance-subscriptions">
                  <Button variant="secondary" className="w-full font-black uppercase tracking-widest">Plan Details</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Churches</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Historical Asset Preservation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Facility Budget Planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                    <span className="font-medium text-slate">Volunteer Support Systems</span>
                  </li>
                </ul>
                <Link href="/services/maintenance-subscriptions">
                  <Button className="w-full font-black uppercase tracking-widest">Plan Details</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Articles and Tools for Smarter Decisions
            </h2>
            <p className="mx-auto max-w-3xl text-xl font-medium text-slate">
              Before you book a repair, use the site resources built for Oregon leak diagnosis, seasonal maintenance planning, and deferred-cost forecasting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/blog/roof-vent-leak-first-response-oregon" className="rounded-3xl border border-oxblood/10 bg-white p-8 shadow-sm transition-colors hover:border-oxblood/25">
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60 mb-3">Article</div>
              <h3 className="text-2xl font-black tracking-tight text-oxblood mb-3">
                Roof Vent Leak First Response
              </h3>
              <p className="font-medium leading-relaxed text-slate">
                Learn what to document, what to avoid, and when a vent-area leak becomes a same-day problem.
              </p>
            </Link>

            <Link href="/tools/roof-leak-urgency" className="rounded-3xl border border-oxblood/10 bg-white p-8 shadow-sm transition-colors hover:border-oxblood/25">
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60 mb-3">Tool</div>
              <h3 className="text-2xl font-black tracking-tight text-oxblood mb-3">
                Roof Leak Urgency Checker
              </h3>
              <p className="font-medium leading-relaxed text-slate">
                Score active leaks, ceiling stains, attic moisture, and electrical risk before you schedule work.
              </p>
            </Link>

            <Link href="/tools/maintenance-planner" className="rounded-3xl border border-oxblood/10 bg-white p-8 shadow-sm transition-colors hover:border-oxblood/25">
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60 mb-3">Tool</div>
              <h3 className="text-2xl font-black tracking-tight text-oxblood mb-3">
                Oregon Maintenance Planner
              </h3>
              <p className="font-medium leading-relaxed text-slate">
                Generate a seasonal checklist for gutters, roof edges, crawlspaces, windows, and freeze-risk systems.
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ Section (AEO/GEO Focus) */}
      <FAQSection />
    </>
  );
}
