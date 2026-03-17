/**
 * Test script for Gumloop Integration
 * Run with: npx tsx scripts/test-gumloop.ts
 */
import { runGumloopFlow } from '../src/lib/ai/gumloop';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('--- Gumloop Integration Test ---');

  const pipelineId =
    process.env.GUMLOOP_PIPELINE_ID || '5KxuaKYH1edeEw14NXbbsv';
  const apiKey = process.env.GUMLOOP_API_KEY;
  const userId = process.env.GUMLOOP_USER_ID;

  if (!apiKey || !userId) {
    console.error(
      '❌ Error: GUMLOOP_API_KEY or GUMLOOP_USER_ID is not set in .env.local',
    );
    process.exit(1);
  }

  const mockInput = {
    property: {
      sqft: 2500,
      age: 35,
      floodZone: 'X',
      buildingType: 'residential',
    },
    service_catalog: [
      {
        id: 'gutter-cleaning',
        name: 'Gutter Cleaning',
        category: 'Envelope',
        applicable_to: ['residential', 'commercial', 'church'],
      },
      {
        id: 'hvac-service',
        name: 'HVAC Seasonal Service',
        category: 'Systems',
        applicable_to: ['residential', 'commercial', 'church'],
      },
    ],
  };

  console.log('🚀 Triggering flow:', pipelineId);
  try {
    const results = await runGumloopFlow(pipelineId, { input_data: mockInput });
    console.log('✅ Success! Outputs:');
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('❌ Integration failed:', error);
  }
}

main();
