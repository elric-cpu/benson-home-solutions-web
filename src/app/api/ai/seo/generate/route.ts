import { NextRequest, NextResponse } from 'next/server';
import { generateAnswerFirstSummary } from '@/lib/ai/seo';

/**
 * POST /api/ai/seo/generate
 * Trigger AEO summary generation for a service page.
 */
export async function POST(req: NextRequest) {
  try {
    const { title, content, secret } = await req.json();

    // Basic protection (can be expanded to check actual user session or Sanity secret)
    if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 },
      );
    }

    console.log(`[SEO API] Generating AEO summary for: ${title}`);
    const summary = await generateAnswerFirstSummary(title, content);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('[SEO API] Generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO content' },
      { status: 500 },
    );
  }
}
