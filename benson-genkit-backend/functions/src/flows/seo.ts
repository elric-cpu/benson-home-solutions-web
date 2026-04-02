import { ai } from "../genkit-config";
import { z } from "genkit";

export const optimizeSiteFlow = ai.defineFlow(
  {
    name: "optimizeSiteFlow",
    inputSchema: z.string().describe("The site URL to optimize"),
    outputSchema: z.string().describe("Optimization advice"),
  },
  async (siteUrl) => {
    const response = await ai.generate({
      prompt: `Analyze the SEO for: ${siteUrl}. 
      Focus on home maintenance services, AEO for contractors, and keyword clustering for Harney County and the Mid-Willamette Valley. 
      Provide actionable, diagnostic-first advice.`,
    });

    return response.text;
  }
);
