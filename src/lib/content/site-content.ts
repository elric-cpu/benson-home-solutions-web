import { client as sanityClient } from '@/sanity/lib/client';
import {
  ABOUT_PAGE_QUERY,
  EMERGENCY_PAGE_QUERY,
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries';
import { getFirestoreDocument, listFirestoreDocuments } from '@/lib/gcloud/firestore';
import { pickFirstNonEmptyArray } from '@/lib/google-migration/helpers';

const root = process.env.FIRESTORE_CONTENT_ROOT || 'website_content';

export type FaqItem = {
  id?: string;
  question: string;
  answer: string;
};

export type StatItem = {
  id?: string;
  label: string;
  value: string;
  description: string;
  icon?: string;
  citation?: string;
  order?: number;
};

export type HomePageContent = {
  id?: string;
  title?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  stats?: StatItem[];
  faqItems?: FaqItem[];
};

export type ServicePageContent = {
  id?: string;
  title: string;
  slug: { current: string };
  metaDescription?: string;
  heroImage?: Record<string, unknown> | null;
  heroHeadline?: string;
  content?: unknown[];
  serviceArea?: { title: string; slug: { current: string } }[];
  pricingNote?: string;
  ctaText?: string;
  ctaLink?: string;
  faqItems?: FaqItem[];
  relatedServices?: Array<{
    id?: string;
    title: string;
    slug: { current: string };
    heroImage?: Record<string, unknown> | null;
  }>;
};

export const fallbackStats: StatItem[] = [
  {
    label: 'Maintenance ROI',
    value: '3x',
    description: 'Every $1 spent on proactive care saves $3 in emergency repairs.',
    icon: 'TrendingUp',
    citation: 'Industry Standard (BOMA)',
    order: 1,
  },
  {
    label: 'Property Protection',
    value: '100%',
    description: 'Zero undetected leaks for clients on our monthly protection plan.',
    icon: 'ShieldCheck',
    order: 2,
  },
  {
    label: 'Response Time',
    value: '< 4hr',
    description: 'Guaranteed emergency response for subscription members.',
    icon: 'Clock',
    order: 3,
  },
  {
    label: 'Customer Rating',
    value: '4.9/5',
    description: 'Based on 200+ comprehensive audits and restoration projects.',
    icon: 'Star',
    order: 4,
  },
];

export const fallbackFaqs: FaqItem[] = [
  {
    question:
      "What is a 'Maintenance-First' subscription?",
    answer:
      "A 'Maintenance-First' subscription is a proactive property care program where Benson Home Solutions performs regular comprehensive audits of your property and resolves issues before they become expensive failures.",
  },
  {
    question: 'Why do I need monthly property protection in Oregon?',
    answer:
      "The Mid-Willamette Valley's rainfall and humidity make properties vulnerable to mold, rot, and drainage failures. Regular checks keep the envelope and drainage systems working before water damage takes hold.",
  },
  {
    question: "How is a 'Comprehensive Audit' different from a standard home inspection?",
    answer:
      'Standard inspections are primarily visual. Our audits are diagnostic and focused on moisture, heat loss, structural risk, and maintenance planning.',
  },
  {
    question: 'Do you serve Harney County for property maintenance?',
    answer:
      'Yes. We provide high-desert maintenance and winterization support from Burns to Drewsey.',
  },
];

const fallbackHomePage: HomePageContent = {
  heroHeadline: 'Stop Reacting to Leaks.',
  heroSubheadline: 'Start Maintaining.',
  heroCtaText: 'True Cost Calculator',
  heroCtaLink: '/tools/cost-calculator',
  stats: fallbackStats,
  faqItems: fallbackFaqs,
};

async function fetchLegacyHomePage() {
  try {
    return await sanityClient.fetch<HomePageContent | null>(HOME_PAGE_QUERY);
  } catch (error) {
    console.warn('[Content] Legacy home page fetch failed:', error);
    return null;
  }
}

async function fetchLegacyStats() {
  try {
    return await sanityClient.fetch<StatItem[]>(
      `*[_type == "stat"] | order(order asc)`
    );
  } catch (error) {
    console.warn('[Content] Legacy stats fetch failed:', error);
    return [];
  }
}

async function fetchLegacyFaqs() {
  try {
    return await sanityClient.fetch<FaqItem[]>(
      `*[_type == "faq"] | order(_createdAt asc)`
    );
  } catch (error) {
    console.warn('[Content] Legacy FAQ fetch failed:', error);
    return [];
  }
}

async function fetchLegacyServicePage(slug: string) {
  try {
    return await sanityClient.fetch<ServicePageContent | null>(
      `*[_type == "servicePage" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        metaDescription,
        heroImage,
        heroHeadline,
        content[]{
          ...,
          _type == "image" => { ..., asset-> }
        },
        serviceArea[]->{ title, slug },
        pricingNote,
        ctaText,
        ctaLink,
        faqItems[]->{ _id, question, answer },
        relatedServices[]->{ _id, title, slug, heroImage }
      }`,
      { slug }
    );
  } catch (error) {
    console.warn('[Content] Legacy service page fetch failed:', error);
    return null;
  }
}

export async function getHomePageContent() {
  const firestorePage = await getFirestoreDocument<HomePageContent>(`${root}_pages`, 'home');
  const legacyPage = await fetchLegacyHomePage();
  const stats = pickFirstNonEmptyArray(
    (await listFirestoreDocuments<StatItem>(`${root}_stats`)).sort(
      (left, right) => (left.order || 0) - (right.order || 0)
    ),
    firestorePage?.stats,
    legacyPage?.stats,
    await fetchLegacyStats(),
    fallbackStats
  );
  const faqItems = pickFirstNonEmptyArray(
    await listFirestoreDocuments<FaqItem>(`${root}_faqs`),
    firestorePage?.faqItems,
    legacyPage?.faqItems,
    await fetchLegacyFaqs(),
    fallbackFaqs
  );

  return {
    ...fallbackHomePage,
    ...legacyPage,
    ...firestorePage,
    stats,
    faqItems,
  } satisfies HomePageContent;
}

export async function getStatsContent() {
  const homePage = await getHomePageContent();
  return pickFirstNonEmptyArray(homePage.stats, fallbackStats);
}

export async function getFaqContent() {
  const homePage = await getHomePageContent();
  return pickFirstNonEmptyArray(homePage.faqItems, fallbackFaqs);
}

export async function getServicePageContent(slug: string) {
  const firestorePage = await getFirestoreDocument<ServicePageContent>(
    `${root}_service_pages`,
    slug
  );
  const legacyPage = await fetchLegacyServicePage(slug);

  if (!firestorePage && !legacyPage) {
    return null;
  }

  return {
    ...legacyPage,
    ...firestorePage,
    faqItems: pickFirstNonEmptyArray(
      firestorePage?.faqItems,
      legacyPage?.faqItems,
      fallbackFaqs
    ),
  } as ServicePageContent;
}

export async function listServicePageSlugs() {
  const firestorePages = await listFirestoreDocuments<ServicePageContent>(`${root}_service_pages`);

  if (firestorePages.length > 0) {
    return firestorePages
      .map(page => page.slug?.current)
      .filter((slug): slug is string => Boolean(slug));
  }

  try {
    const legacyPages = await sanityClient.fetch<{ slug: { current: string } }[]>(
      `*[_type == "servicePage" && defined(slug.current)]{ slug }`
    );
    return legacyPages.map(page => page.slug.current);
  } catch (error) {
    console.warn('[Content] Legacy service slug fetch failed:', error);
    return [];
  }
}

export async function getAboutPageContent() {
  const firestorePage = await getFirestoreDocument<Record<string, unknown>>(`${root}_pages`, 'about');
  if (firestorePage) return firestorePage;

  try {
    return await sanityClient.fetch(ABOUT_PAGE_QUERY);
  } catch (error) {
    console.warn('[Content] About page fetch failed:', error);
    return null;
  }
}

export async function getEmergencyPageContent() {
  const firestorePage = await getFirestoreDocument<Record<string, unknown>>(`${root}_pages`, 'emergency');
  if (firestorePage) return firestorePage;

  try {
    return await sanityClient.fetch(EMERGENCY_PAGE_QUERY);
  } catch (error) {
    console.warn('[Content] Emergency page fetch failed:', error);
    return null;
  }
}

export async function getSiteSettingsContent() {
  const firestorePage = await getFirestoreDocument<Record<string, unknown>>(`${root}_pages`, 'site_settings');
  if (firestorePage) return firestorePage;

  try {
    return await sanityClient.fetch(SITE_SETTINGS_QUERY);
  } catch (error) {
    console.warn('[Content] Site settings fetch failed:', error);
    return null;
  }
}
