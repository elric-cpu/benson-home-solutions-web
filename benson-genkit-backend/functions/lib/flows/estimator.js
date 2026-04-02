"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.costEstimationFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
const CostEstimationInputSchema = genkit_1.z.object({
    service: genkit_1.z.string().describe("Type of maintenance or repair service"),
    details: genkit_1.z.string().describe("Specific details of the observed issue"),
    zipCode: genkit_1.z.string().optional().describe("Location for regional cost adjustments"),
});
const CostEstimationOutputSchema = genkit_1.z.object({
    estimatedRange: genkit_1.z.string().describe("Estimated budget range"),
    diagnosticLogic: genkit_1.z.string().describe("The systems-based reasoning for this estimate"),
    criticalWarnings: genkit_1.z.array(genkit_1.z.string()).describe("Potential structural or safety risks found during mental model analysis"),
    recommendedNextSteps: genkit_1.z.array(genkit_1.z.string()).describe("Actionable diagnostic steps for the homeowner"),
});
exports.costEstimationFlow = genkit_config_1.ai.defineFlow({
    name: "costEstimationFlow",
    inputSchema: CostEstimationInputSchema,
    outputSchema: CostEstimationOutputSchema,
}, async ({ service, details, zipCode }) => {
    try {
        const response = await genkit_config_1.ai.generate({
            model: genkit_config_1.defaultModel,
            system: "You are the Lead Diagnostic Estimator for Benson Home Solutions.",
            prompt: `Service: ${service}. Details: ${details}. Location: ${zipCode || 'Oregon'}.`,
            output: {
                schema: CostEstimationOutputSchema
            }
        });
        if (!response.output) {
            throw new Error("Model failed to provide structured output.");
        }
        return response.output;
    }
    catch (error) {
        console.error("[Estimator] Flow failed:", error.message);
        throw error;
    }
});
//# sourceMappingURL=estimator.js.map