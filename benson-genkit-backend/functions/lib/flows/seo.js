"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeSiteFlow = void 0;
const genkit_1 = require("genkit");
const googleai_1 = require("@genkit-ai/googleai");
const functions_1 = require("@genkit-ai/firebase/functions");
const gscTool_1 = require("../gscTool");
const ai = (0, genkit_1.genkit)({});
exports.optimizeSiteFlow = (0, functions_1.onFlow)(ai, {
    name: "optimizeSiteFlow",
    inputSchema: genkit_1.z.string(), // The Site URL
    outputSchema: genkit_1.z.string(),
    authPolicy: (0, functions_1.noAuth)(),
}, async (siteUrl) => {
    // Step 1: Get data from the tool
    const performanceData = await (0, gscTool_1.getSearchPerformance)({ siteUrl, days: 30 });
    // Step 2: Gemini analyzes data for SEO/AEO/GEO gaps
    const response = await ai.generate({
        model: googleai_1.gemini15Flash,
        tools: [gscTool_1.getSearchPerformance], // Providing context
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
});
//# sourceMappingURL=seo.js.map