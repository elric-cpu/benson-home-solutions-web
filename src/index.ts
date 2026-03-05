// src/index.ts
import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string().describe('The name to say hello to'),
    outputSchema: z.string().describe('A friendly greeting'),
  },
  async (name) => {
    const response = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Say hello to ${name}.`,
    });
    return response.text;
  }
);
