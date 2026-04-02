import { ai } from "../genkit-config";
import { z } from "genkit";

export const supportFlow = ai.defineFlow(
  {
    name: "supportFlow",
    inputSchema: z.string().describe("The user's support query"),
    outputSchema: z.string().describe("The support agent's response"),
  },
  async (query) => {
    const response = await ai.generate({
      prompt: `You are a helpful support agent for Benson Home Solutions (CCB #258533). 
      The owner is Elric Benson. 
      Answer this query professionally: ${query}`,
    });

    return response.text;
  }
);
