import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { Button, Container, Section, Card, CardContent } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS } from '@/lib/constants';

interface EmergencyPageData {
  title?: string;
  metaDescription?: string;
  emergencyPhone?: string;
  afterHoursPhone?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  emergencyServices?: any[];
  responseTimeSLA?: string;
  content?: any[];
}

const emergencyQuery = `*[_type == "emergencyPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch<EmergencyPageData | null>(emergencyQuery);
    return {
      title: page?.title || 'Emergency Services | 24/7 Response',
      description:
        page?.metaDescription ||
        `Emergency board-up, water damage response, and restoration services in the Mid-Willamette Valley. On-site within 60 minutes. Call ${BUSINESS.afterhoursPhone}.`,
    };
  } catch {
    return {
      title: 'Emergency Services | 24/7 Response',
      description: `Emergency board-up, water damage response, and restoration services in the Mid-Willamette Valley. On-site within 60 minutes. Call ${BUSINESS.afterhoursPhone}.`,
    };
  }
}

export default async function EmergencyPage() {
  let fetchedPage: EmergencyPageData | null = null;

  try {
    fetchedPage = await client.fetch<EmergencyPageData | null>(emergencyQuery);
  } catch (error) {
    console.error('Failed to load emergency page data', error);
  }

  // Fallback data structure for when CMS is empty
  const page: EmergencyPageData = fetchedPage || {
    heroHeadline: '24/7 Emergency Response',
    heroSubtext: 'When disaster strikes, Benson Home Solutions is ready. We provide immediate mitigation to protect your property from further damage.',
    responseTimeSLA: 'On-site within 60 minutes in the Mid-Willamette Valley',
    emergencyPhone: BUSINESS.afterhoursPhone,
  };

  const emergencyPhone = page.emergencyPhone || BUSINESS.afterhoursPhone;

  return (
    <>
      {/* Urgent Hero Section */}
      <Section className="bg-red-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100/10 border border-red-100/20 text-red-50 mb-6 font-semibold tracking-wide uppercase text-sm">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" /> Immediate Dispatch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {page.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-red-50 mb-10 leading-relaxed">
              {page.heroSubtext}
            </p>

            <div className="flex flex-col items-center gap-4">
              <a href={`tel:${emergencyPhone}`} className="w-full sm:w-auto">
                <Button variant="emergency" size="lg" className="w-full text-xl h-16 px-8 shadow-xl shadow-red-950/50 border-2 border-red-400">
                  Call Now: {emergencyPhone}
                </Button>
              </a>
              {page.responseTimeSLA && (
                <p className="text-red-100 font-medium mt-2">
                  {page.responseTimeSLA}
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Breakdown */}
      <Section spacing="md" variant="cream">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-charcoal">Emergency Services We Provide</h2>
            <p className="text-slate mt-4 text-lg">We stop the damage, secure the premises, and document everything for your insurance claim.</p>
          </div>

          {page.emergencyServices && page.emergencyServices.length > 0 ? (
            <div className="max-w-4xl mx-auto prose prose-lg">
              <PortableTextRenderer value={page.emergencyServices} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card variant="elevated" className="border-t-4 border-t-oxblood">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold text-charcoal mb-2">Water Damage Mitigation</h3>
                  <p className="text-slate leading-relaxed">Rapid dry-out, extraction, and mold prevention. We stop the spread of water damage immediately.</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="border-t-4 border-t-oxblood">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold text-charcoal mb-2">Emergency Board-Ups</h3>
                  <p className="text-slate leading-relaxed">Secure your property after a fire, break-in, or storm. Temporary fencing, roof tarping, and window boarding.</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="border-t-4 border-t-oxblood">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold text-charcoal mb-2">Storm Damage Repair</h3>
                  <p className="text-slate leading-relaxed">Fallen tree removal, structural bracing, and weatherproofing to protect your home from further exposure.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </Container>
      </Section>

      {/* Process & Trust Content */}
      <Section spacing="md">
        <Container size="narrow">
          {page.content && page.content.length > 0 ? (
            <PortableTextRenderer value={page.content} />
          ) : (
            <div className="prose prose-lg text-slate max-w-none">
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Emergency Process</h2>
              <ol className="list-decimal list-inside space-y-4 mb-8">
                <li><strong>Immediate Response:</strong> Call our 24/7 line and speak directly with our emergency dispatch.</li>
                <li><strong>On-Site Assessment:</strong> Our licensed crew arrives swiftly to assess the danger and stop further damage.</li>
                <li><strong>Securing & Mitigation:</strong> We perform emergency board-ups, water extraction, and structural bracing.</li>
                <li><strong>Insurance Documentation:</strong> We provide detailed, board-ready documentation and photos for your insurance carrier to ensure a smooth claim process.</li>
              </ol>

              <div className="bg-surface border border-border p-6 rounded-xl shadow-sm mt-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Licensed, Bonded, & Insured</h3>
                <p className="mb-0">
                  You need a contractor you can trust when things go wrong. Benson Home Solutions operates under Oregon CCB #{BUSINESS.license.replace('CCB #', '')}. We are fully insured for liability and workers' compensation.
                </p>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
