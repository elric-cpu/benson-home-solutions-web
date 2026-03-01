import jwt from 'jsonwebtoken';

const METABASE_SITE_URL = process.env.METABASE_SITE_URL || 'https://stats.bensonhomesolutions.com';
const METABASE_EMBED_SECRET = process.env.METABASE_EMBED_SECRET || '';

/**
 * Generates a signed Metabase embedding URL for a client dashboard.
 */
export function getMetabaseEmbedUrl(dashboardId: number, clientId: string) {
  if (!METABASE_EMBED_SECRET) {
    console.warn('[Metabase] Missing METABASE_EMBED_SECRET');
    return null;
  }

  const payload = {
    resource: { dashboard: dashboardId },
    params: {
      client_id: clientId
    },
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };

  const token = jwt.sign(payload, METABASE_EMBED_SECRET);
  return `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false`;
}
