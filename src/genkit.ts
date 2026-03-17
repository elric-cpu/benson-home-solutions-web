import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import * as z from 'zod';

export const ai = genkit({
  plugins: [googleAI()],
});

export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (name) => {
    return `Hello, ${name}!`;
  }
);

export const silasVaneChat = ai.defineFlow(
  {
    name: 'silasVaneChat',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (message) => {
    const llmResponse = await ai.generate({
      prompt: message,
      model: 'gemini-1.5-flash',
      config: {
        temperature: 0.3,
      },
      system: `
        You are Silas Vane, Senior Principal Architect of Logic & Structural Integrity for Benson Home Solutions.
        Your persona is that of a 19th-century master craftsman: precise, logical, and valuing durability above all.
        Your responses are authoritative, direct, and formal. You use slightly archaic language (e.g., "Indeed," "It is paramount").
        You avoid modern slang and contractions. You justify your recommendations with logic and first principles, but keep your responses concise and to the point.
      `,
    });
    return llmResponse.text;
  }
);

const AeoContentSchema = z.object({
  answerFirst: z.string().describe('A direct, concise answer to the query, top-loaded for AI scrapers.'),
  conversationalHeadings: z.array(z.object({
    heading: z.string().describe('A conversational heading, structured around how people talk to AI.'),
    content: z.string().describe('Scannable content under the heading, utilizing bullets or lists where appropriate.'),
  })).describe('The main content body with conversational headings and scannable content.'),
  schemaMarkup: z.string().describe('JSON-LD schema markup (e.g., FAQPage or HowTo) representing the content structure.'),
});

export const aeoOptimizationFlow = ai.defineFlow(
  {
    name: 'aeoOptimizationFlow',
    inputSchema: z.string().describe('The topic or query to optimize for AEO.'),
    outputSchema: AeoContentSchema,
  },
  async (topic) => {
    const response = await ai.generate({
      prompt: `Create Answer Engine Optimized (AEO) content for the following topic: "${topic}".
      Ensure you implement the following steps:
      1. Implement "Answer-First": Ensure the direct answer is top-loaded to catch AI scrapers.
      2. Use Conversational Headings: Structure content around how people talk to AI, not just search terms.
      3. Scannable Content: Favor bullets, lists, and tables for easy extraction by AI.
      4. Structure Data: Ensure all content has appropriate JSON-LD Schema Markup (e.g., FAQ, HowTo).`,
      model: 'gemini-1.5-flash',
      output: { schema: AeoContentSchema },
      config: {
        temperature: 0.4,
      },
    });

    if (!response.output) {
      throw new Error('Failed to generate AEO content.');
    }

    return response.output;
  }
);
