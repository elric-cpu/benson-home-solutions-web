import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Verify the secret matches the SANITY_API_READ_TOKEN or a custom preview secret
  if (!process.env.SANITY_API_READ_TOKEN || secret !== process.env.SANITY_API_READ_TOKEN) {
    if (process.env.NODE_ENV !== 'development') {
      return new Response('Invalid token', { status: 401 });
    }
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug ? `/${slug}` : '/');
}
