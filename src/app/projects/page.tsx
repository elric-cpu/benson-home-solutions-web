import type { Metadata } from 'next';
import { Container, Section, Button, Badge, Card, CardContent, CardHeader } from '@/components/ui';
import Link from 'next/link';
import { CheckCircle2, ClipboardList, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documented Work',
  description:
    'See the kinds of scopes Benson Home Solutions documents, how work is verified, and what clients receive after emergency, maintenance, and remodel projects in Oregon.',
};

const DOCUMENTED_SCOPES = [
  {
    title: 'Picture Window Replacement',
    summary:
      'A replacement scope built around stopping a persistent leak path, correcting envelope failure, and documenting the repair sequence clearly enough for owner review.',
    proof: [
      'Used in brand guidance as a concrete example of problem-solving work the company is proud of.',
      'Relevant to water-intrusion diagnosis, finish repair, and long-term envelope protection.',
    ],
  },
  {
    title: 'ADA Ramp Access Upgrade',
    summary:
      'An accessibility-driven build scope where the value is functional access, code-minded execution, and clean handoff documentation rather than cosmetic flash.',
    proof: [
      'Named in the operating manual and brand guidance as representative work.',
      'Supports the company position that useful, durable scopes matter more than vanity projects.',
    ],
  },
  {
    title: 'Emergency Water Mitigation and Rebuild',
    summary:
      'Rapid stabilization, moisture tracking, photo documentation, and insurance-ready rebuild planning for Oregon water-loss events.',
    proof: [
      'Matches the live emergency and water-damage service lines on the site.',
      'Clients receive diagnostic notes, risk explanation, and a clear next-step scope instead of a vague cleanup summary.',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6">
            Work Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight mb-6">
            Documented <span className="italic opacity-60">Work.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            We do not publish fabricated case studies. This page shows the real scope categories we document, the standards we use, and the proof package a client can expect.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {DOCUMENTED_SCOPES.map((scope) => (
              <Card key={scope.title} className="h-full border-oxblood/10 bg-white">
                <CardHeader>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-oxblood">
                    {scope.title}
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium text-slate leading-relaxed">{scope.summary}</p>
                  <ul className="space-y-3">
                    {scope.proof.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-oxblood" />
                        <span className="text-sm font-medium text-slate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Card className="border-oxblood/10 bg-white">
            <CardHeader className="flex flex-row items-center gap-4">
              <ClipboardList className="h-6 w-6 text-oxblood" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-oxblood">
                What the Proof Package Includes
              </h2>
            </CardHeader>
            <CardContent className="space-y-3 text-slate">
              <p className="font-medium">Scope summary tied to the failure or maintenance risk.</p>
              <p className="font-medium">Photo documentation and field notes where applicable.</p>
              <p className="font-medium">Material or system recommendations tied to Oregon climate realities.</p>
              <p className="font-medium">A next-step plan for maintenance, repair, or phased rebuild work.</p>
            </CardContent>
          </Card>

          <Card className="border-oxblood/10 bg-oxblood text-cream">
            <CardHeader className="flex flex-row items-center gap-4">
              <PhoneCall className="h-6 w-6" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Need References or Similar Scope Examples?
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="font-medium text-cream/85">
                If you need project references, comparable scope details, or documentation expectations for your property type, request them directly. We would rather provide a truthful reference packet than publish filler.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="font-black uppercase tracking-widest">
                    Request References
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-oxblood font-black uppercase tracking-widest">
                    Review Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
