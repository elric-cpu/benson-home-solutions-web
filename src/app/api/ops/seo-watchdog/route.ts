import { NextResponse } from 'next/server';
import { logError, logInfo } from '@/lib/gcloud/logging';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bensonhomesolutions.com';

const contentChecks = [
  '/',
  '/about',
  '/areas',
  '/contact',
  '/emergency',
  '/methodology',
  '/plans',
  '/areas/burns/inspection-repairs',
];

const redirectChecks = [
  '/faq',
  '/projects',
  '/terms',
  '/methodology/energy',
  '/services/remodeling',
  '/services/kitchen-remodeling',
  '/services/bathroom-remodeling',
  '/services/maintenance-subscriptions',
  '/tools',
  '/tools/maintenance-roi',
  '/tools/subscription-recommender',
];

const staleSitemapPaths = [
  '/faq',
  '/projects',
  '/terms',
  '/methodology/energy',
  '/services/remodeling',
  '/services/kitchen-remodeling',
  '/services/bathroom-remodeling',
  '/services/maintenance-subscriptions',
  '/tools/maintenance-roi',
  '/tools/subscription-recommender',
];

const contentPatterns = [
  /\[City\]/,
  /2026 Senior Principal Engine/i,
  /Forensic Data Modeling/i,
];

export async function GET(req: Request) {
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

  const failures: string[] = [];
  const checkedAt = new Date().toISOString();

  for (const path of contentChecks) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: 'GET',
        headers: { 'User-Agent': 'benson-seo-watchdog/1.0' },
        cache: 'no-store',
      });

      if (!response.ok) {
        failures.push(`${path} returned ${response.status}`);
        continue;
      }

      const html = await response.text();
      for (const pattern of contentPatterns) {
        if (pattern.test(html)) {
          failures.push(
            `${path} matched forbidden pattern: ${pattern.toString()}`,
          );
        }
      }
    } catch (error) {
      failures.push(`${path} fetch failed`);
      logError(error as Error, { scope: 'seo-watchdog', path });
    }
  }

  for (const path of redirectChecks) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: 'GET',
        headers: { 'User-Agent': 'benson-seo-watchdog/1.0' },
        redirect: 'manual',
        cache: 'no-store',
      });

      if (response.status !== 301 && response.status !== 308) {
        failures.push(
          `${path} expected redirect but returned ${response.status}`,
        );
      }
    } catch (error) {
      failures.push(`${path} redirect check failed`);
      logError(error as Error, { scope: 'seo-watchdog', path });
    }
  }

  try {
    const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`, {
      method: 'GET',
      headers: { 'User-Agent': 'benson-seo-watchdog/1.0' },
      cache: 'no-store',
    });

    if (!sitemapResponse.ok) {
      failures.push(`/sitemap.xml returned ${sitemapResponse.status}`);
    } else {
      const xml = await sitemapResponse.text();
      for (const stalePath of staleSitemapPaths) {
        if (xml.includes(`${BASE_URL}${stalePath}`)) {
          failures.push(`sitemap still contains stale URL: ${stalePath}`);
        }
      }
    }
  } catch (error) {
    failures.push('/sitemap.xml check failed');
    logError(error as Error, { scope: 'seo-watchdog', path: '/sitemap.xml' });
  }

  if (failures.length > 0) {
    logInfo('SEO watchdog found failures', {
      checkedAt,
      failureCount: failures.length,
      failures,
    });
    return NextResponse.json(
      {
        ok: false,
        checkedAt,
        failures,
      },
      { status: 500 },
    );
  }

  logInfo('SEO watchdog passed', {
    checkedAt,
    checkedPages: contentChecks.length,
  });
  return NextResponse.json({
    ok: true,
    checkedAt,
    checkedPages: contentChecks.length,
    checkedRedirects: redirectChecks.length,
  });
}
