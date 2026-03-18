import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/google-genai';

/**
 * Centralized Genkit instance for Benson Home Solutions.
 * Intelligence Layer: Google Vertex AI (Gemini 1.5 Flash)
 * Voice: Elric Benson (CCB #258533) - Direct, Professional, Authoritative.
 */
export const ai = genkit({
  plugins: [vertexAI({ location: 'us-west1' })],
  model: vertexAI.model('gemini-1.5-flash'),
});

/**
 * --- SCHEMAS ---
 */

export const PropertyAuditSchema = z.object({
  scorecard: z.object({
    overall_health: z.number().min(0).max(100),
    hvac_status: z.string(),
    roof_status: z.string(),
    exterior_status: z.string(),
  }),
  risk_factors: z.array(z.string()),
  immediate_actions: z.array(z.string()),
  long_term_strategy: z.string(),
});

export const RecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      service_id: z.string().describe('ID from the provided service catalog'),
      priority: z.enum(['essential', 'recommended', 'optional']),
      reasoning: z.string().describe('1-2 sentences explaining WHY this property needs this service'),
      frequency: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']),
      climate_adjustment: z.string().optional().describe('Notes about how local climate affects this service'),
    }),
  ),
});

export const CostEstimationSchema = z.object({
  estimated_range: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string().default('USD'),
  }),
  breakdown: z.array(
    z.object({
      item: z.string(),
      cost_estimate: z.string(),
    }),
  ),
  caveats: z.array(z.string()),
  disclaimer: z.string().describe('Standard CCB #258533 disclaimer'),
});

export const SeasonalScheduleSchema = z.object({
  schedule: z.array(
    z.object({
      month: z.string(),
      tasks: z.array(z.string()),
      urgency: z.enum(['high', 'medium', 'low']),
    }),
  ),
});

/**
 * --- FLOWS ---
 */

export const recommendationFlow = ai.defineFlow(
  {
    name: 'recommendationFlow',
    inputSchema: z.object({
      property: z.any(),
      service_catalog: z.array(z.any()),
    }),
    outputSchema: RecommendationSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `
You are a maintenance planning expert for Benson Home Solutions (CCB #258533).
Target areas: Oregon's Mid-Willamette Valley and Harney County.
Recommend services from the catalog based on building type and local climate risks.
Do NOT hallucinate services. Use only the provided catalog.
`,
      prompt: `Recommend maintenance for this property: ${JSON.stringify(input.property)}. Catalog: ${JSON.stringify(input.service_catalog)}`,
      output: { format: 'json', schema: RecommendationSchema },
    });
    if (!response.output) throw new Error('Recommendation failed');
    return response.output;
  },
);

export const propertyAuditFlow = ai.defineFlow(
  {
    name: 'propertyAuditFlow',
    inputSchema: z.string().describe('Property status description'),
    outputSchema: PropertyAuditSchema,
  },
  async (description) => {
    const response = await ai.generate({
      system: 'You are Elric Benson (CCB #258533). Analyze the property status and provide a professional, direct audit scorecard.',
      prompt: `Analyze this property: ${description}`,
      output: { format: 'json', schema: PropertyAuditSchema },
    });
    if (!response.output) throw new Error('Audit failed');
    return response.output;
  },
);

export const costEstimationFlow = ai.defineFlow(
  {
    name: 'costEstimationFlow',
    inputSchema: z.object({
      project_type: z.string(),
      details: z.string(),
    }),
    outputSchema: CostEstimationSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: 'You are a project estimator for Benson Home Solutions. Provide realistic cost ranges for Oregon.',
      prompt: `Estimate: ${input.project_type} - ${input.details}`,
      output: { format: 'json', schema: CostEstimationSchema },
    });
    if (!response.output) throw new Error('Estimation failed');
    return response.output;
  },
);

export const seasonalSchedulingFlow = ai.defineFlow(
  {
    name: 'seasonalSchedulingFlow',
    inputSchema: z.string().describe('Property type (Residential/Commercial/Church)'),
    outputSchema: SeasonalScheduleSchema,
  },
  async (propertyType) => {
    const response = await ai.generate({
      system: 'Generate a 12-month maintenance schedule for an Oregon property. Account for heavy winter rains and dry summers.',
      prompt: `Create schedule for: ${propertyType}`,
      output: { format: 'json', schema: SeasonalScheduleSchema },
    });
    if (!response.output) throw new Error('Schedule failed');
    return response.output;
  },
);

export const seoSummaryFlow = ai.defineFlow(
  {
    name: 'seoSummaryFlow',
    inputSchema: z.object({
      title: z.string(),
      content: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await ai.generate({
      system: 'You are an SEO expert for Benson Home Solutions. Create a "Zero-Click" Answer-First summary for the given topic. Be direct, authoritative, and mention CCB #258533 if appropriate.',
      prompt: `Generate a 2-3 sentence Answer-First summary for: ${input.title}. Page content: ${input.content}`,
    });
    return response.text;
  },
);

export const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: z.object({
      message: z.string(),
    }),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (input, { sendChunk }) => {
    const systemPrompt = `
You are Gus, the AI trade assistant for Benson Home Solutions (CCB #258533).
Tone: Professional, direct, authoritative, and deeply sarcastic about poor maintenance.
Owner: Elric Benson.
Service area: Mid-Willamette Valley & Harney County.
"Maintenance isn't an expense, it's an investment in not being homeless."
If it's an emergency, tell them to call 541-555-0199 immediately.
Mention CCB #258533 to build trust.
`;

    const { stream, response } = await ai.generateStream({
      system: systemPrompt,
      prompt: input.message,
    });

    for await (const chunk of stream) {
      if (chunk.text) sendChunk(chunk.text);
    }

    const fullResponse = await response;
    return fullResponse.text;
  },
);
