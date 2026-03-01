import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { agreements, clients, properties, agreementVersions } from '@/lib/db/schema';
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

export default async function AgreementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getAgreementData(id);

  if (!data) {
    notFound();
  }

  const { agreement, client, property, versions } = data;
  const services = agreement.services as any[];
  const latestVersion = versions[0];

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Document Header */}
      <Section variant="cream" className="border-b print:bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-2xl font-black text-oxblood mb-1">BENSON.</div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate">Home Solutions</p>
            </div>
            <div className="text-right md:text-right">
              <Badge variant="secondary" className="mb-2">Maintenance Agreement</Badge>
              <h1 className="text-xl font-bold text-charcoal">{agreement.agreementNumber}</h1>
              <p className="text-sm text-slate">Issued: {new Date(agreement.createdAt!).toLocaleDateString()}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Container className="mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Status Alert */}
            {agreement.status === 'active' && (
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-800 font-bold">
                <span>✅</span> This agreement is Active and Fully Signed.
              </div>
            )}

            {/* Parties */}
            <div className="grid grid-cols-2 gap-8 border-b border-slate/10 pb-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate/50 mb-4">Contractor</h3>
                <div className="font-bold text-charcoal">{BUSINESS.name}</div>
                <p className="text-sm text-slate">Oregon CCB #{BUSINESS.license.replace('CCB #', '')}</p>
                <p className="text-sm text-slate">Albany, OR 97321</p>
                <p className="text-sm text-slate">{BUSINESS.phone}</p>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate/50 mb-4">Client</h3>
                <div className="font-bold text-charcoal">{client.name}</div>
                <p className="text-sm text-slate">{property.standardizedAddress}</p>
                <p className="text-sm text-slate">{client.email}</p>
              </div>
            </div>

            {/* Service Schedule */}
            <div>
              <h3 className="text-lg font-bold text-charcoal mb-6">Service Schedule & Scope</h3>
              <div className="overflow-hidden border border-slate/10 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate/5 border-b border-slate/10">
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate">Service</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate">Frequency</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate text-right">Annual Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate/10">
                    {services.map((s: any) => {
                      const catalogItem = SERVICE_CATALOG.find(i => i.id === s.service_id);
                      return (
                        <tr key={s.service_id}>
                          <td className="px-6 py-4">
                            <div className="font-bold text-charcoal">{catalogItem?.name}</div>
                            <p className="text-xs text-slate mt-1">{s.reasoning}</p>
                          </td>
                          <td className="px-6 py-4 capitalize text-sm">{s.frequency}</td>
                          <td className="px-6 py-4 text-right font-semibold text-charcoal">${s.price.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-oxblood text-cream font-bold">
                      <td colSpan={2} className="px-6 py-4 text-right uppercase tracking-widest text-xs">Total Annual Investment</td>
                      <td className="px-6 py-4 text-right">${Number(agreement.annualPrice).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-12 pt-12">
              <div className="space-y-8">
                <div className="h-20 border-b border-charcoal/20 flex items-end pb-2 italic text-slate/30">
                  {latestVersion?.signedByBenson ? <span className="text-oxblood font-bold">/s/ {latestVersion.signedByBenson}</span> : 'Contractor Signature'}
                </div>
                <div>
                  <div className="font-bold text-charcoal">{BUSINESS.owner}</div>
                  <p className="text-xs text-slate">Founder, {BUSINESS.name}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="h-20 border-b border-charcoal/20 flex items-end pb-2 italic text-slate/30">
                  {latestVersion?.signedByClient ? <span className="text-oxblood font-bold">/s/ {latestVersion.signedByClient}</span> : 'Client Signature'}
                </div>
                <div>
                  <div className="font-bold text-charcoal">{client.name}</div>
                  <p className="text-xs text-slate">Property Owner</p>
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
