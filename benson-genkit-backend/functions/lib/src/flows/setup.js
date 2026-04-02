"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogleApisFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
exports.setupGoogleApisFlow = genkit_config_1.ai.defineFlow({
    name: "setupGoogleApisFlow",
    inputSchema: genkit_1.z.string().describe("Project ID to set up"),
    outputSchema: genkit_1.z.object({
        status: genkit_1.z.string(),
        details: genkit_1.z.string(),
    }),
}, async (projectId) => {
    // Simulated setup
    const response = await genkit_config_1.ai.generate({
        prompt: `Outline a plan to set up Google Search Console and Vertex AI for project: ${projectId}. 
      Mention authentication needs and service account roles.`,
        output: {
            schema: genkit_1.z.object({
                status: genkit_1.z.string(),
                details: genkit_1.z.string(),
            })
        }
    });
    return response.output;
});
//# sourceMappingURL=setup.js.map