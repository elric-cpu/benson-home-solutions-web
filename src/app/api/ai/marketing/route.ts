import { NextResponse } from 'next/server';
import { generateMarketingAsset } from '@/lib/google-intelligence';
import { getDb } from '@/lib/db';
import { marketingAssets } from '@/lib/db/schema';
import { createFirestoreDocument } from '@/lib/gcloud/firestore';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error';
}

async function persistMarketingAsset(result: Record<string, any>, assetType: string) {
  if (result.status !== 'success') {
    return result;
  }

  const payload = {
    topic: result.topic,
    assetType,
    contentDraft: result.artifacts?.content_draft?.content || '',
    seoStrategy: result.artifacts?.seo_strategy || null,
    multimediaAssets: result.artifacts?.multimedia_assets || null,
    outreachCampaign: result.artifacts?.outreach_campaign || null,
    developerCode: result.artifacts?.developer_code?.component_code || null,
    status: 'approved',
  };

  try {
    const db = getDb();
    await db.insert(marketingAssets).values(payload);
    return { ...result, persistence: 'database' };
  } catch (error) {
    console.warn('[Marketing API] Database persistence unavailable, using Firestore fallback:', error);
    await createFirestoreDocument('ops_marketing_assets', {
      ...payload,
      createdAt: new Date().toISOString(),
    });
    return { ...result, persistence: 'firestore' };
  }
}

function isAuthorized(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  // Private Cloud Run + OIDC-protected Cloud Scheduler requests include these headers.
  const isCloudScheduler = req.headers.get('x-cloudscheduler') === 'true';
  const schedulerJobName = req.headers.get('x-cloudscheduler-jobname');
  return isCloudScheduler && Boolean(schedulerJobName);
}

// Cloud Scheduler or a signed internal caller can send a GET or POST request.
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const topic = "Home Maintenance Checklist for Pacific Northwest Winters";
    const businessGoals = "Increase organic traffic from local homeowners and push them to sign up for our seasonal subscription.";
    const assetType = 'checklist';
    
    const result = await generateMarketingAsset({
      topic,
      businessGoals,
      assetType,
      targetUrl: 'https://bensonhomesolutions.com/winter-checklist',
    });

    return NextResponse.json(await persistMarketingAsset(result, assetType));
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const assetType = body.asset_type || 'guide';

    const result = await generateMarketingAsset({
      topic: body.topic,
      businessGoals: body.business_goals,
      assetType,
      targetUrl: body.target_url || 'https://bensonhomesolutions.com/new-asset',
    });

    return NextResponse.json(await persistMarketingAsset(result, assetType));
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
