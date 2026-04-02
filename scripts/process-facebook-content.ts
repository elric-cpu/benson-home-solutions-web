import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { ai } from '../src/lib/genkit';
import { multimediaSpecialistFlow } from '../src/lib/marketing-agents';

async function processFacebookContent() {
  console.log('--- Processing Facebook Content (Stage 2: Multimedia Generation) ---');
  
  const contentPath = path.resolve(process.cwd(), '.gemini/facebook_content.md');
  if (!fs.existsSync(contentPath)) {
    console.error('facebook_content.md not found!');
    return;
  }
  
  const facebookDrafts = fs.readFileSync(contentPath, 'utf8');

  // Step 1: Run the Multimedia Specialist Agent
  console.log('1. Analyzing content and generating image prompts via Multimedia Agent...');
  const multimediaPlan = await multimediaSpecialistFlow({
    content_draft: facebookDrafts,
    asset_needs: ['3 high-quality Facebook post images matching the 3 drafted options (Foundation, Roof Moss, Dehumidification)'],
  });

  console.log('✅ Generated Prompts:');
  multimediaPlan.image_prompts.forEach((p: string, i: number) => console.log(`  [${i + 1}] ${p}`));

  // Step 2: Generate the images via Vertex AI Imagen 3
  console.log('\n2. Generating images via Vertex AI (imagen-3.0-generate-001)...');
  
  const imagePaths: string[] = [];
  
  for (let i = 0; i < multimediaPlan.image_prompts.length; i++) {
    const prompt = multimediaPlan.image_prompts[i];
    console.log(`Generating Image ${i + 1}...`);
    
    try {
      // Use Vertex AI Imagen model directly
      const response = await ai.generate({
        model: 'vertexai/imagen-3.0-generate-001',
        prompt: prompt + ' photorealistic, architectural photography, hyper-detailed, professional maintenance context, no text in image.',
        output: { format: 'media' },
      });

      const mediaUrl = response.media?.url;
      if (mediaUrl) {
        // mediaUrl is typically a base64 string from Imagen
        const base64Data = mediaUrl.replace(/^data:image\/\w+;base64,/, "");
        const imagePath = `public/images/fb-post-${i + 1}.png`;
        fs.writeFileSync(path.resolve(process.cwd(), imagePath), base64Data, 'base64');
        imagePaths.push(imagePath);
        console.log(`✅ Saved Image ${i + 1} to ${imagePath}`);
      } else {
        console.log(`⚠️ No media returned for Image ${i + 1}`);
        imagePaths.push('');
      }
    } catch (e: any) {
      console.error(`❌ Failed to generate image ${i + 1}:`, e.message);
      imagePaths.push('');
    }
  }

  // Step 3: Append the image paths back to the markdown document
  console.log('\n3. Linking generated assets back to the content document...');
  let updatedContent = facebookDrafts + '\n\n---\n## Generated Assets\n';
  imagePaths.forEach((ip, idx) => {
    if (ip) {
      updatedContent += `\n**Post ${idx + 1} Image:**\n![Post ${idx + 1} Image](/${ip.replace('public/', '')})\n`;
    }
  });

  fs.writeFileSync(contentPath, updatedContent, 'utf8');
  console.log(`✅ Pipeline stage complete. Assets linked in ${contentPath}`);
}

processFacebookContent();
