/**
 * Gumloop AI Utility
 * Provides a robust interface for triggering and polling specialized AI workflows.
 */

const GUMLOOP_API_BASE = 'https://api.gumloop.com/api/v1';

export interface GumloopRunResponse {
  run_id: string;
}

export interface GumloopStatusResponse {
  state: 'COMPLETED' | 'RUNNING' | 'FAILED' | 'PENDING';
  outputs: Record<string, unknown>;
  error?: string;
}

/**
 * Trigger a Gumloop pipeline and poll for completion.
 */
export async function runGumloopFlow<T>(
  pipelineId: string,
  inputs: Record<string, unknown>,
  pollingInterval = 2000,
  maxAttempts = 30,
): Promise<T> {
  const apiKey = process.env.GUMLOOP_API_KEY;
  const userId = process.env.GUMLOOP_USER_ID;

  if (!apiKey || !userId) {
    throw new Error('GUMLOOP_API_KEY or GUMLOOP_USER_ID is not configured.');
  }

  // 1. Start the pipeline
  const startRes = await fetch(`${GUMLOOP_API_BASE}/start_pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      saved_item_id: pipelineId,
      pipeline_inputs: Object.entries(inputs).map(([name, value]) => ({
        input_name: name,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      })),
    }),
  });

  if (!startRes.ok) {
    const errorText = await startRes.text();
    throw new Error(`Failed to start Gumloop pipeline: ${errorText}`);
  }

  const { run_id } = (await startRes.json()) as GumloopRunResponse;

  // 2. Poll for results
  let attempts = 0;
  while (attempts < maxAttempts) {
    const statusRes = await fetch(
      `${GUMLOOP_API_BASE}/get_pl_run?run_id=${run_id}&user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!statusRes.ok) {
      throw new Error(`Failed to check Gumloop run status: ${run_id}`);
    }

    const data = (await statusRes.json()) as GumloopStatusResponse;

    if (data.state === 'COMPLETED') {
      // Return the outputs. Assuming there's a primary output or we return all.
      // Usually, we look for the output of the last node or a specific named output.
      return data.outputs as T;
    }

    if (data.state === 'FAILED') {
      throw new Error(`Gumloop run failed: ${data.error || 'Unknown error'}`);
    }

    // Wait and retry
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
    attempts++;
  }

  throw new Error(`Gumloop run timed out: ${run_id}`);
}
