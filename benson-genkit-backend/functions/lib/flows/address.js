"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddressFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
exports.validateAddressFlow = genkit_config_1.ai.defineFlow({
    name: "validateAddressFlow",
    inputSchema: genkit_1.z.string().describe("The address to validate"),
    outputSchema: genkit_1.z.object({
        isValid: genkit_1.z.boolean(),
        formattedAddress: genkit_1.z.string().optional(),
        error: genkit_1.z.string().optional(),
    }),
}, async (address) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `Validate the following address: ${address}. 
      Return a JSON object with 'isValid' (boolean), 'formattedAddress' (string), and 'error' (string, if any).`,
        output: {
            schema: genkit_1.z.object({
                isValid: genkit_1.z.boolean(),
                formattedAddress: genkit_1.z.string(),
                error: genkit_1.z.string().optional(),
            })
        }
    });
    return response.output;
});
//# sourceMappingURL=address.js.map