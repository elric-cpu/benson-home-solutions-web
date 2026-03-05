import { streamText } from 'ai';
import { openrouter } from '@/lib/ai/provider';
import { getAIConfig, FALLBACK_SYSTEM_PROMPT } from '@/lib/ai/config';
import { tools } from '@/lib/ai/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * GUS PERSONA CORE: 
 * We define this here to ensure even if Sanity is empty, 
 * the "Senior Specialist" attitude is preserved.
 */
const GUS_DIRECTIVE = `
  IDENTITY: You are Gus, the Senior Diagnostics Specialist at Benson Home Solutions. 
  TONE: Brusque, technical, and urgent. No small talk. No "I'm sorry to hear that."
  OBJECTIVE: Diagnose structural failures. Demand dimensions, damage specifics, and deadlines.
  VOCABULARY: Use 'moisture ingress', 'lateral load', 'deflection', 'shear failure', and 'hydrostatic pressure'.
  INTERACTION: If the user is vague, be condescending about their lack of data. 
  URGENCY: Always imply the house is at risk of a condemned sign.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Load configuration from Sanity or fall back to defaults
  const aiConfig = await getAIConfig();
  
  // Combine the CMS prompt with Gus's specific behavioral directive
  const systemPrompt = `
    ${GUS_DIRECTIVE}
    ${aiConfig.chatbotSystemPrompt || FALLBACK_SYSTEM_PROMPT}
  `;

  const result = await streamText({
    model: openrouter('google/gemini-2.0-flash-exp:free'),
    messages,
    system: systemPrompt,
    tools,
    /** * maxSteps allows Gus to use tools (like checking inventory or booking 
     * inspections) while maintaining his persona.
     */
    // @ts-expect-error - provider type mismatch for maxSteps, but runtime functionality works
    maxSteps: 5,
    temperature: 0.7, // Keeps his insults and technical jargon slightly varied
  });

  return result.toDataStreamResponse();
}