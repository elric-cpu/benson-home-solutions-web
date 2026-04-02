"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.costEstimationFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
const CostEstimationInputSchema = genkit_1.z.object({
    service: genkit_1.z.string().describe("Type of maintenance or repair service"),
    details: genkit_1.z.string().describe("Specific details of the issue"),
    zipCode: genkit_1.z.string().optional().describe("Location for regional cost adjustments"),
});
const CostEstimationOutputSchema = genkit_1.z.object({
    estimatedRange: genkit_1.z.string().describe("Estimated cost range (e.g., '$500 - $800')"),
    logic: genkit_1.z.string().describe("Brief explanation of the diagnostic cost basis"),
    nextSteps: genkit_1.z.string().describe("Recommended expert diagnostic steps"),
});
exports.costEstimationFlow = genkit_config_1.ai.defineFlow({
    name: "costEstimationFlow",
    inputSchema: CostEstimationInputSchema,
    outputSchema: CostEstimationOutputSchema,
}, async ({ service, details, zipCode }) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `Service: ${service}. Details: ${details}. Location: ${zipCode || 'Oregon'}.
      Provide a cost estimate for Benson Home Solutions. 
      Remember: Diagnostic-first. Mention that maintenance prevents larger future costs. 
      Use RSMeans 2026 data principles.`,
        output: {
            schema: CostEstimationOutputSchema
        }
    });
    return response.output;
});
//# sourceMappingURL=estimator.js.map