import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listVertexModels() {
  console.log("🚀 Attempting to list Vertex AI models via googleapis...");

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Broad scope for Vertex AI
    });
    const authClient = await auth.getClient();

    const aiplatform = google.aiplatform({
      version: 'v1',
      auth: authClient,
    });

    const project = process.env.GCLOUD_PROJECT;
    const location = 'global'; // Use global endpoint

    const parent = `projects/${project}/locations/${location}`;

    // List models from the API
    const res = await aiplatform.projects.locations.models.list({
      parent: parent,
    });

    const models = res.data.models;

    if (models && models.length > 0) {
      console.log('✅ Successfully listed models:');
      models.forEach((model: any) => {
        console.log(`  - ${model.displayName} (ID: ${model.name})`);
      });
    } else {
      console.log('No models found or accessible with the current configuration.');
    }
  } catch (error: any) {
    console.error(`❌ Error listing Vertex AI models: ${error.message}`);
    if (error.message.includes('permission') || error.message.includes('credentials')) {
      console.error('   -> Check GOOGLE_APPLICATION_CREDENTIALS and service account permissions.');
    }
    if (error.message.includes('404') || error.message.includes('NOT_FOUND')) {
      console.error('   -> Model not found. Check model ID and region availability.');
    }
    if (error.message.includes('quota') || error.message.includes('429')) {
      console.error('   -> Quota exceeded. Consider increasing your Vertex AI quotas.');
    }
  }
  console.log("✅ Model listing attempt complete.");
}

listVertexModels();
