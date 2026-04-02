import fs from 'fs';
import path from 'path';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface MediaPlanItem {
  path: string;
  title: string;
  description: string;
  image_prompts: string[];
  video_prompts: string[];
}

async function generateMedia() {
  console.log("🚀 Starting Media Generation...");
  const planPath = path.resolve(process.cwd(), 'docs/MEDIA_PLAN.json');
  const plan: MediaPlanItem[] = JSON.parse(fs.readFileSync(planPath, 'utf-8'));

  const vertexAI = new VertexAI({
    project: process.env.GCLOUD_PROJECT || '',
    location: 'us-central1',
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-pro-preview-0409',
  });

  for (const item of plan) {
    console.log(`  - Generating media for: ${item.path}`);
    const imagePromptRequest = `
      Based on the following page context, generate 3 hyper-specific, detailed prompts for Vertex AI's Imagen 3 model.
      The images must be photorealistic, relevant to the specific service and locality (Mid-Willamette Valley or Harney County, Oregon), and avoid looking like generic stock photos.
      They should reflect the brand voice of Benson Home Solutions: professional, expert, and focused on maintenance.

      Page Title: "${item.title}"
      Page Description: "${item.description}"

      Return ONLY a JSON array of 3 strings.
    `;

    const videoPromptRequest = `
      Based on the following page context, generate 1 detailed prompt for Vertex AI's Veo model to create a short, 15-30 second video.
      The video should be a realistic depiction of a Benson Home Solutions service in Oregon, focusing on the details of the work and the environment.
      It should be informative and align with a maintenance-first brand voice.

      Page Title: "${item.title}"
      Page Description: "${item.description}"

      Return ONLY a JSON array with 1 string.
    `;

    const [imageResponse, videoResponse] = await Promise.all([
      generativeModel.generateContent(imagePromptRequest),
      generativeModel.generateContent(videoPromptRequest),
    ]);

    try {
      const text = imageResponse.response.candidates[0].content.parts[0].text || '';
      item.image_prompts = JSON.parse(text);
    } catch {
      console.warn(`   - Could not parse image prompts for ${item.path}`);
      item.image_prompts = [imageResponse.response.candidates[0].content.parts[0].text || ''];
    }
    
    try {
      const text = videoResponse.response.candidates[0].content.parts[0].text || '';
      item.video_prompts = JSON.parse(text);
    } catch {
      console.warn(`   - Could not parse video prompts for ${item.path}`);
      item.video_prompts = [videoResponse.response.candidates[0].content.parts[0].text || ''];
    }
  }

  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf-8');
  console.log(`✅ Media prompts generated and saved to: ${planPath}`);
}

generateMedia();
