// src/app/api/chat/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getAIConfig } from '@/lib/ai/config';
// import { queryRecords } from '@/lib/ai/vector-service'; // Uncomment if using Pinecone RAG
// import { tools } from '@/lib/ai/tools'; // Uncomment if using custom tools

// Configure OpenRouter to act as our provider
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  // OpenRouter requires these headers for ranking/analytics
  headers: {
    'HTTP-Referer': 'https://bensonhomesolutions.com', 
    'X-Title': 'Benson Home Solutions Chat',
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // const lastMessage = messages[messages.length - 1].content;

    // 1. Get AI Config (Gus Persona)
    const config = await getAIConfig();
    const systemBase = config.chatbotSystemPrompt;

    // 2. Optional: Retrieve context from Pinecone (RAG)
    // const matches = await queryRecords(lastMessage, 5);
    // const context = matches.map((m) => m.metadata.text).join('\n\n');
    const context = "No additional context provided.";

    // 3. Generate Streamed Response using a FREE Qwen model
    const result = await streamText({
      // You can also use 'meta-llama/llama-3-8b-instruct:free'
      model: openrouter('qwen/qwen-2-7b-instruct:free'),
      system: systemBase.replace('{context}', context),
      messages,
      // tools, // Uncomment if Gus needs to call tools
      temperature: 0.2, // Keep it low so Gus stays strict and on-script
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[Chat API Error]', error);
    
    // Return a visible error to the frontend instead of failing silently
    return new Response(
      JSON.stringify({ error: 'Gus is currently ignoring you (Server Error).' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}