import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

/**
 * Basic Inference Flow
 * A simple example to verify Genkit is working.
 */
export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string().describe('Your name'),
    outputSchema: z.string().describe('Greeting message'),
  },
  async (name) => {
    const response = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Say hello to ${name} in a professional, direct, and slightly sarcastic tone.`,
    });
    return response.text;
  },
);
