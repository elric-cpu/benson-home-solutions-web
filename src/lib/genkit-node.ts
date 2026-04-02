import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/google-genai';

const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const defaultModel = vertexAI.model('gemini-2.5-flash');

export const ai = genkit({
  plugins: [
    vertexAI({
      location,
      projectId,
    }),
  ],
  model: defaultModel,
});

export { defaultModel };
