import jwt from 'jsonwebtoken';

/**
 * Metabase Embedding Utility
 * Generates signed JWT tokens for secure dashboard embedding.
 */

const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

export interface MetabaseEmbedConfig {
  resource: { dashboard: number } | { question: number };
  params: Record<string, unknown>;
}

/**
 * Generates a signed Metabase embedding URL.
 *
 * @param config - Resource ID and filter parameters (e.g., client_id)
 * @returns The full signed URL for an iframe src
 */
export function getMetabaseEmbedUrl(
  config: MetabaseEmbedConfig,
): string | null {
  if (!METABASE_SITE_URL || !METABASE_SECRET_KEY) {
    console.warn('[Metabase] Missing environment variables for embedding.');
    return null;
  }

  const payload = {
    resource: config.resource,
    params: config.params,
    exp: Math.round(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const resourceType =
    'dashboard' in config.resource ? 'dashboard' : 'question';

  return `${METABASE_SITE_URL}/embed/${resourceType}/${token}#bordered=true&titled=false`;
}
