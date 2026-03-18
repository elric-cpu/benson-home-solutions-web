"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRequestSchema = exports.LeadSchema = void 0;
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
//# sourceMappingURL=schemas.js.map