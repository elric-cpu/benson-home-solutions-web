import 'dotenv/config';
import { ai } from '../src/lib/genkit';
import { masterMarketingFlow } from '../src/lib/marketing-orchestrator';
import { z } from 'genkit';

/**
 * Benson Home Solutions - Autonomous Marketing & Optimization Loop
 * 
 * 1. Analyzes GSC performance data for "Striking Distance" and "Zero-Click" keywords.
 * 2. Triggers A/B tests or new content generation (Phase 3/4 Scaling).
 * 3. Validates against Elric's authoritative maintenance-first voice.
 */

const GSC_SITE_URL = process.env.GSC_SITE_URL || 'https://bensonhomesolutions.com/';
const BACKEND_URL = process.env.GENKIT_BACKEND_URL || 'https://chatendpoint-acat.a.run.app';

async function fetchGSCPerformance() {
  try {
    const response = await fetch(`${BACKEND_URL}/optimizeSiteEndpoint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: GSC_SITE_URL }),
    });
    if (response.ok) {
      const json = await response.json();
      return json.result; // This is the Markdown report from optimizeSiteFlow
    }
    throw new Error(`Failed to fetch GSC report: ${response.statusText}`);
  } catch (error) {
    console.error('Error fetching GSC performance:', error);
    return null;
  }
}

async function runAutonomousLoop() {
  console.log('🚀 Starting Autonomous Marketing Loop...');

  // Step 1: Get SEO Audit from GSC Data
  console.log('🔍 Analyzing Search Console Performance...');
  const seoReport = await fetchGSCPerformance();
  if (!seoReport) {
    console.log('❌ Could not retrieve SEO report. Aborting loop.');
    return;
  }
  console.log('✅ SEO Report Retrieved.');
  // console.log(seoReport);

  // Step 2: Identify Actionable Opportunities
  const actionAnalysis = await ai.generate({
    system: `You are the Lead Strategist for Benson Home Solutions (CCB #258533).
Analyze the provided SEO Report and decide on a SINGLE high-impact action to take TODAY.
Options:
- NEW_CONTENT: Create a new blog post or guide for a missing keyword.
- AB_TEST: Suggest an A/B test for an existing page with high impressions but low CTR.
- TECH_FIX: Identify a performance or schema issue.

Voice: Elric Benson authoritative, direct, and maintenance-first.`,
    prompt: `Review this SEO Report and pick the most profitable action:\n\n${seoReport}`,
    output: {
      format: 'json',
      schema: z.object({
        action_type: z.enum(['NEW_CONTENT', 'AB_TEST', 'TECH_FIX']),
        reasoning: z.string(),
        target_topic: z.string(),
        target_url: z.string().optional(),
        suggested_headline: z.string().optional(),
        suggested_meta_description: z.string().optional(),
      })
    }
  });

  const decision = actionAnalysis.output;
  if (!decision) {
    console.log('❌ AI failed to reach a decision.');
    return;
  }

  console.log(`\n🎯 Decision: ${decision.action_type}`);
  console.log(`💡 Reasoning: ${decision.reasoning}`);

  // Step 3: Execute Decision
  if (decision.action_type === 'NEW_CONTENT') {
    console.log(`🏗️ Generating new content for: ${decision.target_topic}`);
    const campaign = await masterMarketingFlow({
      topic: decision.target_topic,
      business_goals: 'Capture long-tail search volume and drive maintenance subscriptions.',
      asset_type: 'guide',
      target_url: `${GSC_SITE_URL}blog/${decision.target_topic.toLowerCase().replace(/ /g, '-')}`,
    });
    console.log('✅ Campaign Generated:', campaign.status);
  } else if (decision.action_type === 'AB_TEST') {
    console.log(`🧪 Suggested A/B Test for: ${decision.target_url}`);
    console.log(`Original vs Proposed Meta: ${decision.suggested_meta_description}`);
    // In a full implementation, this could commit a change to a 'tests/' directory or CMS.
    console.log('⚠️ Manual Review required for A/B Test deployment.');
  } else {
    console.log('🛠️ Technical fix identified. Manual intervention recommended.');
  }

  console.log('\n🏁 Loop cycle complete.');
}

runAutonomousLoop();
