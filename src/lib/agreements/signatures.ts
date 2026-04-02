/**
 * Digital Signature Integration Utility
 * Supports versioned agreements and Google Workspace-backed document requests.
 */
import { createGoogleAgreementDocument } from '@/lib/gcloud/documents';

export interface SignatureRequest {
  agreementId: string;
  clientEmail: string;
  clientName: string;
  documentHtml: string;
  version: number;
}

export type SignatureStatus = 'draft' | 'sent' | 'viewed' | 'signed' | 'declined' | 'expired';

/**
 * Initiates a signature request.
 * Returns the document provider ID and the signing URL.
 */
export async function createSignatureRequest(data: SignatureRequest) {
  const provider = process.env.SIGNATURE_PROVIDER || 'google-workspace';
  const agreementFolderId = process.env.GOOGLE_WORKSPACE_AGREEMENTS_FOLDER_ID;

  if (provider === 'google-workspace') {
    const document = await createGoogleAgreementDocument({
      title: `Agreement - ${data.clientName} - V${data.version}`,
      html: data.documentHtml,
      folderId: agreementFolderId,
    });

    if (document) {
      return {
        providerId: `google-doc-${document.providerId}`,
        signingUrl: document.url,
        status: 'sent' as const,
      };
    }
  }

  const apiKey = process.env.PANDADOC_API_KEY;
  const templateId = process.env.PANDADOC_TEMPLATE_ID;

  if (!apiKey || apiKey === 'PLACEHOLDER') {
    throw new Error(
      `Signature provider "${provider}" is not configured. Set Google Workspace document auth or PandaDoc credentials.`,
    );
  }

  try {
    const response = await fetch('https://api.pandadoc.com/public/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Agreement - ${data.clientName} - V${data.version}`,
        template_uuid: templateId,
        recipients: [
          {
            email: data.clientEmail,
            first_name: data.clientName.split(' ')[0],
            last_name: data.clientName.split(' ').slice(1).join(' '),
            role: 'Client',
          }
        ],
        metadata: {
          agreement_id: data.agreementId,
          version: data.version.toString(),
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`PandaDoc API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    // After creation, we need to send the document to generate the signing link
    const sendResponse = await fetch(`https://api.pandadoc.com/public/v1/documents/${result.id}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Your Agreement for Benson Home Solutions is ready to sign.`,
        subject: `Signature Requested: Benson Home Solutions Agreement`,
        silent: false
      })
    });

    if (!sendResponse.ok) {
      throw new Error(`PandaDoc Send error: ${sendResponse.statusText}`);
    }

    return {
      providerId: result.id,
      signingUrl: `https://app.pandadoc.com/s/${result.id}`, // Placeholder, real flow might use session URL
      status: 'sent' as const,
    };
  } catch (error) {
    console.error('[Signature Error] Failed to create request:', error);
    throw error;
  }
}

/**
 * Checks the status of a document in PandaDoc.
 */
export async function getSignatureStatus(providerId: string): Promise<SignatureStatus> {
  if (providerId.startsWith('google-doc-')) {
    return 'sent';
  }

  const apiKey = process.env.PANDADOC_API_KEY;

  if (!apiKey || apiKey === 'PLACEHOLDER') {
    throw new Error('PandaDoc API credentials are not configured.');
  }

  try {
    const response = await fetch(`https://api.pandadoc.com/public/v1/documents/${providerId}`, {
      headers: {
        'Authorization': `API-Key ${apiKey}`,
      }
    });

    if (!response.ok) {
      throw new Error(`PandaDoc Status error: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Map PandaDoc statuses to our local SignatureStatus
    // document.status codes: 0: draft, 1: sent, 2: viewed, 11: signed, etc.
    const statusMap: Record<number, SignatureStatus> = {
      0: 'draft',
      1: 'sent',
      2: 'viewed',
      11: 'signed',
      12: 'declined',
      13: 'expired'
    };

    return statusMap[result.status] || 'sent';
  } catch (error) {
    console.error('[Signature Error] Failed to check status:', error);
    throw error;
  }
}
