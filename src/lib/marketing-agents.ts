import { z } from 'genkit';
import { ai } from './genkit';

// ============================================================================
// 1. SEO & AEO Strategist (Lead Role)
// ============================================================================
export const SEOStrategySchema = z.object({
  primary_keywords: z
    .array(z.string())
    .describe('Target keywords for traditional search'),
  entity_strategy: z
    .array(z.string())
    .describe('Key question entities for AI-powered search (AEO)'),
  schema_requirements: z
    .array(z.string())
    .describe('Required Schema markup (e.g., FAQ, HowTo)'),
  backlink_strategy: z
    .string()
    .describe('Recommendations for backlink acquisition'),
  internal_linking_architecture: z
    .array(z.string())
    .describe('Internal linking targets and anchor text'),
  technical_seo_dod: z
    .array(z.string())
    .describe('Definition of Done for Core Web Vitals and site speed'),
});

export const seoStrategistFlow = ai.defineFlow(
  {
    name: 'seoStrategistFlow',
    inputSchema: z.object({
      topic: z.string(),
      business_goals: z.string(),
    }),
    outputSchema: SEOStrategySchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the SEO & AEO Strategist (Lead Role) for Benson Home Solutions.
Your goal is to define the data-driven roadmap. You ensure content is discoverable by traditional search engines and modern Answer Engines/AI LLMs.
Qualifications: 5+ years tech SEO, deep expertise in structured data/JSON-LD, GA4/GSC/Semrush.`,
      prompt: `Develop a comprehensive keyword and entity-based strategy for a new guide/how-to about: ${input.topic}. Business goals: ${input.business_goals}`,
      output: { format: 'json', schema: SEOStrategySchema },
    });
    if (!response.output) throw new Error('SEO Strategy generation failed');
    return response.output;
  },
);

// ============================================================================
// 2. Editorial & Content Strategy Lead (The "Voice")
// ============================================================================
export const EditorialReviewSchema = z.object({
  approval_status: z.enum(['Yay', 'Nay']),
  feedback: z.array(z.string()).describe('Specific feedback on the content'),
  brand_voice_compliance: z
    .string()
    .describe('Notes on tone, style, and authority'),
  required_revisions: z
    .array(z.string())
    .describe('Actionable items for the writer or designer'),
});

export const editorialLeadFlow = ai.defineFlow(
  {
    name: 'editorialLeadFlow',
    inputSchema: z.object({
      content_draft: z.string(),
      asset_type: z.enum([
        'guide',
        'checklist',
        'how-to',
        'image_concept',
        'video_concept',
      ]),
    }),
    outputSchema: EditorialReviewSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Editorial & Content Strategy Lead (The "Voice") for Benson Home Solutions.
You are the guardian of brand voice, authority, and content quality. You determine the "Yay or Nay" for all content.
Qualifications: 7+ years technical writing/editing, exceptional English command, ability to translate complex logic into simple, actionable tools.`,
      prompt: `Review the following ${input.asset_type} for utility, grammatical precision, and brand voice compliance.\n\nDraft:\n${input.content_draft}`,
      output: { format: 'json', schema: EditorialReviewSchema },
    });
    if (!response.output) throw new Error('Editorial review failed');
    return response.output;
  },
);

// ============================================================================
// 3. Specialized Content Writer (Technical Writer)
// ============================================================================
export const ContentDraftSchema = z.object({
  title: z.string(),
  content: z
    .string()
    .describe(
      'The exhaustive guide (1,500+ words), precise how-to, or logical checklist (Markdown format)',
    ),
  seo_aeo_elements_used: z
    .array(z.string())
    .describe('Headers, entity keywords incorporated based on strategy'),
  interactive_tool_logic: z
    .string()
    .optional()
    .describe(
      'Conceptual logic and user-facing copy for interactive web tools/calculators, if applicable',
    ),
});

