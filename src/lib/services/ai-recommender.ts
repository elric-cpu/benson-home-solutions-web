import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Uses GPT-4o-mini to recommend services based on user description.
 * This is used in the lead capture flow to suggest the best starting point.
 */
export async function recommendServices(description: string) {
  try {
    const { object } = await generateObject({
      model: openrouter('openai/gpt-4o-mini'),
      schema: z.object({
        recommendations: z.array(z.object({
          service: z.string(),
          confidence: z.number(),
          reasoning: z.string()
        })),
        urgency: z.enum(['low', 'medium', 'high']),
      }),
      prompt: `Analyze this home improvement request: "${description}". 
      Recommend relevant services from: Bathroom Remodeling, Kitchen Remodeling, 
      Windows & Doors, Maintenance, Water Damage, Mold Remediation, Demolition, Commercial.`,
    });

    return object;
  } catch (error) {
    console.error('AI Recommendation failed:', error);
    // Fallback to basic maintenance if AI fails
    return {
      recommendations: [{ service: 'Maintenance', confidence: 0.5, reasoning: 'Standard fallback' }],
      urgency: 'low' as const
    };
  }
}
