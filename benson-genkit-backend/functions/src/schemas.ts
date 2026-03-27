import { z } from 'zod';

export const LeadSchema = z.object({
  name: z.string().describe('The name of the lead'),
  email: z.string().email().describe('The email address of the lead'),
  phone: z.string().optional().describe('The phone number of the lead'),
  projectDescription: z
    .string()
    .describe('Description of the home improvement project'),
});

export const QuoteRequestSchema = z.object({
  serviceType: z
    .string()
    .describe(
      'The type of service requested (e.g., roofing, bathroom remodel)',
    ),
  squareFootage: z
    .number()
    .optional()
    .describe('Approximate square footage for the project'),
  urgency: z
    .enum(['low', 'medium', 'high', 'emergency'])
    .describe('How urgent the request is'),
});
