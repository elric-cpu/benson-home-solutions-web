'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.supportFlow = void 0;
const genkit_1 = require('genkit');
const googleai_1 = require('@genkit-ai/googleai');
const functions_1 = require('@genkit-ai/firebase/functions');
const tools_1 = require('../tools');
const ai = (0, genkit_1.genkit)({});
exports.supportFlow = (0, functions_1.onFlow)(
  ai,
  {
    name: 'supportAgent',
    inputSchema: genkit_1.z.string(),
    outputSchema: genkit_1.z.string(),
    authPolicy: (0, functions_1.noAuth)(),
  },
  async (query) => {
    const response = await ai.generate({
      model: googleai_1.gemini15Flash,
      prompt: `You are a helpful customer support agent for Benson Home Solutions. 
      Answer the user's question using the provided tools for pricing and service areas.
      If you don't know the answer, ask them to contact support.
      
      User query: ${query}`,
      tools: [tools_1.getPricingTool, tools_1.checkServiceAreaTool],
    });
    return response.text;
  },
);
//# sourceMappingURL=support.js.map
