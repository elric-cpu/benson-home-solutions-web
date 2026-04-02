import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { ai } from '../src/lib/genkit';

const ITEMS_TO_PLAN = [
  {
    name: "Script Consolidation (The Language Soup)",
    description: "Convert Python, Bash, and PS1 scripts into unified TypeScript (tsx) scripts. e.g. expand_areas.py, create_video.py, export-hostinger-env.sh"
  },
  {
    name: "Genkit Split-Brain Resolution",
    description: "Remove the duplicate ai.defineFlow fallback logic from src/lib/genkit.ts so it strictly acts as a fetch client to the benson-genkit-backend."
  },
  {
    name: "React Component & CSS Simplification",
    description: "Audit UI components to prefer React Server Components where possible, and simplify deep clsx/twMerge chains into static Vanilla CSS or clean Tailwind."
  },
  {
    name: "Deployment & Environment Unification",
    description: "Consolidate Vercel and Hostinger artifacts, decide on a single deployment target, and unify Database schema definitions."
  }
];

const ITERATIONS = 15;

async function generateDeepPlan() {
  console.log(`🚀 Starting ${ITERATIONS}-Loop Deep Reflection Plan Generation...\n`);
  
  let finalDocument = '# Deep Reflected K.I.S.S. Implementation Plan\n\n';
  finalDocument += `*Generated via ${ITERATIONS} autonomous loops of self-critique and refinement per item.*\n\n---\n\n`;

  for (const item of ITEMS_TO_PLAN) {
    console.log(`\n🧠 Analyzing: ${item.name}`);
    
    let currentPlan = `Initial concept: ${item.description}`;

    for (let i = 1; i <= ITERATIONS; i++) {
      process.stdout.write(`  - Loop ${i}/${ITERATIONS} [Critique & Refine]... `);
      
      const prompt = `
You are an elite software architect and principal engineer strictly adhering to the K.I.S.S. (Keep It Simple, Stupid) principle.
We are building an execution plan to clean up this specific part of the codebase: ${item.name}
Original Goal: ${item.description}

Here is the CURRENT DRAFT of the execution plan (Iteration ${i - 1}):
<draft>
${currentPlan}
</draft>

TASK:
Critique this plan ruthlessly. 
1. Are there hidden complexities or over-engineered steps?
2. Are we reinventing the wheel? Can native Node.js/Next.js features handle this better?
3. What edge cases did we miss (e.g., error handling, type safety, CI/CD pipeline impact, backwards compatibility)?
4. How can we make it even simpler, more robust, and easier to maintain for a solo developer?

Output the REFINED PLAN for Iteration ${i}. 
Include specific file paths, code strategies, and step-by-step execution instructions. 
Format as clean Markdown. Do not include conversational filler, just the updated, superior plan.
`;

      try {
        const response = await ai.generate({
          prompt: prompt,
        });
        
        currentPlan = response.text;
        console.log('Done.');
      } catch (e: any) {
        console.log(`❌ Error: ${e.message}`);
        // Wait a few seconds and retry once if rate limited
        if (e.message.includes('429')) {
            console.log('    Rate limited. Waiting 5s...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            i--; // Retry this iteration
        } else {
            break; 
        }
      }
    }
    
    finalDocument += `## ${item.name}\n\n### Final Refined Plan (After ${ITERATIONS} Iterations)\n\n${currentPlan}\n\n---\n`;
  }

  const outPath = path.resolve(process.cwd(), 'docs/DEEP_KISS_PLAN.md');
  fs.writeFileSync(outPath, finalDocument, 'utf8');
  console.log(`\n✅ Plan generation complete. Saved to ${outPath}`);
}

generateDeepPlan();
