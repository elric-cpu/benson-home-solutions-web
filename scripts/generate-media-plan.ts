import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface MediaPlanItem {
  path: string;
  title: string;
  description: string;
  image_prompts: string[];
  video_prompts: string[];
}

async function createMediaPlan() {
  console.log("🚀 Starting Media Plan Generation...");
  const pagesDir = path.resolve(process.cwd(), 'src/app');
  const files = await glob('**/page.tsx', { cwd: pagesDir });

  const plan: MediaPlanItem[] = [];

  for (const file of files) {
    const pagePath = path.join(pagesDir, file);
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

    const descriptionMatch = content.match(/<p[^>]*>([^<]+)<\/p>/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : 'No description found.';

    const item: MediaPlanItem = {
      path: `/${file.replace(/\\/g, '/').replace(/\/page\.tsx$/, '')}`,
      title,
      description,
      image_prompts: [],
      video_prompts: [],
    };
    
    plan.push(item);
  }

  const planPath = path.resolve(process.cwd(), 'docs/MEDIA_PLAN.json');
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf-8');

  console.log(`✅ Media plan generated with ${plan.length} items.`);
  console.log(`   Saved to: ${planPath}`);
}

createMediaPlan();
