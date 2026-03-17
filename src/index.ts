import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Centralized Genkit instance for Benson Home Solutions.
 * Represents the professional, direct, and authoritative voice of Elric Benson.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.0-flash'),
});

/**
 * --- SCHEMAS ---
 */

export const RecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      service_id: z.string().describe('ID from the provided service catalog'),
      priority: z.enum(['essential', 'recommended', 'optional']),
      reasoning: z
        .string()
        .describe(
          '1-2 sentences explaining WHY this property needs this service',
        ),
      frequency: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']),
      climate_adjustment: z
        .string()
        .optional()
        .describe('Notes about how local climate affects this service'),
    }),
  ),
});

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

/**
 * propertyAuditFlow: Generates a high-level health scorecard for a property.
 */
export const propertyAuditFlow = ai.defineFlow(
  {
    name: 'propertyAuditFlow',
    inputSchema: z
      .string()
      .describe('Detailed description of the property status'),
    outputSchema: PropertyAuditSchema,
  },
  async (description) => {
    const systemPrompt = `
You are Elric Benson (CCB #258533). 
Analyze the property description and provide a direct, honest audit.
If the owner is neglecting their maintenance, tell them plainly.
Service Area: Mid-Willamette Valley & Harney County.
`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: `Analyze this property: ${description}`,
      output: { format: 'json', schema: PropertyAuditSchema },
    });

    if (!response.output) throw new Error('Audit failed');
    return response.output;
  },
);

/**
 * costEstimationFlow: Provides rough project estimates based on market data.
 */
export const costEstimationFlow = ai.defineFlow(
  {
    name: 'costEstimationFlow',
    inputSchema: z.object({
      project_type: z.string().describe('e.g., Bathroom Remodel, Roof Repair'),
      details: z.string().describe('Project specifics'),
    }),
    outputSchema: CostEstimationSchema,
  },
  async (input) => {
    const systemPrompt = `
You are a project estimator for Benson Home Solutions.
Provide realistic cost ranges for Oregon (Mid-Willamette Valley).
Be conservative. Better to over-estimate than under-estimate.
Remind users that "quality costs more up front but less over time."
`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: `Estimate this project: ${input.project_type} - ${input.details}`,
      output: { format: 'json', schema: CostEstimationSchema },
    });

    if (!response.output) throw new Error('Estimation failed');
    return response.output;
  },
);

/**
 * seasonalSchedulingFlow: Generates a 12-month maintenance calendar.
 */
export const seasonalSchedulingFlow = ai.defineFlow(
  {
    name: 'seasonalSchedulingFlow',
    inputSchema: z
      .string()
      .describe('Property type (Residential/Commercial/Church)'),
    outputSchema: SeasonalScheduleSchema,
  },
  async (propertyType) => {
    const systemPrompt = `
Generate a 12-month maintenance schedule for a ${propertyType} in Oregon.
Account for heavy winter rains and dry summers.
Focus on gutters, HVAC, and exterior sealing.
`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: `Create schedule for: ${propertyType}`,
      output: { format: 'json', schema: SeasonalScheduleSchema },
    });

    if (!response.output) throw new Error('Schedule failed');
    return response.output;
  },
);

/**
 * generalChatFlow: The refined, sarcastic "Gus".
 */
export const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: z.object({
      message: z.string().describe('User message'),
    }),
    outputSchema: z.string().describe('AI response'),
    streamSchema: z.string(),
  },
  async (input, { sendChunk }) => {
    const systemPrompt = `
You are Gus, the AI trade assistant for Benson Home Solutions (CCB #258533).
Your tone: Professional, direct, authoritative, and deeply sarcastic about poor maintenance.
Owner: Elric Benson.

Guidelines:
1. If a user asks a dumb question, answer it accurately but with a dry, sarcastic edge.
2. Emphasize that "maintenance isn't an expense, it's an investment in not being homeless."
3. Service area: Albany, Lebanon, Sweet Home, and Harney County.
4. If it's an emergency, tell them to call (541) 413-0480 and stop talking to a robot.
5. Mention the CCB #258533 often to show we're legit.
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