export const contentWriterFlow = ai.defineFlow(
  {
    name: 'contentWriterFlow',
    inputSchema: z.object({
      topic: z.string(),
      seo_strategy: z.any().describe('Output from the SEO Strategist'),
      asset_type: z.enum(['guide', 'checklist', 'how-to', 'interactive_tool']),
    }),
    outputSchema: ContentDraftSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Specialized Content Writer (Technical Writer) for Benson Home Solutions.
You are the technical architect of our written authority. You do not write "blog posts"; you build exhaustive guides, precise how-tos, and logical checklists.
Qualifications: 3+ years tech writing, portfolio demonstrating ability to simplify complex subjects. Apply SEO/AEO directly to the draft.`,
      prompt: `Write a ${input.asset_type} about: ${input.topic}.\n\nFollow this SEO/AEO Strategy strictly:\n${JSON.stringify(input.seo_strategy)}`,
      output: { format: 'json', schema: ContentDraftSchema },
    });
    if (!response.output) throw new Error('Content drafting failed');
    return response.output;
  },
);

// ============================================================================
// 4. Full-Stack Web Developer (Technical Web Optimizer)
// ============================================================================
export const TechnicalImplementationSchema = z.object({
  component_code: z
    .string()
    .describe(
      'React (Next.js) code for custom interactive tools or calculators',
    ),
  schema_markup: z
    .string()
    .describe(
      'JSON-LD structure for proper AEO indexing (e.g., FAQPage, HowTo, SoftwareApplication)',
    ),
  performance_optimizations: z
    .array(z.string())
    .describe(
      'Required steps/code adjustments for rapid Site Speed and CWV compliance',
    ),
});

export const webDeveloperFlow = ai.defineFlow(
  {
    name: 'webDeveloperFlow',
    inputSchema: z.object({
      tool_concept: z.string(),
      seo_requirements: z.string(),
    }),
    outputSchema: TechnicalImplementationSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Full-Stack Web Developer (Technical Web Optimizer) for Benson Home Solutions.
You are responsible for the technical performance, interactivity, and speed of our website. You build custom interactive tools (calculators) and maintain a fast, compliant site architecture.
Qualifications: 4+ years professional full-stack development. Expert in HTML, CSS, JavaScript (React/Next.js). Demonstrable understanding of technical SEO, Core Web Vitals, and JSON-LD.`,
      prompt: `Develop the technical implementation for the following interactive tool concept:\n${input.tool_concept}\n\nSEO/Schema Requirements:\n${input.seo_requirements}`,
      output: { format: 'json', schema: TechnicalImplementationSchema },
    });
    if (!response.output) throw new Error('Technical implementation failed');
    return response.output;
  },
);

// ============================================================================
// 5. Multimedia Content Specialist (Image & Video)
// ============================================================================
export const MultimediaAssetSchema = z.object({
  image_prompts: z
    .array(z.string())
    .describe(
      'Optimized prompts for image generation models (Nano Banana 1 and 2)',
    ),
  video_script: z
    .string()
    .optional()
    .describe(
      'Script for short-form instructional video suitable for generation via veo 1 and 2',
    ),
  asset_metadata: z.array(
    z.object({
      suggested_filename: z.string(),
      alt_text: z.string(),
      compression_strategy: z
        .string()
        .describe('How to optimize the file for minimum impact on site speed'),
    }),
  ),
});

export const multimediaSpecialistFlow = ai.defineFlow(
  {
    name: 'multimediaSpecialistFlow',
    inputSchema: z.object({
      content_draft: z.string(),
      asset_needs: z
        .array(z.string())
        .describe(
          "Specific assets requested (e.g., 'diagram of HVAC', 'instructional video of filter change')",
        ),
    }),
    outputSchema: MultimediaAssetSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Multimedia Content Specialist (Image & Video) for Benson Home Solutions.
You maximize user engagement by transforming concepts into high-quality visual assets. You design prompts and scripts for our generative AI video/image models (Nano Banana 1 & 2, veo 1 & 2) and optimize all assets for the web.
Qualifications: Expert command of visual design software (Nano Banana 1 and 2, veo 1 and 2). Diverse portfolio showcasing technical graphics and instructional video production.`,
      prompt: `Design the visual assets needed for this content draft:\n${input.content_draft}\n\nSpecific asset needs requested:\n${input.asset_needs.join(', ')}`,
      output: { format: 'json', schema: MultimediaAssetSchema },
    });
    if (!response.output) throw new Error('Multimedia asset generation failed');
    return response.output;
  },
);

// ============================================================================
// 6. Outreach & Growth Coordinator (The Connector)
// ============================================================================
export const OutreachCampaignSchema = z.object({
  target_personas: z
    .array(z.string())
    .describe(
      'Who we are pitching to (e.g., Real Estate Journalists, Local Oregon News)',
    ),
  unlinked_mention_strategy: z
    .string()
    .describe('How to pursue unlinked mentions for this specific campaign'),
  pitch_emails: z.array(
    z.object({
      subject: z.string(),
      body: z.string().describe('The personalized outreach email body'),
    }),
  ),
  guest_post_pitches: z.array(
    z.object({
      target_domain_type: z.string(),
      pitch_angle: z.string().describe('The angle we are selling them on'),
    }),
  ),
});

export const outreachCoordinatorFlow = ai.defineFlow(
  {
    name: 'outreachCoordinatorFlow',
    inputSchema: z.object({
      asset_url: z.string(),
      asset_summary: z.string(),
      target_keywords: z.array(z.string()),
    }),
    outputSchema: OutreachCampaignSchema,
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Outreach & Growth Coordinator (The Connector) for Benson Home Solutions.
You amplify our work by earning high-quality backlinks and relationships that drive traffic and improve search engine rankings.
Qualifications: 2+ years experience in digital PR and relationship-driven link building. Strong communication skills to pitch our calculators, guides, and tools to busy journalists.`,
      prompt: `Develop a personalized link-building and outreach campaign for this newly published asset:\nURL: ${input.asset_url}\nSummary: ${input.asset_summary}\nTarget Keywords: ${input.target_keywords.join(', ')}`,
      output: { format: 'json', schema: OutreachCampaignSchema },
    });
    if (!response.output)
      throw new Error('Outreach campaign generation failed');
    return response.output;
  },
);
