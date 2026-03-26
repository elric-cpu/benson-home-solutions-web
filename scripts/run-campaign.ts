import 'dotenv/config';
import { masterMarketingFlow } from '../src/lib/marketing-orchestrator';

async function main() {
  console.log('Starting full end-to-end campaign generation...');
  try {
    const result = await masterMarketingFlow({
      topic: 'Essential Roofing Maintenance for Oregon Winters',
      business_goals: 'Educate local homeowners and drive sign-ups for seasonal roof inspections.',
      asset_type: 'guide',
      target_url: 'https://www.bensonhomesolutions.com/roof-maintenance',
    });
    console.log(JSON.stringify(result, null, 2));
    if (result.status === 'success') {
      console.log('Campaign generation completed successfully!');
    } else {
      console.log('Campaign generation failed or was rejected:', result.reason);
    }
  } catch (error) {
    console.error('Fatal Error running campaign:', error);
  }
}

main();