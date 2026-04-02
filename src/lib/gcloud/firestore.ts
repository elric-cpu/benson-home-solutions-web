import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/datastore'],
});

function requireProjectId() {
  const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
  if (!projectId) {
    throw new Error('GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT is required for Firestore access.');
  }

  return projectId;
}

function documentUrl(collection: string, documentId: string) {
  const currentProject = requireProjectId();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || '(default)';
  return `https://firestore.googleapis.com/v1/projects/${currentProject}/databases/${databaseId}/documents/${collection}/${documentId}`;
}

function collectionUrl(collection: string) {
  const currentProject = requireProjectId();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || '(default)';
  return `https://firestore.googleapis.com/v1/projects/${currentProject}/databases/${databaseId}/documents/${collection}`;
}

async function getHeaders() {
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  return {
    Authorization: `Bearer ${token.token}`,
    'Content-Type': 'application/json',
  };
}

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { mapValue: { fields?: Record<string, FirestoreValue> } }
  | { arrayValue: { values?: FirestoreValue[] } };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

function decodeValue(value: FirestoreValue): unknown {
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('mapValue' in value) {
    return decodeFields(value.mapValue.fields);
  }
  if ('arrayValue' in value) {
    return (value.arrayValue.values || []).map(decodeValue);
  }

  return null;
}

function decodeFields(fields?: Record<string, FirestoreValue>) {
  if (!fields) return {};

  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, decodeValue(value)])
  );
}

function encodeValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }
  if (typeof value === 'string') {
    return { stringValue: value };
  }
  if (typeof value === 'number') {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(item => encodeValue(item)),
      },
    };
  }
  if (typeof value === 'object') {
    return {
      mapValue: {
        fields: encodeFields(value as Record<string, unknown>),
      },
    };
  }

  return { stringValue: String(value) };
}

function encodeFields(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, fieldValue]) => fieldValue !== undefined)
      .map(([key, fieldValue]) => [key, encodeValue(fieldValue)])
  );
}

function decodeDocument<T>(document: FirestoreDocument | null | undefined): T | null {
  if (!document) return null;
  const decoded = decodeFields(document.fields) as T & { id?: string };
  const id = document.name.split('/').pop();
  return {
    ...decoded,
    id,
  };
}

export async function getFirestoreDocument<T>(
  collection: string,
  documentId: string,
): Promise<T | null> {
  try {
    const response = await fetch(documentUrl(collection, documentId), {
      headers: await getHeaders(),
      next: { revalidate: 300 },
      cache: 'force-cache',
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Firestore document fetch failed: ${response.status} ${response.statusText}`);
    }

    const document = (await response.json()) as FirestoreDocument;
    return decodeDocument<T>(document);
  } catch (error) {
    console.error('[Firestore] Document fetch failed:', error);
    return null;
  }
}

export async function listFirestoreDocuments<T>(collection: string): Promise<T[]> {
  try {
    const response = await fetch(collectionUrl(collection), {
      headers: await getHeaders(),
      next: { revalidate: 300 },
      cache: 'force-cache',
    });

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Firestore collection fetch failed: ${response.status} ${response.statusText}`);
    }

    const payload = (await response.json()) as { documents?: FirestoreDocument[] };
    return (payload.documents || [])
      .map(document => decodeDocument<T>(document))
      .filter((document): document is T => document !== null);
  } catch (error) {
    console.error('[Firestore] Collection fetch failed:', error);
    return [];
  }
}

export async function writeFirestoreDocument(
  collection: string,
  documentId: string,
  data: Record<string, unknown>,
) {
  const response = await fetch(documentUrl(collection, documentId), {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify({
      fields: encodeFields(data),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Firestore write failed: ${response.status} ${response.statusText} ${body}`);
  }

  return response.json();
}

export async function createFirestoreDocument(
  collection: string,
  data: Record<string, unknown>,
  documentId = crypto.randomUUID(),
) {
  await writeFirestoreDocument(collection, documentId, data);
  return documentId;
}
