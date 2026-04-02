import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().describe("The name of the lead"),
  email: z.string().email().describe("The email address of the lead"),
  phone: z.string().optional().describe("The phone number of the lead"),
  projectDescription: z.string().describe("Description of the home improvement project"),
});

export const QuoteRequestSchema = z.object({
  serviceType: z.string().describe("The type of service requested (e.g., roofing, bathroom remodel)"),
  squareFootage: z.number().optional().describe("Approximate square footage for the project"),
  urgency: z.enum(["low", "medium", "high", "emergency"]).describe("How urgent the request is"),
});

export const CostEstimationSchema = z.object({
  estimated_range: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string().default("USD"),
  }),
  breakdown: z.array(
    z.object({
      item: z.string(),
      cost_estimate: z.string(),
    })
  ),
  caveats: z.array(z.string()),
  disclaimer: z.string().describe("Standard CCB #258533 disclaimer"),
});

export const ChatInputSchema = z.object({
  message: z.string().describe("User's query for Gus the AI assistant"),
  history: z.array(z.object({
    role: z.enum(["user", "model"]),
    text: z.string(),
  })).optional(),
});