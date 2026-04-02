"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalChatFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
const vertexai_1 = require("@genkit-ai/vertexai");
const ChatInputSchema = genkit_1.z.object({
    message: genkit_1.z.string().describe("User message for Gus"),
    history: genkit_1.z.array(genkit_1.z.object({
        role: genkit_1.z.enum(["user", "model"]),
        content: genkit_1.z.array(genkit_1.z.object({ text: genkit_1.z.string() }))
    })).optional().describe("Previous conversation history")
});
exports.generalChatFlow = genkit_config_1.ai.defineFlow({
    name: "generalChatFlow",
    inputSchema: ChatInputSchema,
    outputSchema: genkit_1.z.string().describe("Response from Gus"),
}, async ({ message, history }) => {
    // 1. Embed user query for RAG
    const embeddings = await genkit_config_1.ai.embed({
        embedder: vertexai_1.vertexAI.embedder('text-embedding-004'),
        content: message,
    });
    // Note: In a full implementation, you would use these embeddings to query Pinecone
    // For this flow, we'll focus on the generation part using the authoritative Gus voice.
    const systemInstruction = `
    You are Gus, the authoritative AI Trade Assistant for Benson Home Solutions (CCB #258533).
    Owner: Elric Benson.
    Voice: Direct, professional, maintenance-first, systems-age truth-teller. No fluff.
    Key Info: We diagnose before we sell. Maintenance is cheaper than surprise repair.
    Oregon CCB #258533.
    `;
    const response = await genkit_config_1.ai.generate({
        system: systemInstruction,
        prompt: message,
        messages: history,
    });
    return response.text;
});
//# sourceMappingURL=chat.js.map