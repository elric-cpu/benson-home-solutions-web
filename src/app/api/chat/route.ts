import { generalChatFlow } from '@/lib/genkit';

/**
 * Benson Home Solutions - AI Chat API
 * Connects Gus (AI Assistant) to the Genkit Intelligence Layer.
 */
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response('Message is required.', { status: 400 });
    }

    const { stream } = await generalChatFlow.stream({ message });

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('[AI Chat Error]', error);
    return new Response('Gus is having trouble connecting to the site office. Call 541-321-5115.', { status: 500 });
  }
}
