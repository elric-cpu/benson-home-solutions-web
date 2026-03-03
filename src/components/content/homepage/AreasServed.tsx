import { Badge, Container, Section } from '@/components/ui';

interface AreasServedProps {
  areas: string[];
}

export function AreasServed({ areas }: AreasServedProps) {
  return (
    <Section variant="cream" spacing="md">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Areas We Serve</h2>
          <p className="text-slate mt-4 text-lg">
            Proudly serving communities throughout the Mid-Willamette Valley
            and Harney County.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <Badge
              key={area}
              variant="secondary"
              className="px-4 py-1.5 text-sm"
            >
              {area}
            </Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}
