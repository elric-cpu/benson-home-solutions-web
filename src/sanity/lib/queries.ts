import { groq } from 'next-sanity';

export const getAIConfigQuery = groq`
  *[_type == "siteSettings"][0].aiConfig {
    chatbotSystemPrompt,
    chatbotWelcomeMessage
  }
`;
