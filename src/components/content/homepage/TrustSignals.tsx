import { Container, Section } from '@/components/ui';

interface Signal {
  label: string;
  detail: string;
}

interface TrustSignalsProps {
  signals: Signal[];
}

export function TrustSignals({ signals }: TrustSignalsProps) {
  return (
    <Section variant="oxblood" spacing="sm">
      <Container>
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {signals.map((signal) => (
            <div key={signal.label}>
              <div className="text-cream text-lg font-semibold">
                {signal.label}
              </div>
              <div className="text-cream/70 mt-1 text-sm">{signal.detail}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
