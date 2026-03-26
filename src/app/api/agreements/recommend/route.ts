import { NextResponse } from 'next/server';
import { pandadocClient } from '@/lib/pandadoc';
import { z } from 'zod';
import { logError } from '@/lib/gcloud/logging';

const recipientSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export async function POST(request: Request) {
  const internalApiKey = process.env.INTERNAL_API_KEY;
  if (!internalApiKey) {
    logError(new Error('INTERNAL_API_KEY is not set.'), { context: 'Agreements Recommend API' });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${internalApiKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requestBody = await request.json();

  const validationResult = recipientSchema.safeParse(requestBody);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message: 'Invalid recipient data.',
        issues: validationResult.error.issues,
      },
      {
        status: 400,
      }
    );
  }

  // This is a placeholder for the data that would be sent to PandaDoc.
  // In a real application, this data would be generated based on the user's
  // selections and CRM data.
  const documentData = {
    name: 'Maintenance Agreement',
    recipients: [
      {
        email: requestBody.email,
        first_name: requestBody.firstName,
        last_name: requestBody.lastName,
        role: 'Client',
      },
    ],
    // Add other document details here.
  };

  try {
    const document = await pandadocClient.createDocument(documentData);
    return NextResponse.json(document);
  } catch (error) {
    console.error('Error creating PandaDoc document:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Could not create the agreement document.',
      },
      {
        status: 500,
      }
    );
  }
}
