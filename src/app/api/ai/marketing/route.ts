import { NextResponse } from 'next/server';
import { masterMarketingFlow } from '@/lib/marketing-orchestrator';
import { db } from '@/lib/db';
import { marketingAssets } from '@/lib/db/schema';

// Vercel Cron will send a GET or POST request depending on setup
export async function GET(req: Request) {
  // Simple auth for cron or webhook
  const authHeader = req.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const topic = 'Home Maintenance Checklist for Pacific Northwest Winters';
    const businessGoals =
      'Increase organic traffic from local homeowners and push them to sign up for our seasonal subscription.';
    const assetType = 'checklist';

    // Trigger the Genkit Master Flow
    const result = await masterMarketingFlow({
      topic,
      business_goals: businessGoals,
      asset_type: assetType,
      target_url: 'https://www.bensonhomesolutions.com/winter-checklist',
    });

    if (result.status === 'success') {
      // Save approved draft to Database
      await db.insert(marketingAssets).values({
        topic: result.topic,
        assetType: assetType,
        contentDraft:
          ((result.artifacts?.content_draft as Record<string, unknown>)
            ?.content as string) || '',
        seoStrategy: result.artifacts?.seo_strategy || null,
        multimediaAssets: result.artifacts?.multimedia_assets || null,
        outreachCampaign: result.artifacts?.outreach_campaign || null,
        developerCode:
          ((result.artifacts?.developer_code as Record<string, unknown>)
            ?.component_code as string) || null,
        status: 'approved',
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const assetType = body.asset_type || 'guide';

    const result = await masterMarketingFlow({
      topic: body.topic,
      business_goals: body.business_goals,
      asset_type: assetType,
      target_url:
        body.target_url || 'https://www.bensonhomesolutions.com/new-asset',
    });

    if (result.status === 'success') {
      // Save approved draft to Database
      await db.insert(marketingAssets).values({
        topic: result.topic,
        assetType: assetType,
        contentDraft:
          ((result.artifacts?.content_draft as Record<string, unknown>)
            ?.content as string) || '',
        seoStrategy: result.artifacts?.seo_strategy || null,
        multimediaAssets: result.artifacts?.multimedia_assets || null,
        outreachCampaign: result.artifacts?.outreach_campaign || null,
        developerCode:
          ((result.artifacts?.developer_code as Record<string, unknown>)
            ?.component_code as string) || null,
        status: 'approved',
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
