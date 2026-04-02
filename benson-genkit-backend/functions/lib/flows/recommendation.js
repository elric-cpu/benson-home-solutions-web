"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationFlow = void 0;
const genkit_1 = require("genkit");
const genkit_config_1 = require("../genkit-config");
const RecommendationInputSchema = genkit_1.z.object({
    property: genkit_1.z.unknown(),
    service_catalog: genkit_1.z.array(genkit_1.z.object({
        id: genkit_1.z.string(),
        name: genkit_1.z.string(),
    })),
});
const RecommendationOutputSchema = genkit_1.z.object({
    recommendations: genkit_1.z.array(genkit_1.z.object({
        service_id: genkit_1.z.string(),
        priority: genkit_1.z.enum(["essential", "recommended", "optional"]),
        reasoning: genkit_1.z.string(),
        frequency: genkit_1.z.string(),
        climate_adjustment: genkit_1.z.string(),
    })),
});
exports.recommendationFlow = genkit_config_1.ai.defineFlow({
    name: "recommendationFlow",
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
}, async ({ property, service_catalog }) => {
    const response = await genkit_config_1.ai.generate({
        model: genkit_config_1.defaultModel,
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
});
//# sourceMappingURL=recommendation.js.map