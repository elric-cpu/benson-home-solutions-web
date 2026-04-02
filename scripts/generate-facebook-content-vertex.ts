import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Force correct credentials for the script session
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.cwd(), 'benson-genkit-31726-f661784b7733.json');

import { executeFlow } from '../src/lib/genkit';

async function generateFbContent() {
  console.log('--- Generating Facebook Content via Vertex AI / Genkit Flow ---');
  
  const imagePrompts = [
    "A professional contractor diagnosing a leaky roof in Oregon rain, CCB #258533 style",
    "Close up of specialized interior concrete saw cutting through a foundation wall",
    "Before and after of a home maintenance project showing moss removal"
  ];

  try {
    const response = await executeFlow('marketingContent', { 
      imagePrompts,
      videoPrompts: ["Quick clip of rain gutter being cleaned properly"]
    });

    console.log('\nGenerated Marketing Content Response:\n');
    console.log(JSON.stringify(response.result, null, 2));

  } catch (error: any) {
    console.error('Error generating content:', error.message);
    if (error.responseBody) {
        console.error('Response Body:', error.responseBody);
    }
  }
}

generateFbContent();
