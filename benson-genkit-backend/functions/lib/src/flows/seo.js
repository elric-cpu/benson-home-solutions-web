"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeSiteFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
exports.optimizeSiteFlow = genkit_config_1.ai.defineFlow({
    name: "optimizeSiteFlow",
    inputSchema: genkit_1.z.string().describe("The site URL to optimize"),
    outputSchema: genkit_1.z.string().describe("Optimization advice"),
}, async (siteUrl) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `Analyze the SEO for: ${siteUrl}. 
      Focus on home maintenance services, AEO for contractors, and keyword clustering for Harney County and the Mid-Willamette Valley. 
      Provide actionable, diagnostic-first advice.`,
    });
    return response.text;
});
//# sourceMappingURL=seo.js.map