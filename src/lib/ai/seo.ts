import { runGumloopFlow } from './gumloop';

/**
 * SEO AI Utility
 * Uses specialized Gumloop agents to generate AEO and SGO optimized content.
 */

export interface AnswerFirstSummaryResponse {
  summary: string;
}

/**
 * Generates an "Answer-First" summary for a service page.
 * Targets Answer Engine Optimization (AEO).
 */
export async function generateAnswerFirstSummary(
  title: string,
  content: string,
): Promise<string> {
  const pipelineId =
    process.env.GUMLOOP_SEO_PIPELINE_ID || 'q919eEgk5ftsYnqebRngdt';

  try {
    const outputs = await runGumloopFlow<Record<string, unknown>>(pipelineId, {
      input_data: {
        title,
        content: content.slice(0, 5000), // Limit content size for LLM context
        task: 'generate_aeo_summary',
      },
    });

    // Find the summary output in the completed flow
    const summary = Object.values(outputs).find(
      (val) => typeof val === 'string' && val.length > 50,
    );

    if (typeof summary === 'string') {
      return summary;
    }

    throw new Error('Gumloop failed to return a valid summary string');
  } catch (error) {
    console.error('[SEO AI] Failed to generate AEO summary:', error);
    throw error;
  }
}
