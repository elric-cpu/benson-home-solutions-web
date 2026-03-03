import Link from 'next/link';
import { Card, CardContent, Container, Section } from '@/components/ui';

interface Service {
  title: string;
  description: string;
  href: string;
}

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What We Do</h2>
          <p className="text-slate mt-4 text-lg">
            Comprehensive property maintenance, restoration, and mitigation
            services tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group">
              <Card hover className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-charcoal group-hover:text-oxblood text-xl font-semibold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
