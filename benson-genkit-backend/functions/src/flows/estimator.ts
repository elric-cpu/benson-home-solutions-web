import { ai, defaultModel } from "../genkit-config";
import { z } from "genkit";

/**
 * Cost Estimation Flow - Benson Home Solutions
 */

const CostEstimationInputSchema = z.object({
  service: z.string().describe("Type of maintenance or repair service"),
  details: z.string().describe("Specific details of the observed issue"),
  zipCode: z.string().optional().describe("Location for regional cost adjustments"),
});

const CostEstimationOutputSchema = z.object({
  estimatedRange: z.string().describe("Estimated budget range"),
  diagnosticLogic: z.string().describe("The systems-based reasoning for this estimate"),
  criticalWarnings: z.array(z.string()).describe("Potential structural or safety risks found during mental model analysis"),
  recommendedNextSteps: z.array(z.string()).describe("Actionable diagnostic steps for the homeowner"),
});

export const costEstimationFlow = ai.defineFlow(
  {
    name: "costEstimationFlow",
    inputSchema: CostEstimationInputSchema,
    outputSchema: CostEstimationOutputSchema,
  },
  async ({ service, details, zipCode }) => {
    try {
      const response = await ai.generate({
        model: defaultModel,
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
    } catch (error: any) {
      console.error("[Estimator] Flow failed:", error.message);
      throw error;
    }
  }
);
