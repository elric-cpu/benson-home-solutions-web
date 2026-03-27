import { genkit, z, tool } from 'genkit';
import { vertexAI } from '@genkit-ai/google-genai';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/db/schema';
import { validateAddress } from '@/lib/gcloud/address';
import { logError, logInfo } from './gcloud/logging';
import { GUS_SYSTEM_PROMPT } from './prompts';
import {
  getAnnualPlanPrice,
  getEmergencyRiskFrame,
  getResidentialIndustryContext,
  getSegmentData,
  getTier,
  recommendedTierBySegment,
} from './maintenance-pricing';

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
 * --- SHARED SCHEMAS ---
 */
const segmentSchema = z
  .enum(['residential', 'commercial', 'church'])
  .describe('The property type.');

/**
 * --- TOOLS ---
 */

const createLeadSchema = z.object({
  name: z.string().min(2).max(100).describe("The user's full name."),
  email: z.string().email().describe("The user's email address."),
  phone: z
    .string()
    .min(10)
    .max(20)
    .optional()
    .describe("The user's phone number."),
  address: z
    .string()
    .max(200)
    .optional()
    .describe('The full property address for the service.'),
  service: z
    .string()
    .max(100)
    .describe('The service or plan the user is interested in.'),
  message: z
    .string()
    .max(2000)
    .describe(
      "A summary of the user's request and the generated plan details.",
    ),
});

export const createLeadTool = tool(
  {
    name: 'createLead',
    description:
      'Use this tool AFTER a user has finalized a maintenance plan or requested a quote for a specific project. Collect all required information first.',
    inputSchema: createLeadSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      // PII REDACTED LOGGING
      logInfo('AI is creating a lead...', { service: input.service });

      // IDEMPOTENCY CHECK
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
      const existingLead = await db.query.leads.findFirst({
        where: (leads, { eq, and, gt }) =>
          and(
            eq(leads.email, input.email.trim().toLowerCase()),
            gt(leads.createdAt, fiveMinsAgo),
          ),
      });

      if (existingLead) {
        logInfo('Duplicate lead creation prevented via idempotency check', {
          leadId: existingLead.id,
        });
        return `A lead for ${input.name} was already created recently. Lead ID is ${existingLead.id}. Let the user know we will be in touch.`;
      }

      let validatedAddr = null;
      if (input.address?.trim()) {
        try {
          validatedAddr = await validateAddress([input.address.trim()]);
        } catch (err) {
          logError(err as Error, { context: 'AI Lead Address Validation' });
        }
      }

      const standardizedAddrStr =
        typeof validatedAddr?.standardizedAddress === 'string'
          ? validatedAddr.standardizedAddress
          : null;

      const [newLead] = await db
        .insert(leads)
        .values({
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() || null,
          serviceType: input.service || 'General Inquiry',
          message: input.message.trim(),
          propertyAddress: standardizedAddrStr || input.address || null,
          status: 'new',
        })
        .returning();

      if (validatedAddr && validatedAddr.isDeliverable && standardizedAddrStr) {
        await db
          .insert(properties)
          .values({
            leadId: newLead.id,
            standardizedAddress: standardizedAddrStr,
            city: validatedAddr.city || null,
            county: validatedAddr.county || null,
            lat: validatedAddr.latitude?.toString(),
            lng: validatedAddr.longitude?.toString(),
            auditHash: validatedAddr.addressHash,
          })
          .onConflictDoNothing();
      }

      logInfo('AI Lead Captured', { leadId: newLead.id });

      // INTERNAL SECURE ROUTING FOR BACKGROUND ENRICHMENT
      const internalBaseUrl =
        process.env.INTERNAL_API_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000');
      const apiKey = process.env.INTERNAL_API_KEY;

      if (!apiKey) {
        logError(new Error('INTERNAL_API_KEY is not set.'), {
          context: 'AI Enrichment Trigger Failed',
        });
      } else {
        // Await fetch so serverless environments don't prematurely kill the background request.
        // We catch the error so it doesn't fail the primary tool invocation.
        try {
          const response = await fetch(`${internalBaseUrl}/api/enrich`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ leadId: newLead.id }),
            // Optional short timeout in real environments
          });

          if (!response.ok) {
            logError(
              new Error(
                `Enrichment API failed with status: ${response.status}`,
              ),
              { context: 'AI Enrichment Trigger Failed' },
            );
          }
        } catch (err) {
          logError(err as Error, { context: 'AI Enrichment Trigger Failed' });
        }
      }

      return `Successfully created a lead for ${input.name}. The lead ID is ${newLead.id}. Let the user know we will be in touch within one business day.`;
    } catch (error) {
      logError(error as Error, { context: 'AI createLeadTool' });
      return 'An error occurred while creating the lead. Inform the user and ask them to call 541-321-5115.';
    }
  },
);

