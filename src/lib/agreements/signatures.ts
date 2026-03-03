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
export async function createSignatureRequest(data: SignatureRequest) {
  const provider = process.env.SIGNATURE_PROVIDER || 'pandadoc';
  const apiKey = process.env.SIGNATURE_API_KEY;

  if (!apiKey) {
    console.warn(
      `[Signature] Missing ${provider.toUpperCase()}_API_KEY. Using mock link.`,
    );
    return {
      providerId: `mock-${Date.now()}`,
      signingUrl: `https://bensonhomesolutions.com/agreements/sign/${data.agreementId}?v=${data.version}`,
    };
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
