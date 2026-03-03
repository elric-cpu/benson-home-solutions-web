import { Container } from './Container';
import { Section } from './Section';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';

export interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface ResourcesSectionProps {
  resources: Resource[];
  title?: string;
  description?: string;
}

export function ResourcesSection({
  resources,
  title = 'Authoritative Resources',
  description = 'Every page on our site is backed by industry standards, local regulations, and professional associations.',
}: ResourcesSectionProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <Section variant="cream" spacing="md">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-charcoal text-3xl font-bold">{title}</h2>
          <p className="text-slate mt-4">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel={resource.isBacklink ? 'dofollow' : 'noopener noreferrer'}
              className="group"
            >
              <Card
                hover
                className="border-oxblood/10 group-hover:border-oxblood/30 h-full"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    {resource.authority && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] tracking-wider uppercase"
                      >
                        {resource.authority}
                      </Badge>
                    )}
                    {resource.isBacklink && (
                      <span className="text-oxblood/40 text-xs font-bold tracking-tighter uppercase">
                        Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-charcoal group-hover:text-oxblood mb-2 text-lg font-bold transition-colors">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-slate text-sm leading-relaxed">
                      {resource.description}
                    </p>
                  )}
                  <div className="text-oxblood mt-4 flex items-center text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100">
                    View Resource →
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
