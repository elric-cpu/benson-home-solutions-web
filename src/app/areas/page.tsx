import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { MapPin, ChevronRight } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/constants';
import { canonicalMetadata } from '@/lib/seo';

export const metadata: Metadata = canonicalMetadata({
  title: 'Service Areas',
  description:
    'Benson Home Solutions provides diagnostic property maintenance and emergency restoration across the Mid-Willamette Valley and Harney County, Oregon.',
  path: '/areas',
});

const regions = [
  {
    name: 'Mid-Willamette Valley',
    description: 'Serving Albany, Salem, Keizer, Corvallis, and surrounding communities with moisture management and precision repairs.',
    cities: SERVICE_AREAS.midWillametteValley,
    slugs: {
      'Albany': 'albany',
      'Salem': 'salem',
      'Corvallis': 'corvallis',
      'Keizer': 'keizer',
      'Lebanon': 'lebanon',
      'Monmouth': 'monmouth',
      'Independence': 'independence',
      'Jefferson': 'jefferson',
      'Silverton': 'silverton',
      'Millersburg': 'albany',
      'Philomath': 'corvallis',
    }
  },
  {
    name: 'Harney County',
    description: 'High-desert property preservation and winterization specialists serving Burns, Hines, and remote ranch properties.',
    cities: [...SERVICE_AREAS.harneyCounty, 'Riley', 'Crane', 'Lawen'],
    slugs: {
      'Burns': 'burns',
      'Hines': 'hines',
      'Crane': 'burns', // fallback to burns for now
      'Drewsey': 'drewsey',
      'Riley': 'burns',
      'Lawen': 'burns',
    }
  }
];

export default function AreasPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6">
            Oregon Service Coverage
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight mb-6">
            Where We <span className="italic opacity-60">Operate.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            From the humid valley to the high desert, we provide specialized maintenance for Oregon&apos;s unique climate zones.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12">
            {regions.map((region) => (
              <div key={region.name} className="space-y-8">
                <div className="border-b-2 border-oxblood/10 pb-4">
                  <h2 className="text-3xl font-black text-oxblood uppercase tracking-tight">{region.name}</h2>
                  <p className="text-slate font-medium mt-2">{region.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {region.cities.map((city) => (
                    <Link key={city} href={`/areas/${region.slugs[city as keyof typeof region.slugs] || city.toLowerCase()}`}>
                      <Card className="p-6 group hover:border-oxblood/20 transition-all cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <MapPin className="text-oxblood/40 group-hover:text-oxblood transition-colors" />
                            <span className="font-bold text-lg text-charcoal">{city}</span>
                          </div>
                          <ChevronRight className="text-oxblood/0 group-hover:text-oxblood -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h2 className="text-3xl font-black text-oxblood uppercase tracking-tight mb-6">Outside these areas?</h2>
          <p className="text-lg text-slate mb-8 max-w-xl mx-auto font-medium">
            We occasionally take on specialty diagnostic projects or commercial maintenance contracts outside our primary zones. Reach out to discuss your scope.
          </p>
          <Link href="/contact">
            <Button size="lg" className="font-black uppercase tracking-widest">
              Contact Our Office
            </Button>
          </Link>
        </Container>
      </Section>
    </>
  );
}
