import { streamText } from 'ai';
import { openrouter } from '@/lib/ai/provider';
import { GUS_DIRECTIVE } from '@/lib/ai/config';
import { findRelevantContent } from '@/lib/ai/vector-service';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    if (!body) {
      console.error('[Gus API] Empty request body received');
      return new Response('Empty request body', { status: 400 });
    }

    const { messages } = JSON.parse(body);
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    console.log(`[Gus API] Received ${messages?.length || 0} messages. Query: "${lastMessage.substring(0, 50)}..."`);

    // 1. Fetch Context (RAG)
    let context = '';
    try {
      const relevantDocs = await findRelevantContent(lastMessage, 3);
      if (relevantDocs.length > 0) {
        context = "\n\nRELEVANT TECHNICAL CONTEXT:\n" + 
          relevantDocs.map(doc => `[Source: ${doc.title}] ${doc.text}`).join('\n---\n');
      }
    } catch (ragError) {
      console.error('[Gus RAG Error] Falling back to base persona', ragError);
    }

    // 2. Stream Response
    const result = await streamText({
      model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
      messages,
      system: GUS_DIRECTIVE + context,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[Gus API Error]', error);
    return new Response('Diagnostic terminal offline. Call the office.', { status: 500 });
  }
}
