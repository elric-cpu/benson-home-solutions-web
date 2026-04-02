"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInputSchema = exports.CostEstimationSchema = exports.QuoteRequestSchema = exports.LeadSchema = void 0;
const zod_1 = require("zod");
exports.LeadSchema = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the lead"),
    email: zod_1.z.string().email().describe("The email address of the lead"),
    phone: zod_1.z.string().optional().describe("The phone number of the lead"),
    projectDescription: zod_1.z.string().describe("Description of the home improvement project"),
});
exports.QuoteRequestSchema = zod_1.z.object({
    serviceType: zod_1.z.string().describe("The type of service requested (e.g., roofing, bathroom remodel)"),
    squareFootage: zod_1.z.number().optional().describe("Approximate square footage for the project"),
    urgency: zod_1.z.enum(["low", "medium", "high", "emergency"]).describe("How urgent the request is"),
});
exports.CostEstimationSchema = zod_1.z.object({
    estimated_range: zod_1.z.object({
        min: zod_1.z.number(),
        max: zod_1.z.number(),
        currency: zod_1.z.string().default("USD"),
    }),
    breakdown: zod_1.z.array(zod_1.z.object({
        item: zod_1.z.string(),
        cost_estimate: zod_1.z.string(),
    })),
    caveats: zod_1.z.array(zod_1.z.string()),
    disclaimer: zod_1.z.string().describe("Standard CCB #258533 disclaimer"),
});
exports.ChatInputSchema = zod_1.z.object({
    message: zod_1.z.string().describe("User's query for Gus the AI assistant"),
    history: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.enum(["user", "model"]),
        text: zod_1.z.string(),
    })).optional(),
});
//# sourceMappingURL=schemas.js.map