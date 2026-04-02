"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalChatFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
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
    try {
        const response = await genkit_config_1.ai.generate({
            model: genkit_config_1.defaultModel,
            system: "You are Gus, the authoritative AI Trade Assistant for Benson Home Solutions (CCB #258533).",
            prompt: message,
            messages: history,
        });
        return response.text;
    }
    catch (error) {
        console.error("[Gus] Flow failed:", error.message);
        return "Technical issue. - Gus";
    }
});
//# sourceMappingURL=chat.js.map