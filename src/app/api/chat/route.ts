import { NextRequest } from 'next/server';
import { executeFlow, hasConfiguredBackendUrl } from '@/lib/genkit';
import { generateTradeAssistantReply, hasLocalGoogleAiConfig } from '@/lib/google-intelligence';
import { getOfficeAgentModeLabel, resolveOfficeAgentMode, routeOfficeAgents } from '@/lib/office';

/**
 * Gus - AI Trade Assistant Chat API
 * Provides responses with Gus's authoritative voice.
 */
export async function POST(request: NextRequest) {
  try {
    const { message, history, agentMode } = await request.json();
    if (!message) return new Response('Message required', { status: 400 });
    const resolvedAgentMode = resolveOfficeAgentMode(agentMode);
    const lead = resolvedAgentMode === 'multi' ? routeOfficeAgents(message).lead : null;
    const headers = {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Benson-Agent-Mode': resolvedAgentMode,
      'X-Benson-Agent-Mode-Label': getOfficeAgentModeLabel(resolvedAgentMode),
      ...(lead ? { 'X-Benson-Lead-Agent': lead.id } : {}),
    };

    if (resolvedAgentMode === 'single' && hasConfiguredBackendUrl()) {
      try {
        const response = await executeFlow('chat', { message, history });
        const text =
          typeof response.result === 'string' ? response.result : JSON.stringify(response.result);

        return new Response(text, {
          headers,
        });
      } catch (error) {
        console.error('[Chat API] Remote backend failed, falling back to local Google AI:', error);
      }
    }

    if (hasLocalGoogleAiConfig()) {
      const text = await generateTradeAssistantReply(message, {
        history,
        agentMode: resolvedAgentMode,
      });
      return new Response(text, {
        headers,
      });
    }

    return new Response(
      'Chat is unavailable because the Google AI runtime is not configured for this deployment.',
      {
        status: 503,
        headers,
      },
    );
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return new Response('Chat is temporarily unavailable. Call 541-602-9694 or use the contact form.', {
      status: 500,
    });
  }
}
