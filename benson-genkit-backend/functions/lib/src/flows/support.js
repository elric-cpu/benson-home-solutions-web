"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
exports.supportFlow = genkit_config_1.ai.defineFlow({
    name: "supportFlow",
    inputSchema: genkit_1.z.string().describe("The user's support query"),
    outputSchema: genkit_1.z.string().describe("The support agent's response"),
}, async (query) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `You are a helpful support agent for Benson Home Solutions (CCB #258533). 
      The owner is Elric Benson. 
      Answer this query professionally: ${query}`,
    });
    return response.text;
});
//# sourceMappingURL=support.js.map