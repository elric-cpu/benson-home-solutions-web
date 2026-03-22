import { z } from 'genkit';
import { ai } from './genkit';
import {
  seoStrategistFlow,
  contentWriterFlow,
  editorialLeadFlow,
  webDeveloperFlow,
  multimediaSpecialistFlow,
  outreachCoordinatorFlow
} from './marketing-agents';

export const MarketingPipelineResultSchema = z.object({
  status: z.enum(['success', 'rejected', 'failed']),
  topic: z.string(),
  reason: z.string().optional(),
  artifacts: z.object({
    seo_strategy: z.unknown().optional(),
    content_draft: z.unknown().optional(),
    editorial_review: z.unknown().optional(),
    developer_code: z.unknown().optional(),
    multimedia_assets: z.unknown().optional(),
    outreach_campaign: z.unknown().optional(),
  }).optional(),
});

export const masterMarketingFlow = ai.defineFlow(
  {
    name: 'masterMarketingFlow',
    inputSchema: z.object({
      topic: z.string(),
      business_goals: z.string(),
      asset_type: z.enum(['guide', 'checklist', 'how-to', 'interactive_tool']).default('guide'),
      target_url: z.string().default('https://bensonhomesolutions.com/new-asset'),
    }),
    outputSchema: MarketingPipelineResultSchema,
  },
  async (input) => {
    try {
      console.warn(`[MasterFlow] Starting pipeline for topic: ${input.topic}`);
      
      // Step 1: SEO Strategy
      console.warn('[MasterFlow] Running SEO Strategist...');
      const seoStrategy = await seoStrategistFlow({
        topic: input.topic,
        business_goals: input.business_goals
      });

      // Step 2: Content Writing
      console.warn('[MasterFlow] Running Content Writer...');
      const contentDraft = await contentWriterFlow({
        topic: input.topic,
        seo_strategy: seoStrategy,
        asset_type: input.asset_type
      });

      // Step 3: Editorial Review
      console.warn('[MasterFlow] Running Editorial Lead...');
      const editorialReview = await editorialLeadFlow({
        content_draft: contentDraft.content,
        asset_type: input.asset_type as 'guide' | 'checklist' | 'how-to'
      });

      if (editorialReview.approval_status === 'Nay') {
        console.warn('[MasterFlow] Pipeline halted: Editorial rejected draft.');
        return {
          status: 'rejected' as const,
          topic: input.topic,
          reason: 'Editorial rejection: ' + editorialReview.feedback.join('; '),
          artifacts: {
            seo_strategy: seoStrategy,
            content_draft: contentDraft,
            editorial_review: editorialReview
          }
        };
      }

      console.warn('[MasterFlow] Editorial approved. Proceeding to fulfillment...');

      // Step 4: Fulfillment (Parallel)
      console.warn('[MasterFlow] Running Developer, Multimedia, and Outreach...');
      
      const developerCodePromise = input.asset_type === 'interactive_tool' || contentDraft.interactive_tool_logic 
        ? webDeveloperFlow({
            tool_concept: contentDraft.interactive_tool_logic || input.topic,
            seo_requirements: JSON.stringify(seoStrategy.schema_requirements)
          })
        : Promise.resolve(null);

      const [developerCode, multimediaAssets, outreachCampaign] = await Promise.all([
        developerCodePromise,
        multimediaSpecialistFlow({
          content_draft: contentDraft.content,
          asset_needs: ['hero image', 'infographic for guide steps']
        }),
        outreachCoordinatorFlow({
          asset_url: input.target_url,
          asset_summary: contentDraft.title,
          target_keywords: seoStrategy.primary_keywords
        })
      ]);

      console.warn('[MasterFlow] Pipeline complete.');
      return {
        status: 'success' as const,
        topic: input.topic,
        artifacts: {
          seo_strategy: seoStrategy,
          content_draft: contentDraft,
          editorial_review: editorialReview,
          developer_code: developerCode,
          multimedia_assets: multimediaAssets,
          outreach_campaign: outreachCampaign
        }
      };

    } catch (err: unknown) {
      console.error('[MasterFlow] Pipeline failed:', err);
      return {
        status: 'failed' as const,
        topic: input.topic,
        reason: err instanceof Error ? err.message : String(err)
      };
    }
  }
);
