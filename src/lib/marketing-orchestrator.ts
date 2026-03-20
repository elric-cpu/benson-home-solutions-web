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
    seo_strategy: z.any().optional(),
    content_draft: z.any().optional(),
    editorial_review: z.any().optional(),
    developer_code: z.any().optional(),
    multimedia_assets: z.any().optional(),
    outreach_campaign: z.any().optional(),
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
      console.log(`[MasterFlow] Starting pipeline for topic: ${input.topic}`);
      
      // Step 1: SEO Strategy
      console.log('[MasterFlow] Running SEO Strategist...');
      const seoStrategy = await seoStrategistFlow({
        topic: input.topic,
        business_goals: input.business_goals
      });

      // Step 2: Content Writing
      console.log('[MasterFlow] Running Content Writer...');
      const contentDraft = await contentWriterFlow({
        topic: input.topic,
        seo_strategy: seoStrategy,
        asset_type: input.asset_type
      });

      // Step 3: Editorial Review
      console.log('[MasterFlow] Running Editorial Lead...');
      const editorialReview = await editorialLeadFlow({
        content_draft: contentDraft.content,
        asset_type: input.asset_type
      });

      if (editorialReview.approval_status === 'Nay') {
        console.log('[MasterFlow] Pipeline halted: Editorial rejected draft.');
        return {
          status: 'rejected',
          topic: input.topic,
          reason: 'Editorial rejection: ' + editorialReview.feedback.join('; '),
          artifacts: {
            seo_strategy: seoStrategy,
            content_draft: contentDraft,
            editorial_review: editorialReview
          }
        };
      }

      console.log('[MasterFlow] Editorial approved. Proceeding to fulfillment...');

      // Step 4: Fulfillment (Parallel)
      console.log('[MasterFlow] Running Developer, Multimedia, and Outreach...');
      
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

      console.log('[MasterFlow] Pipeline complete.');
      return {
        status: 'success',
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

    } catch (err: any) {
      console.error('[MasterFlow] Pipeline failed:', err);
      return {
        status: 'failed',
        topic: input.topic,
        reason: err.message
      };
    }
  }
);
