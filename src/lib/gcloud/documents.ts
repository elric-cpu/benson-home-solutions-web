import { google } from 'googleapis';
import { GoogleAuth, JWT, type OAuth2Client } from 'google-auth-library';
import { convertHtmlToGoogleDocText } from '@/lib/google-migration/helpers';

async function getWorkspaceDocumentAuth(): Promise<OAuth2Client | null> {
  const impersonatedUser =
    process.env.GOOGLE_WORKSPACE_IMPERSONATED_USER ||
    process.env.GOOGLE_WORKSPACE_SENDER;

  if (!impersonatedUser) {
    return null;
  }

  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive',
    ],
    clientOptions: { subject: impersonatedUser },
  });

  const client = await auth.getClient();
  if (client instanceof JWT) {
    client.subject = impersonatedUser;
  }

  return client as OAuth2Client;
}

type AgreementDocumentInput = {
  title: string;
  html: string;
  folderId?: string;
};

export async function createGoogleAgreementDocument({
  title,
  html,
  folderId,
}: AgreementDocumentInput) {
  const auth = await getWorkspaceDocumentAuth();
  if (!auth) {
    throw new Error(
      'Google Workspace document auth is not configured. Set GOOGLE_WORKSPACE_SENDER or GOOGLE_WORKSPACE_IMPERSONATED_USER.',
    );
  }

  const docs = google.docs({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  const created = await docs.documents.create({
    requestBody: {
      title,
    },
  });

  const documentId = created.data.documentId;
  if (!documentId) {
    throw new Error('Google Docs did not return a document ID.');
  }

  await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: convertHtmlToGoogleDocText(html),
          },
        },
      ],
    },
  });

  if (folderId) {
    const file = await drive.files.get({
      fileId: documentId,
      fields: 'parents',
    });
    const previousParents = (file.data.parents || []).join(',');

    await drive.files.update({
      fileId: documentId,
      addParents: folderId,
      removeParents: previousParents || undefined,
      fields: 'id, webViewLink',
    });
  }

  return {
    providerId: documentId,
    url: `https://docs.google.com/document/d/${documentId}/edit`,
  };
}
