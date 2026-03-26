import { generalChatFlow } from '@/lib/genkit';
import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_MESSAGES_PER_WINDOW = 10;
const MAX_MESSAGE_LENGTH = 1000; // Characters
const ipSubmissions = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}
function isRateLimited(ip: string): boolean {
  if (ip === 'unknown') return false;

  const now = Date.now();
  let attempts = ipSubmissions.get(ip) || [];

  // Filter out stale attempts (attempts older than RATE_LIMIT_WINDOW_MS)
  attempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  // If all previous attempts have expired, and there's no current attempt yet, delete the IP from the map.
  // We do this before adding the current attempt to allow pruning for inactive IPs.
  if (attempts.length === 0 && ipSubmissions.has(ip)) {
    ipSubmissions.delete(ip);
  }

  // Check if adding the current attempt would exceed the limit
  if (attempts.length >= MAX_MESSAGES_PER_WINDOW) {
    ipSubmissions.set(ip, attempts);
    return true; // Rate limited
  }

  // Add the current attempt
  attempts.push(now);
  ipSubmissions.set(ip, attempts);

  return false; // Not rate limited
}

/**
 * Benson Home Solutions - AI Chat API
 * Connects Gus (AI Assistant) to the Genkit Intelligence Layer.
 */
export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return new NextResponse('Too many messages. Please wait a minute and try again.', { status: 429 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return new NextResponse('Message is required.', { status: 400 });
    }
    
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new NextResponse(`Message is too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.`, { status: 400 });
    }

    const { stream } = await generalChatFlow.stream({ message: message.trim() });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
        } catch (streamError) {
          console.error('[AI Chat Stream Error]', streamError);
          controller.enqueue(
            new TextEncoder().encode(
              'Benson Home Solutions is licensed under Oregon CCB #258533. If the assistant is offline, call 541-321-5115 and we will handle it directly.'
            )
          );
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
    return new Response(
      'Benson Home Solutions is licensed under Oregon CCB #258533. If the assistant is offline, call 541-321-5115 and we will handle it directly.',
      { status: 500 }
    );
  }
}
