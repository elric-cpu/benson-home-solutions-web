import fs from 'fs';
import path from 'path';
import * as genai from '@google-ai/generativelanguage';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface MediaPlanItem {
  path: string;
  title: string;
  description: string;
  image_prompts: string[];
  video_prompts: string[];
}

async function generateMediaPrompts() {
  console.log("🚀 Starting Media Prompt Generation...");
  const planPath = path.resolve(process.cwd(), 'docs/MEDIA_PLAN.json');
  const plan: MediaPlanItem[] = JSON.parse(fs.readFileSync(planPath, 'utf-8'));

  const genAI = new genai.GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  for (const item of plan) {
    console.log(`  - Generating prompts for: ${item.path}`);
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

    const [imageResult, videoResult] = await Promise.all([
      model.generateContent(imagePromptRequest),
      model.generateContent(videoPromptRequest),
    ]);

    const imageResponse = imageResult.response;
    const videoResponse = videoResult.response;

    try {
      const text = imageResponse.text();
      item.image_prompts = JSON.parse(text);
    } catch {
      console.warn(`   - Could not parse image prompts for ${item.path}`);
      item.image_prompts = [imageResponse.text()];
    }
    
    try {
      const text = videoResponse.text();
      item.video_prompts = JSON.parse(text);
    } catch {
      console.warn(`   - Could not parse video prompts for ${item.path}`);
      item.video_prompts = [videoResponse.text()];
    }
  }

  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf-8');
  console.log(`✅ Media prompts generated and saved to: ${planPath}`);
}

generateMediaPrompts();
