import { z } from "genkit";
import { ai, defaultModel } from "../genkit-config";

const RecommendationInputSchema = z.object({
  property: z.unknown(),
  service_catalog: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

const RecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      service_id: z.string(),
      priority: z.enum(["essential", "recommended", "optional"]),
      reasoning: z.string(),
      frequency: z.string(),
      climate_adjustment: z.string(),
    }),
  ),
});

export const recommendationFlow = ai.defineFlow(
  {
    name: "recommendationFlow",
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async ({ property, service_catalog }) => {
    const response = await ai.generate({
      model: defaultModel,
      system: [
        "You recommend maintenance plans for Benson Home Solutions.",
        "Use only the provided service catalog.",
        "Recommend 1 to 3 services for Oregon climate and property risk.",
      ].join(" "),
      prompt: JSON.stringify({ property, service_catalog }),
      output: {
        schema: RecommendationOutputSchema,
      },
    });

    if (!response.output) {
      throw new Error("Model failed to return recommendation output.");
    }

    return response.output;
  },
);
