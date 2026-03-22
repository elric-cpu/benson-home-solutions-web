
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { z } from 'zod';
import { ai, RecommendationSchema } from '../../lib/genkit';

export const PropertySchema = z.object({
    address: z.string().describe('Full address of the property'),
    property_type: z.enum(['residential', 'commercial', 'industrial', 'church']).describe('Type of property'),
    year_built: z.number().int().positive().describe('The year the property was built'),
    sq_ft: z.number().int().positive().describe('Square footage of the property'),
    description: z.string().optional().describe('Additional details about the property, like HVAC age, roof type, etc.'),
});

export const recommendationFlow = defineFlow(
  {
    name: 'recommendationFlow',
    inputSchema: PropertySchema,
    outputSchema: RecommendationSchema,
  },
  async (property) => {
    const response = await ai.generate({
        system: `
            You are a maintenance planning expert for Benson Home Solutions (CCB #258533).
            Target areas: Oregon's Mid-Willamette Valley and Harney County.
            Recommend services based on the property information provided.
            Your recommendations should be based on the likely maintenance needs of a property of this type, age, and size in the specified climate zones.
            Do NOT hallucinate services. Use a standard set of home maintenance services.
        `,
        prompt: `Recommend maintenance for this property: ${JSON.stringify(property)}`,
        output: { format: 'json', schema: RecommendationSchema },
        });
        if (!response.output) throw new Error('Recommendation failed');
        return response.output;
    },
);
