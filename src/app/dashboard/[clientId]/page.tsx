import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Section, Container, Badge } from '@/components/ui';
import { getMetabaseEmbedUrl } from '@/lib/analytics/metabase';

export const metadata: Metadata = {
  title: 'Property Dashboard | Benson Home Solutions',
  robots: 'noindex, nofollow',
};

async function getClient(id: string) {
  try {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0] || null;
  } catch {
    return null;
  }
}

export default async function ClientDashboardPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const client = await getClient(clientId);

  if (!client) {
    notFound();
  }

  // Dashboard ID from Metabase (placeholder)
  const DASHBOARD_ID = 1; 
  const embedUrl = getMetabaseEmbedUrl(DASHBOARD_ID, clientId);

  return (
    <main className="min-h-screen bg-surface">
      <Section variant="cream" className="pb-8">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">Client Portal</Badge>
              <h1 className="text-3xl font-bold text-charcoal">Welcome, {client.name}</h1>
              <p className="text-slate">Real-time property insights and maintenance health.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          {embedUrl ? (
            <div className="bg-white rounded-2xl shadow-elevated border border-slate/10 overflow-hidden min-h-[800px]">
              <iframe
                src={embedUrl}
                width="100%"
                height="800px"
                frameBorder="0"
                allowTransparency
              />
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate/20">
              <p className="text-slate">Dashboard integration is currently being configured.</p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
