import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { SERVICE_CATALOG } from './service-catalog';

export interface PropertyContext {
  address: string;
  building_type: 'residential' | 'commercial' | 'church_community';
  year_built: number;
  sqft: number;
  flood_zone: string;
  disaster_history: any[];
}

export async function getAiRecommendations(property: PropertyContext) {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      recommendations: z.array(z.object({
        service_id: z.string(),
        priority: z.enum(['essential', 'recommended', 'optional']),
        reasoning: z.string(),
        frequency: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']),
      }))
    }),
    system: `You are a maintenance planning expert for properties in Oregon. 
    Recommend services from the provided catalog based on the property data.
    Service Catalog: ${JSON.stringify(SERVICE_CATALOG.map(s => ({ id: s.id, name: s.name, applicable: s.applicable_to })))}`,
    prompt: `Property Data: ${JSON.stringify(property)}`,
  });

  return object.recommendations;
}
