import { z } from 'genkit';
import { ai, defaultModel } from '@/lib/genkit-node';
import { BUSINESS } from '@/lib/constants';
import { type OfficeAgentMode, routeOfficeAgents } from '@/lib/office';

const CostEstimateSchema = z.object({
  estimated_range: z.object({
    min: z.number().int().nonnegative(),
    max: z.number().int().nonnegative(),
    currency: z.literal('USD').default('USD'),
  }),
  breakdown: z.array(
    z.object({
      item: z.string(),
      cost_estimate: z.string(),
    }),
  ),
  caveats: z.array(z.string()),
  disclaimer: z.string(),
});

const RecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      service_id: z.string(),
      priority: z.enum(['essential', 'recommended', 'optional']),
      reasoning: z.string(),
      frequency: z.string(),
      climate_adjustment: z.string(),
    }),
  ),
});

const PropertyAuditSchema = z.object({
  summary: z.string(),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  immediate_actions: z.array(z.string()),
  likely_risks: z.array(z.string()),
  recommended_services: z.array(z.string()),
  disclaimer: z.string(),
});

const MarketingContentSchema = z.object({
  status: z.string(),
  topic: z.string(),
  asset_type: z.string(),
  artifacts: z.object({
    content_draft: z.object({
      title: z.string(),
      summary: z.string(),
      content: z.string(),
      cta: z.string(),
    }),
    seo_strategy: z.object({
      primary_keyword: z.string(),
      secondary_keywords: z.array(z.string()),
      search_intent: z.string(),
      meta_description: z.string(),
    }),
    multimedia_assets: z.array(
      z.object({
        type: z.string(),
        brief: z.string(),
      }),
    ),
    outreach_campaign: z.object({
      audience: z.string(),
      subject_lines: z.array(z.string()),
      call_to_action: z.string(),
    }),
    developer_code: z.object({
      component_code: z.string(),
    }),
  }),
});

export function hasLocalGoogleAiConfig(): boolean {
  return Boolean(process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT);
}

type ChatHistoryMessage = {
  role: 'user' | 'model';
  content: Array<{ text: string }>;
};

export async function generateTradeAssistantReply(
  message: string,
  options?: {
    history?: ChatHistoryMessage[];
    agentMode?: OfficeAgentMode;
  },
): Promise<string> {
  const route = options?.agentMode === 'multi' ? routeOfficeAgents(message) : null;
  const multiAgentSystemPrompt = route
    ? [
        `You are Gus, the public-facing coordinator for ${BUSINESS.name}, operating inside the Iron Ledger Digital multi-agent office.`,
        `The lead office owner for this request is ${route.lead.name}, ${route.lead.role}.`,
        route.reviewers.length > 0
          ? `Specialist reviewers consulted: ${route.reviewers
              .map(agent => `${agent.name} (${agent.role})`)
              .join(', ')}.`
          : 'No additional reviewers are required for this request.',
        'Respond as one coordinated office voice rather than a transcript.',
        'When useful, briefly name the lead role that owns the answer or next action.',
        `Keep the tone direct, practical, safety-aware, and grounded in Oregon property maintenance realities. Mention ${BUSINESS.license} only when helpful.`,
      ].join(' ')
    : null;

  const response = await ai.generate({
    model: defaultModel,
    system:
      multiAgentSystemPrompt ??
      [
        `You are Gus, the authoritative trade assistant for ${BUSINESS.name}.`,
        `Use a direct, experienced tone and mention ${BUSINESS.license} only when helpful.`,
        'Keep answers practical, safety-aware, and grounded in Oregon property maintenance realities.',
      ].join(' '),
    prompt: message,
    messages: options?.history,
  });

  if (!response.text) {
    throw new Error('Google AI returned an empty chat response.');
  }

  return response.text;
}

export async function generateCostEstimate(input: {
  projectType: string;
  details: string;
  zipCode?: string;
}) {
  const response = await ai.generate({
    model: defaultModel,
    system: [
      `You are the lead estimator for ${BUSINESS.name} in Oregon.`,
      'Return realistic homeowner-facing budget guidance, not exact quotes.',
      'Keep the range conservative and provide line-item style breakdowns, clear caveats, and a disclaimer.',
    ].join(' '),
    prompt: [
      `Project type: ${input.projectType}`,
      `Details: ${input.details}`,
      `ZIP code: ${input.zipCode || 'Unknown / Oregon default'}`,
    ].join('\n'),
    output: { schema: CostEstimateSchema },
  });

  if (!response.output) {
    throw new Error('Google AI returned an empty estimator response.');
  }

  return response.output;
}

export async function generateAgreementRecommendations(input: {
  property: unknown;
  serviceCatalog: Array<{ id: string; name: string }>;
}) {
  const response = await ai.generate({
    model: defaultModel,
    system: [
      `You are a maintenance-plan recommender for ${BUSINESS.name}.`,
      'Use the provided property details and service catalog only.',
      'Favor proactive maintenance for moisture, roofing, HVAC lifecycle, and Oregon seasonal risk.',
      'Return 1 to 3 recommendations ordered from most urgent to least urgent.',
    ].join(' '),
    prompt: JSON.stringify(input),
    output: { schema: RecommendationSchema },
  });

  if (!response.output) {
    throw new Error('Google AI returned an empty recommendation response.');
  }

  return response.output;
}

export async function generatePropertyAudit(description: string) {
  const response = await ai.generate({
    model: defaultModel,
    system: [
      `You are a senior property-risk auditor for ${BUSINESS.name} in Oregon.`,
      'Assess likely moisture, roofing, drainage, envelope, and safety risks from the provided description.',
      'Be conservative, practical, and homeowner-facing.',
      'Do not claim certainty when an on-site inspection is required.',
    ].join(' '),
    prompt: description,
    output: { schema: PropertyAuditSchema },
  });

  if (!response.output) {
    throw new Error('Google AI returned an empty property audit response.');
  }

  return response.output;
}

export async function generateMarketingAsset(input: {
  topic: string;
  businessGoals: string;
  assetType: string;
  targetUrl: string;
}) {
  const response = await ai.generate({
    model: defaultModel,
    system: [
      `You are the growth content lead for ${BUSINESS.name}.`,
      'Generate practical local-service marketing assets for Oregon property owners.',
      'Keep the content specific, conversion-aware, and aligned to building-science credibility.',
      'Return content that can be published or handed to a marketer with minimal cleanup.',
    ].join(' '),
    prompt: [
      `Topic: ${input.topic}`,
      `Business goals: ${input.businessGoals}`,
      `Asset type: ${input.assetType}`,
      `Target URL: ${input.targetUrl}`,
    ].join('\n'),
    output: { schema: MarketingContentSchema },
  });

  if (!response.output) {
    throw new Error('Google AI returned an empty marketing asset response.');
  }

  return response.output;
}
