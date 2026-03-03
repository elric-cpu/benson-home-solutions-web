import { client } from '@/sanity/lib/client';

export interface AIConfig {
  chatbotSystemPrompt?: string;
  chatbotWelcomeMessage?: string;
}

const aiConfigQuery = `*[_type == "siteSettings"][0].aiConfig{
  chatbotSystemPrompt,
  chatbotWelcomeMessage
}`;

export async function getAIConfig(): Promise<AIConfig> {
  try {
    const config = await client.fetch<AIConfig | null>(aiConfigQuery);
    return config || {};
  } catch (error) {
    console.error('[AI Config] Failed to fetch from Sanity:', error);
    return {};
  }
}
