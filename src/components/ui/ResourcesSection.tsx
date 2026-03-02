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
  title = "Authoritative Resources", 
  description = "Every page on our site is backed by industry standards, local regulations, and professional associations."
}: ResourcesSectionProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <Section variant="cream" spacing="md">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-charcoal">{title}</h2>
          <p className="mt-4 text-slate">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel={resource.isBacklink ? "dofollow" : "noopener noreferrer"}
              className="group"
            >
              <Card hover className="h-full border-oxblood/10 group-hover:border-oxblood/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {resource.authority && (
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                        {resource.authority}
                      </Badge>
                    )}
                    {resource.isBacklink && (
                      <span className="text-oxblood/40 text-xs font-bold uppercase tracking-tighter">Verified</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal group-hover:text-oxblood transition-colors mb-2">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-sm text-slate leading-relaxed">
                      {resource.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-oxblood text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
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
