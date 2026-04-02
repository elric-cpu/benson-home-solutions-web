import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Force correct credentials for the script session
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.cwd(), 'benson-genkit-31726-f661784b7733.json');

import { executeFlow } from '../src/lib/genkit';

async function testGus() {
  console.log('--- Testing Gus Chat Flow via Genkit ---');
  
  try {
    const response = await executeFlow('chat', { 
      message: "What is your CCB number and why should I care about maintenance?"
    });

    console.log('\nResponse from Gus:\n');
    console.log(response.result);

  } catch (error: any) {
    console.error('Error calling Gus:', error.message);
  }
}

async function testEstimator() {
    console.log('\n--- Testing Cost Estimator Flow via Genkit ---');
    
    try {
      const response = await executeFlow('costEstimation', { 
        service: "Roof Moss Removal",
        details: "Heavy moss on North side of a 2000 sqft ranch home in Burns, Oregon",
        zipCode: "97720"
      });
  
      console.log('\nResponse from Estimator:\n');
      console.log(JSON.stringify(response.result, null, 2));
  
    } catch (error: any) {
      console.error('Error calling Estimator:', error.message);
    }
}

async function runTests() {
    await testGus();
    await testEstimator();
}

runTests();
