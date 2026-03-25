import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import { SERVICE_AREAS, SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';

// --- Data Management ---

const ALL_CITIES = [...SERVICE_AREAS.midWillametteValley, ...SERVICE_AREAS.harneyCounty];

const toSlug = (text: string) => text.toLowerCase().replace(/ /g, '-');
const toTitleCase = (text: string) => text.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

// --- Dynamic Page Generation ---

interface Props {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const city of ALL_CITIES) {
    for (const serviceSlug in SERVICES) {
      params.push({
        city: toSlug(city),
        service: serviceSlug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = toTitleCase(citySlug);
  const serviceInfo = SERVICES[serviceSlug as keyof typeof SERVICES];

  if (!serviceInfo || !ALL_CITIES.map(toSlug).includes(citySlug)) {
    return {};
  }

  const title = `${serviceInfo.title} in ${city}, Oregon | Benson Home Solutions`;
  const description = serviceInfo.description.replace(/\[City\]/g, city);
  const keywords = serviceInfo.keywords.map(k => k.replace(/\[City\]/g, city));

  return { title, description, keywords };
}

export default async function ServiceCityPage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  
  const city = toTitleCase(citySlug);
  const service = SERVICES[serviceSlug as keyof typeof SERVICES];

  if (!service || !ALL_CITIES.map(toSlug).includes(citySlug)) {
    notFound();
  }

  return (
    <main>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            {service.title} in {city}, Oregon
          </h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            {service.description} As a licensed local contractor (CCB #258533), we provide expert, data-driven solutions for your {city} property.
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-10 py-7 text-lg font-black uppercase tracking-widest">
              Get a Quote for Your {city} Project
            </Button>
          </Link>
        </Container>
      </Section>
      
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-4">
              Why Choose Us for {service.title} in {city}?
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Local Expertise</h3>
                <p className="text-slate font-medium">We live and work here. We understand the specific challenges {city} properties face, from seasonal weather to local building codes.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Data-Driven Approach</h3>
                <p className="text-slate font-medium">We use forensic tools, not guesswork. This ensures we identify the root cause of the problem for a long-lasting solution.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Transparent Pricing</h3>
                <p className="text-slate font-medium">You&apos;ll receive a detailed, easy-to-understand quote before any work begins. No surprises, no hidden fees.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Licensed & Insured</h3>
                <p className="text-slate font-medium">We are a fully licensed (CCB #258533), bonded, and insured general contractor for your complete peace of mind.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <Link href="/plans">
              <Button variant="outline" size="lg" className="px-10 py-7 text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                Learn About Our Maintenance Plans
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
