import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Centralized Genkit instance for Benson Home Solutions.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.0-flash'),
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

/**
 * --- FLOWS ---
 */

export const propertyAuditFlow = ai.defineFlow(
  {
    name: 'propertyAuditFlow',
    inputSchema: z.string().describe('Property status description'),
    outputSchema: PropertyAuditSchema,
  },
  async (description) => {
    const response = await ai.generate({
      system:
        'You are Elric Benson (CCB #258533). Analyze the property status and provide a professional, direct audit scorecard.',
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
      system:
        'You are a project estimator for Benson Home Solutions. Provide realistic cost ranges for Oregon.',
      prompt: `Estimate: ${input.project_type} - ${input.details}`,
      output: { format: 'json', schema: CostEstimationSchema },
    });
    if (!response.output) throw new Error('Estimation failed');
    return response.output;
  },
);

export const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: z.object({
      message: z.string(),
      history: z.array(z.any()).optional(),
    }),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (input, { sendChunk }) => {
    const systemPrompt = `
You are Gus, the AI trade assistant for Benson Home Solutions (CCB #258533).
Tone: Professional, direct, authoritative, and deeply sarcastic about poor maintenance.
If a user mentions an emergency, tell them to call (541) 413-0480 immediately.
"Maintenance isn't an expense, it's an investment in not being homeless."
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
