import { google } from 'googleapis';
import { GoogleAuth, JWT, type OAuth2Client } from 'google-auth-library';

type SendMailInput = {
  to: string[];
  subject: string;
  html: string;
  from?: string;
};

function toBase64Url(value: string) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function buildRawMessage({ to, subject, html, from }: SendMailInput) {
  const sender = from || process.env.GOOGLE_WORKSPACE_SENDER || 'office@bensonhomesolutions.com';
  const mime = [
    `From: ${sender}`,
    `To: ${to.join(', ')}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
  ].join('\n');

  return toBase64Url(mime);
}

async function getWorkspaceAuth(): Promise<OAuth2Client | null> {
  const impersonatedUser =
    process.env.GOOGLE_WORKSPACE_IMPERSONATED_USER ||
    process.env.GOOGLE_WORKSPACE_SENDER;

  if (!impersonatedUser) {
    return null;
  }

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    clientOptions: impersonatedUser ? { subject: impersonatedUser } : undefined,
  });

  const client = await auth.getClient();

  if (client instanceof JWT) {
    client.subject = impersonatedUser;
  }

  return client as OAuth2Client;
}

export async function sendGoogleWorkspaceMail(input: SendMailInput) {
  const auth = await getWorkspaceAuth();
  if (!auth) {
    console.warn(
      '[Gmail] GOOGLE_WORKSPACE_SENDER or GOOGLE_WORKSPACE_IMPERSONATED_USER is not configured. Skipping send.'
    );
    return { skipped: true as const };
  }

  const gmail = google.gmail({
    version: 'v1',
    auth,
  });

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: buildRawMessage(input),
    },
  });

  return { skipped: false as const };
}
