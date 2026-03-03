import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import {
  agreements,
  clients,
  properties,
  agreementVersions,
} from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Section, Container, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { SERVICE_CATALOG } from '@/lib/agreement-engine';
import { AgreementActions } from './AgreementActions';

export const metadata: Metadata = {
  title: 'Service Agreement | Benson Home Solutions',
  robots: 'noindex, nofollow',
};

async function getAgreementData(id: string) {
  try {
    const result = await db
      .select({
        agreement: agreements,
        client: clients,
        property: properties,
      })
      .from(agreements)
      .where(eq(agreements.id, id))
      .innerJoin(clients, eq(agreements.clientId, clients.id))
      .innerJoin(properties, eq(agreements.propertyId, properties.id))
      .limit(1);

    if (!result[0]) return null;

    const versions = await db
      .select()
      .from(agreementVersions)
      .where(eq(agreementVersions.agreementId, id))
      .orderBy(desc(agreementVersions.versionNumber));

    return { ...result[0], versions };
  } catch (error) {
    console.error('Fetch agreement failed', error);
    return null;
  }
}

interface Service {
  service_id: string;
  frequency: string;
  price: number;
  reasoning: string;
}

export default async function AgreementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAgreementData(id);

  if (!data) {
    notFound();
  }

  const { agreement, client, property, versions } = data;
  const services = agreement.services as Service[];
  const latestVersion = versions[0];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Document Header */}
      <Section variant="cream" className="border-b print:bg-white">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-oxblood mb-1 text-2xl font-black">
                BENSON.
              </div>
              <p className="text-slate text-xs font-bold tracking-widest uppercase">
                Home Solutions
              </p>
            </div>
            <div className="text-right md:text-right">
              <Badge variant="secondary" className="mb-2">
                Maintenance Agreement
              </Badge>
              <h1 className="text-charcoal text-xl font-bold">
                {agreement.agreementNumber}
              </h1>
              <p className="text-slate text-sm">
                Issued: {new Date(agreement.createdAt!).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Status Alert */}
            {agreement.status === 'active' && (
              <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 font-bold text-green-800">
                <span>✅</span> This agreement is Active and Fully Signed.
              </div>
            )}

            {/* Parties */}
            <div className="border-slate/10 grid grid-cols-2 gap-8 border-b pb-8">
              <div>
                <h3 className="text-slate/50 mb-4 text-xs font-black tracking-widest uppercase">
                  Contractor
                </h3>
                <div className="text-charcoal font-bold">{BUSINESS.name}</div>
                <p className="text-slate text-sm">
                  Oregon CCB #{BUSINESS.license.replace('CCB #', '')}
                </p>
                <p className="text-slate text-sm">Albany, OR 97321</p>
                <p className="text-slate text-sm">{BUSINESS.phone}</p>
              </div>
              <div>
                <h3 className="text-slate/50 mb-4 text-xs font-black tracking-widest uppercase">
                  Client
                </h3>
                <div className="text-charcoal font-bold">{client.name}</div>
                <p className="text-slate text-sm">
                  {property.standardizedAddress}
                </p>
                <p className="text-slate text-sm">{client.email}</p>
              </div>
            </div>

            {/* Service Schedule */}
            <div>
              <h3 className="text-charcoal mb-6 text-lg font-bold">
                Service Schedule & Scope
              </h3>
              <div className="border-slate/10 overflow-hidden rounded-xl border">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate/5 border-slate/10 border-b">
                      <th className="text-slate px-6 py-4 text-xs font-black tracking-widest uppercase">
                        Service
                      </th>
                      <th className="text-slate px-6 py-4 text-xs font-black tracking-widest uppercase">
                        Frequency
                      </th>
                      <th className="text-slate px-6 py-4 text-right text-xs font-black tracking-widest uppercase">
                        Annual Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-slate/10 divide-y">
                    {services.map((s) => {
                      const catalogItem = SERVICE_CATALOG.find(
                        (i) => i.id === s.service_id,
                      );
                      return (
                        <tr key={s.service_id}>
                          <td className="px-6 py-4">
                            <div className="text-charcoal font-bold">
                              {catalogItem?.name}
                            </div>
                            <p className="text-slate mt-1 text-xs">
                              {s.reasoning}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-sm capitalize">
                            {s.frequency}
                          </td>
                          <td className="text-charcoal px-6 py-4 text-right font-semibold">
                            ${s.price.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-oxblood text-cream font-bold">
                      <td
                        colSpan={2}
                        className="px-6 py-4 text-right text-xs tracking-widest uppercase"
                      >
                        Total Annual Investment
                      </td>
                      <td className="px-6 py-4 text-right">
                        ${Number(agreement.annualPrice).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-12 pt-12">
              <div className="space-y-8">
                <div className="border-charcoal/20 text-slate/30 flex h-20 items-end border-b pb-2 italic">
                  {latestVersion?.signedByBenson ? (
                    <span className="text-oxblood font-bold">
                      /s/ {latestVersion.signedByBenson}
                    </span>
                  ) : (
                    'Contractor Signature'
                  )}
                </div>
                <div>
                  <div className="text-charcoal font-bold">
                    {BUSINESS.owner}
                  </div>
                  <p className="text-slate text-xs">Founder, {BUSINESS.name}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="border-charcoal/20 text-slate/30 flex h-20 items-end border-b pb-2 italic">
                  {latestVersion?.signedByClient ? (
                    <span className="text-oxblood font-bold">
                      /s/ {latestVersion.signedByClient}
                    </span>
                  ) : (
                    'Client Signature'
                  )}
                </div>
                <div>
                  <div className="text-charcoal font-bold">{client.name}</div>
                  <p className="text-slate text-xs">Property Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6 print:hidden">
            <AgreementActions
              agreementId={agreement.id}
              status={agreement.status || 'draft'}
              latestVersionUrl={latestVersion?.documentUrl}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
