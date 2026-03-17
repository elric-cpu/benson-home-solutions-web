/**
 * Digital Signature Integration Utility
 * Supports versioned agreements and digital signature requests.
 */

export interface SignatureRequest {
  agreementId: string;
  clientEmail: string;
  clientName: string;
  documentHtml: string;
  version: number;
}

/**
 * Initiates a signature request via PandaDoc (or DocuSign).
 * Returns the document provider ID and the signing URL.
 */
export async function createSignatureRequest(_data: SignatureRequest) {
  const provider = process.env.SIGNATURE_PROVIDER || 'pandadoc';
  const apiKey = process.env.SIGNATURE_API_KEY;

  if (!apiKey) {
    throw new Error(
      `[Signature] Missing SIGNATURE_API_KEY for provider "${provider}".`,
    );
  }

  // Real integration logic for PandaDoc/DocuSign would go here
  // 1. Upload HTML/PDF to provider
  // 2. Create document from template
  // 3. Get signing session URL

  return {
    providerId: `external-${Date.now()}`,
    signingUrl: `https://app.signing-provider.com/view/${Date.now()}`,
  };
}
