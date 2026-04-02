import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
process.env.GOOGLE_CLOUD_PROJECT = 'benson-home-solutions-123';

import { generalChatFlow } from '../src/lib/genkit';

async function testRAG() {
  console.log('--- Testing RAG Chatbot ---');
  const message = "What tools do you own that other contractors don't?";
  console.log(`User: ${message}`);

  try {
    const result = await generalChatFlow({ message });
    console.log(`\nGus: ${result}`);
  } catch (error) {
    console.error('RAG test failed:', error);
  }
}

testRAG();
