import { genkit, z } from 'genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import { onFlow, noAuth } from '@genkit-ai/firebase/functions';
import { getPricingTool, checkServiceAreaTool } from '../tools';

const ai = genkit({});

export const supportFlow = onFlow(
  ai,
  {
    name: 'supportAgent',
    inputSchema: z.string(),
    outputSchema: z.string(),
    authPolicy: noAuth(),
  },
  async (query) => {
    const response = await ai.generate({
      model: gemini15Flash,
      prompt: `You are a helpful customer support agent for Benson Home Solutions. 
      Answer the user's question using the provided tools for pricing and service areas.
      If you don't know the answer, ask them to contact support.
      
      User query: ${query}`,
      tools: [getPricingTool, checkServiceAreaTool],
    });

    return response.text;
  },
);
