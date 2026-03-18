"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddressFlow = void 0;
const genkit_1 = require("genkit");
const functions_1 = require("@genkit-ai/firebase/functions");
const addressTool_1 = require("../addressTool");
const ai = (0, genkit_1.genkit)({});
exports.validateAddressFlow = (0, functions_1.onFlow)(ai, {
    name: "validateAddressFlow",
    inputSchema: genkit_1.z.string().describe("The address to validate"),
    outputSchema: genkit_1.z.object({
        isValid: genkit_1.z.boolean(),
        standardizedAddress: genkit_1.z.string().optional(),
        message: genkit_1.z.string(),
        details: genkit_1.z.any().optional(),
    }),
    authPolicy: (0, functions_1.noAuth)(),
}, async (address) => {
    const result = await (0, addressTool_1.validateAddressTool)({ address });
    let message = "Address is valid.";
    if (!result.isValid) {
        if (result.hasIncompleteComponents) {
            message = "Address is incomplete. Please provide more details (e.g., street number or unit).";
        }
        else if (result.hasUnconfirmedComponents) {
            message = "Could not confirm all components of this address.";
        }
        else {
            message = "Address might be invalid or not precise enough.";
        }
    }
    return {
        isValid: result.isValid,
        standardizedAddress: result.standardizedAddress,
        message,
        details: result,
    };
});
//# sourceMappingURL=address.js.map