const buildMaintenancePlanSchema = z.object({
  segment: segmentSchema,
  tierKey: z
    .string()
    .optional()
    .describe(
      'Optional specific plan tier key when the user asks for a particular plan.',
    ),
});

export const buildMaintenancePlanTool = tool(
  {
    name: 'buildMaintenancePlan',
    description:
      'Calculates the monthly cost of a maintenance plan for a given property type.',
    inputSchema: buildMaintenancePlanSchema,
    outputSchema: z.object({
      planName: z.string(),
      basePrice: z.number(),
      totalMonthlyPrice: z.number(),
      annualPrice: z.number(),
      summary: z.string(),
      segment: segmentSchema,
      addonIds: z.array(z.string()),
    }),
  },
  async ({ segment, tierKey }) => {
    const segmentData = getSegmentData(segment);
    const selectedTier = getTier(
      segment,
      tierKey ?? recommendedTierBySegment[segment],
    );
    const basePrice = selectedTier.price;
    const annualPrice = getAnnualPlanPrice(basePrice);
    const emergencyFrame = getEmergencyRiskFrame(segment, annualPrice);

    const summary = `The ${segmentData.name} ${selectedTier.name} plan is $${basePrice}/month ($${annualPrice}/year). A reactive year with emergency calls and deferred maintenance commonly costs more than that. For this segment, the planning frame is roughly $${emergencyFrame.reactiveRangeLow.toLocaleString()}-$${emergencyFrame.reactiveRangeHigh.toLocaleString()} per year when owners stay in catch-up mode.`;

    return {
      planName: `${segmentData.name} ${selectedTier.name} Plan`,
      basePrice,
      totalMonthlyPrice: basePrice,
      annualPrice,
      summary,
      segment,
      addonIds: [],
    };
  },
);
const estimateMaintenanceCostSchema = z.object({
  segment: segmentSchema,
  tierKey: z.string().optional().describe('Optional plan tier key.'),
  homeValue: z
    .number()
    .positive()
    .optional()
    .describe(
      'Approximate home value for residential industry-comparison context.',
    ),
  homeAge: z
    .number()
    .positive()
    .optional()
    .describe(
      'Approximate home age for residential industry-comparison context.',
    ),
});

export const estimateMaintenanceCostTool = tool(
  {
    name: 'estimateMaintenanceCost',
    description:
      'Returns exact Benson plan pricing and a transparent industry-context comparison grounded in the maintenance plan price data.',
    inputSchema: estimateMaintenanceCostSchema,
    outputSchema: z.object({
      segment: segmentSchema,
      tierKey: z.string(),
      monthlyPrice: z.number(),
      annualPrice: z.number(),
      comparisonSummary: z.string(),
    }),
  },
  async ({ segment, tierKey, homeValue, homeAge }) => {
    const selectedTier = getTier(segment, tierKey);
    const annualPrice = getAnnualPlanPrice(selectedTier.price);

    let comparisonSummary = `The ${selectedTier.name} plan is $${selectedTier.price}/month or $${annualPrice}/year.`;

    if (segment === 'residential') {
      const industry = getResidentialIndustryContext(homeValue, homeAge);

      if (industry.annualLow != null && industry.annualHigh != null) {
        comparisonSummary = `${comparisonSummary} A common residential maintenance benchmark for a property like this is roughly $${industry.annualLow.toLocaleString()}-$${industry.annualHigh.toLocaleString()} per year before emergency premiums, depending on age and condition.`;
      } else {
        comparisonSummary = `${comparisonSummary} ${industry.note}`;
      }
    } else {
      const emergencyFrame = getEmergencyRiskFrame(segment, annualPrice);
      comparisonSummary = `${comparisonSummary} For ${segment} properties, the more honest comparison is proactive coverage versus reactive catch-up work. That reactive range is roughly $${emergencyFrame.reactiveRangeLow.toLocaleString()}-$${emergencyFrame.reactiveRangeHigh.toLocaleString()} per year once emergencies and deferred work stack up.`;
    }

    return {
      segment,
      tierKey: selectedTier.key,
      monthlyPrice: selectedTier.price,
      annualPrice,
      comparisonSummary,
    };
  },
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
    const { stream, response } = await ai.generateStream({
      system: GUS_SYSTEM_PROMPT,
      prompt: input.message,
      tools: [
        buildMaintenancePlanTool,
        estimateMaintenanceCostTool,
        createLeadTool,
      ],
    });

    for await (const chunk of stream) {
      if (chunk.text) sendChunk(chunk.text);
    }

    const fullResponse = await response;
    return fullResponse.text;
  },
);
