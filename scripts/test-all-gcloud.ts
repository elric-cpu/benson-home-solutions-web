import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { generalChatFlow } from '../src/lib/genkit';
import { Storage } from '@google-cloud/storage';
import { AddressValidationClient } from '@googlemaps/addressvalidation';
import { google } from 'googleapis';

async function testAllGcloudIntegrations() {
  console.log('================================================');
  console.log('🧪 Starting Google Cloud Integrations Test Suite');
  console.log('================================================\n');

  let passed = 0;
  let failed = 0;

  // 1. Test Vertex AI (via Genkit)
  console.log('1️⃣  Testing Vertex AI (Genkit RAG Flow)...');
  try {
    await generalChatFlow({ message: "Hello, this is a system test." });
    console.log('✅ Vertex AI: SUCCESS');
    passed++;
  } catch (error: any) {
    console.log(`❌ Vertex AI: FAILED - ${error.message}`);
    failed++;
  }

  // 2. Test Cloud Storage
  console.log('\n2️⃣  Testing Google Cloud Storage...');
  try {
    const storage = new Storage();
    const [buckets] = await storage.getBuckets();
    console.log(`✅ Cloud Storage: SUCCESS (${buckets.length} buckets found)`);
    passed++;
  } catch (error: any) {
    console.log(`❌ Cloud Storage: FAILED - ${error.message}`);
    failed++;
  }

  // 3. Test Address Validation (Google Maps)
  console.log('\n3️⃣  Testing Google Maps Address Validation...');
  try {
    const client = new AddressValidationClient();
    // Just initializing the client doesn't test auth, so we'll do a dummy request
    // If it fails with an auth error, it's working as expected (since we haven't provided a valid API key)
    const request = {
      address: {
        regionCode: 'US',
        locality: 'Mountain View',
        addressLines: ['1600 Amphitheatre Pkwy'],
      },
    };
    await client.validateAddress(request);
    console.log('✅ Address Validation: SUCCESS');
    passed++;
  } catch (error: any) {
    if (error.message.includes('API key') || error.message.includes('credentials')) {
      console.log(`❌ Address Validation: FAILED (Auth Error) - ${error.message}`);
    } else {
       console.log(`❌ Address Validation: FAILED - ${error.message}`);
    }
    failed++;
  }

  // 4. Test Google Search Console (via googleapis)
  console.log('\n4️⃣  Testing Google Search Console API...');
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient,
    });
    await searchconsole.sites.list();
    console.log('✅ Google Search Console: SUCCESS');
    passed++;
  } catch (error: any) {
    console.log(`❌ Google Search Console: FAILED - ${error.message}`);
    failed++;
  }

  console.log('\n================================================');
  console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('================================================');
  
  if (failed > 0) {
    console.log('\n💡 Tip: Run `gcloud auth application-default login` to set up your Application Default Credentials (ADC) if you are encountering authentication errors.');
  }
}

testAllGcloudIntegrations();