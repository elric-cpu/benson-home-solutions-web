import { genkit, z, tool } from 'genkit';
import { vertexAI } from '@genkit-ai/google-genai';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/db/schema';
import { validateAddress } from '@/lib/gcloud/address';
import { logError, logInfo } from './gcloud/logging';
import planData from './maintenance-plans.json';

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
 * --- TOOLS ---
 */

const createLeadSchema = z.object({
  name: z.string().describe("The user's full name."),
  email: z.string().describe("The user's email address."),
  phone: z.string().optional().describe("The user's phone number."),
  address: z.string().optional().describe("The full property address for the service."),
  service: z.string().describe('The service or plan the user is interested in.'),
  message: z.string().describe('A summary of the user\'s request and the generated plan details.'),
});

export const createLeadTool = tool(
  {
    name: 'createLead',
    description: 'Use this tool AFTER a user has finalized a maintenance plan or requested a quote for a specific project. Collect all required information first.',
    inputSchema: createLeadSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      logInfo('AI is creating a lead...', input);

      let validatedAddr = null;
      if (input.address?.trim()) {
        try {
          validatedAddr = await validateAddress([input.address.trim()]);
        } catch (err) {
          logError(err as Error, { context: 'AI Lead Address Validation' });
        }
      }

      const [newLead] = await db.insert(leads).values({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim() || null,
        serviceType: input.service || 'General Inquiry',
        message: input.message.trim(),
        propertyAddress: validatedAddr?.standardizedAddress || input.address || null,
        status: 'new',
      }).returning();

      if (validatedAddr && validatedAddr.isDeliverable) {
        await db.insert(properties).values({
          leadId: newLead.id,
          standardizedAddress: validatedAddr.standardizedAddress!,
          city: validatedAddr.city || null,
          county: validatedAddr.county || null,
          lat: validatedAddr.latitude?.toString(),
          lng: validatedAddr.longitude?.toString(),
          auditHash: validatedAddr.addressHash,
        }).onConflictDoNothing();
      }

      logInfo('AI Lead Captured', { leadId: newLead.id });

      // Asynchronous Enrichment Trigger
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/enrich`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.INTERNAL_API_KEY}`,
        },
        body: JSON.stringify({ leadId: newLead.id }),
      }).catch(err => logError(err as Error, { context: 'AI Enrichment Trigger Failed' }));

      return `Successfully created a lead for ${input.name}. The lead ID is ${newLead.id}. Let the user know we will be in touch within one business day.`;
    } catch (error) {
      logError(error as Error, { context: 'AI createLeadTool' });
      return 'An error occurred while creating the lead. Inform the user and ask them to call 541-321-5115.';
    }
  }
);

const buildMaintenancePlanSchema = z.object({
    segment: z.enum(['residential', 'commercial', 'church']).describe('The property type.'),
    addons: z.array(z.string()).describe('A list of optional service IDs to add to the base plan.'),
});

const recommendedTierBySegment = {
  residential: 'standard',
  commercial: 'plus',
  church: 'guardian',
} as const;

type MaintenanceTier = {
  name: string;
  price: number;
  description: string;
  features: string[];
};

export const buildMaintenancePlanTool = tool(
  {
    name: 'buildMaintenancePlan',
    description: 'Calculates the monthly cost of a maintenance plan for a given property type and optional add-on services.',
    inputSchema: buildMaintenancePlanSchema,
    outputSchema: z.object({
        planName: z.string(),
        basePrice: z.number(),
        addons: z.array(z.object({ name: z.string(), price: z.number() })),
        totalMonthlyPrice: z.number(),
        summary: z.string(),
        // Return the inputs for state synchronization
        segment: buildMaintenancePlanSchema.shape.segment,
        addonIds: buildMaintenancePlanSchema.shape.addons,
    }),
  },
  async ({ segment, addons }) => {
    const segmentData = planData.segments[segment];
    const tiersByKey = segmentData.tiers as Record<string, MaintenanceTier>;
    const recommendedTierKey = recommendedTierBySegment[segment];
    const recommendedTier = tiersByKey[recommendedTierKey];
    const basePrice = recommendedTier.price;
    const addonDetails = addons.map((addonId) => ({
      name: addonId,
      price: 0,
    }));
    const summary = `The recommended ${segmentData.name} plan is the ${recommendedTier.name} tier at $${basePrice}/month. Custom add-ons are not currently priced in the assistant, so we will confirm any extra scope during your quote.`;

    return {
        planName: `${segmentData.name} ${recommendedTier.name} Plan`,
        basePrice,
        addons: addonDetails,
        totalMonthlyPrice: basePrice,
        summary,
        segment,
        addonIds: addons,
    };
  }
);

/**
 * --- FLOWS ---
 */

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
You are Gus, the AI assistant for Benson Home Solutions (CCB #258533), a company of maintenance specialists. Your voice is that of the owner, Elric Benson: confident, direct, and authoritative. You are a systems-age truth-teller.

**Your Core Belief:** "Maintenance is cheaper than surprise repair." Frame your advice around this philosophy. Nothing lasts forever, and proactive maintenance is the only way to avoid costly emergencies.

**Your Primary Goal:** Help users build a custom monthly maintenance plan.

**Your Process:**
1.  **Diagnose First:** Start by understanding the user's property. Is it Residential, Commercial, or a Church? Ask investigative questions to understand their needs before you recommend services.
2.  **Educate & Recommend:** Inform them of the base price for their plan. Explain the value of the included services. Suggest relevant add-ons from the list below, explaining how they prevent future problems.
3.  **Build the Plan:** Once they've chosen services, use the \`buildMaintenancePlanTool\` to calculate the total cost.
4.  **Capture the Lead:** Present the final plan. If they're ready, use the \`createLeadTool\` to get them signed up.

**Key Differentiator:** We own specialized tools that most contractors rent, like interior concrete saws and large-scale dehumidifiers. This means the job gets done right the first time. Mention this when relevant.

**Emergency Protocol:** If the user has an active emergency (like a leak), immediately tell them to call the after-hours line at (541) 413-0480. Do not try to build a plan.
`;

    const { stream, response } = await ai.generateStream({
      system: systemPrompt,
      prompt: input.message,
      tools: [buildMaintenancePlanTool, createLeadTool],
    });

    for await (const chunk of stream) {
      if (chunk.text) sendChunk(chunk.text);
    }

    const fullResponse = await response;
    return fullResponse.text;
  },
);
