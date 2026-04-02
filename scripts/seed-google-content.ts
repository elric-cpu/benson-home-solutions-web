import { loadEnvConfig } from '@next/env';
import { writeFirestoreDocument } from '@/lib/gcloud/firestore';
import {
  fallbackFaqs,
  fallbackStats,
} from '@/lib/content/site-content';

loadEnvConfig(process.cwd());

const root = process.env.FIRESTORE_CONTENT_ROOT || 'website_content';

async function seed() {
  await writeFirestoreDocument(`${root}_pages`, 'home', {
    heroHeadline: 'Stop Reacting to Leaks.',
    heroSubheadline: 'Start Maintaining.',
    heroCtaText: 'True Cost Calculator',
    heroCtaLink: '/tools/cost-calculator',
  });

  await Promise.all(
    fallbackStats.map((stat, index) =>
      writeFirestoreDocument(`${root}_stats`, `stat_${index + 1}`, {
        ...stat,
        order: stat.order || index + 1,
      })
    )
  );

  await Promise.all(
    fallbackFaqs.map((faq, index) =>
      writeFirestoreDocument(`${root}_faqs`, `faq_${index + 1}`, faq)
    )
  );
}

seed().then(
  () => {
    console.log('Firestore content seed complete.');
  },
  error => {
    console.error('Firestore content seed failed:', error);
    process.exitCode = 1;
  }
);
