import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

/**
 * Gcloud Auth Manager (Benson Native)
 * Handles service account and user impersonation for Gcloud APIs.
 */
const auth = new GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/webmasters.readonly', // Search Console
  ],
});

export async function getAuthClient() {
  return await auth.getClient();
}

/**
 * Gcloud Search Console client (Agent 01 - Hank's tool)
 */
export async function getSearchConsoleClient() {
  const authClient = await getAuthClient();
  return google.webmasters({
    version: 'v3',
    auth: authClient as any,
  });
}
