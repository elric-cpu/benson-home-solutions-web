// src/app/api/chat/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getAIConfig } from '@/lib/ai/config';
import { queryRecords } from '@/lib/ai/vector-service'; 
import { tools } from '@/lib/ai/tools'; 

// Configure OpenRouter to act as our provider
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://bensonhomesolutions.com', 
    'X-Title': 'Benson Home Solutions Chat',
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Get AI Config (Silas/Gus Persona)
    const config = await getAIConfig();
    const systemBase = config.chatbotSystemPrompt;

    // 2. Retrieve context from Pinecone (RAG) with a timeout
    let context = "No additional context provided.";
    try {
      const ragPromise = queryRecords(lastMessage, 5);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('RAG Timeout')), 3000)
      );
      
      const matches = await Promise.race([ragPromise, timeoutPromise]) as any[];
      if (matches && matches.length > 0) {
        context = matches.map((m) => m.metadata.text).join('\n\n');
      }
    } catch (ragError) {
      console.error('[Chat API] RAG retrieval failed or timed out:', ragError);
    }

    // 3. Generate Streamed Response using a reliable model
    const result = await streamText({
      model: openrouter('anthropic/claude-3.5-sonnet'),
      system: systemBase.replace('{context}', context),
      messages,
      tools,
      maxSteps: 5,
      temperature: 0.7, 
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[Chat API Error]', error);
    
    return new Response(
      JSON.stringify({ error: 'Silas is currently ignoring you (Server Error).' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
