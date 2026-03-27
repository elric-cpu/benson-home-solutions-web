import { genkit, z } from 'genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import { onFlow, noAuth } from '@genkit-ai/firebase/functions';
import { getSearchPerformance } from '../gscTool';

const ai = genkit({});

export const optimizeSiteFlow = onFlow(
  ai,
  {
    name: 'optimizeSiteFlow',
    inputSchema: z.string(), // The Site URL
    outputSchema: z.string(),
    authPolicy: noAuth(),
  },
  async (siteUrl) => {
    // Step 1: Get data from the tool
    const performanceData = await getSearchPerformance({ siteUrl, days: 30 });

    // Step 2: Gemini analyzes data for SEO/AEO/GEO gaps
    const response = await ai.generate({
      model: gemini15Flash,
      tools: [getSearchPerformance], // Providing context
      prompt: `
        You are an elite SEO/AEO/GEO Strategist for Benson Home Solutions.
        
        Analyze the Search Performance Data for: ${siteUrl}
        
        Data: ${JSON.stringify(performanceData)}
        
        Identify:
        1. "Striking Distance" keywords (Positions 4-20)
        2. "Zero-Click" opportunities (High impressions, low CTR)
        3. Content gaps for "Maintenance Subscription" topics.
        
        Output a Markdown report with:
        - EXECUTIVE SUMMARY
        - KEYWORD TARGETS (Table: Query, Impressions, Position, Action)
        - CONTENT RECOMMENDATIONS (Specific H2s/H3s to add)
        - GEO-SPECIFIC ACTIONS (For Albany, Lebanon, Harney County)
        
        Focus on answering specific questions users ask about maintenance to optimize for AEO (Answer Engine Optimization).
        Ensure we have content for these queries so Gemini/Perplexity 
           will cite us as the primary source in AI Overviews.
        
        Provide a prioritized list of Markdown edits to maximize REVENUE.
      `,
    });

    return response.text;
  },
);
