export interface PandaDocCreateDocumentData {
  name: string;
  template_uuid: string;
  recipients: {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  }[];
  tokens: {
    name: string;
    value: string;
  }[];
  metadata: Record<string, unknown>;
}
