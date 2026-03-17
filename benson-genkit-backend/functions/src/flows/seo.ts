import { genkit, z } from "genkit";
import { gemini15Flash } from "@genkit-ai/googleai";
import { getSearchPerformance } from "../gscTool";

const ai = genkit({});

export const optimizeSiteFlow = ai.defineFlow(
  {
    name: "optimizeSiteFlow",
    inputSchema: z.string(), // The Site URL
    outputSchema: z.string(),
  },
  async (siteUrl) => {
    // Step 1: Get data from the tool
    const performanceData = await getSearchPerformance({ siteUrl });

    // Step 2: Gemini analyzes data for SEO/AEO/GEO gaps
    const response = await ai.generate({
      model: gemini15Flash,
      tools: [getSearchPerformance], // Providing context
      prompt: `
        Analyze the following Google Search Console data for ${siteUrl}:
        ${JSON.stringify(performanceData)}

        Identify:
        1. SEO "Quick Wins": Queries with high impressions (top 10%) but low CTR. 
        2. AEO Opportunity: Queries phrased as questions where we are not in position 1.
        3. GEO Strategy: How to rephrase content for these queries so Gemini/Perplexity 
           will cite us as the primary source in AI Overviews.
        
        Provide a prioritized list of Markdown edits to maximize REVENUE.
      `,
    });

    return response.text;
  }
);