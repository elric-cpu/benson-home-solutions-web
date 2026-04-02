import { ai, defaultModel } from "../genkit-config";
import { z } from "genkit";

/**
 * Gus - The Authoritative AI Trade Assistant
 */

const ChatInputSchema = z.object({
  message: z.string().describe("User message for Gus"),
  history: z.array(z.object({
    role: z.enum(["user", "model"]),
    content: z.array(z.object({ text: z.string() }))
  })).optional().describe("Previous conversation history")
});

export const generalChatFlow = ai.defineFlow(
  {
    name: "generalChatFlow",
    inputSchema: ChatInputSchema,
    outputSchema: z.string().describe("Response from Gus"),
  },
  async ({ message, history }) => {
    try {
      const response = await ai.generate({
        model: defaultModel,
        system: "You are Gus, the authoritative AI Trade Assistant for Benson Home Solutions (CCB #258533).",
        prompt: message,
        messages: history,
      });

      return response.text;
    } catch (error: any) {
      console.error("[Gus] Flow failed:", error.message);
      return "Technical issue. - Gus";
    }
  }
);
