import { genkit, z } from 'genkit';

// Initialize genkit instance
const ai = genkit({});

// Pricing Tool
export const getPricingTool = ai.defineTool(
  {
    name: 'getServicePricing',
    description:
      'Looks up estimated pricing for Benson Home Solutions services.',
    inputSchema: z.object({
      serviceType: z
        .string()
        .describe('The service type (e.g., kitchen, bathroom, roofing)'),
    }),
  },
  async ({ serviceType }) => {
    // Hardcoded logic for sample implementation
    const pricingDb: Record<string, string> = {
      kitchen: 'Kitchen remodels start at $15,000.',
      bathroom: 'Bathroom remodels start at $8,000.',
      roofing: 'Roof replacements start at $10,000.',
    };

    const key = serviceType.toLowerCase();
    for (const [k, v] of Object.entries(pricingDb)) {
      if (key.includes(k)) return v;
    }

    return 'Pricing for that service varies. Please request a custom quote.';
  },
);

// Service Areas Tool
export const checkServiceAreaTool = ai.defineTool(
  {
    name: 'checkServiceArea',
    description:
      "Checks if a specific zip code or city is within Benson Home Solutions' service area.",
    inputSchema: z.object({
      location: z.string().describe('The city or zip code to check'),
    }),
  },
  async ({ location }) => {
    const validAreas = [
      '97386',
      'albany',
      'lebanon',
      'sweet home',
      'harney',
      'burns',
      'riley',
      'drewsey',
      'denio',
      'mcdermitt',
    ];
    const loc = location.toLowerCase();

    for (const area of validAreas) {
      if (loc.includes(area)) {
        return `Yes, ${location} is within our standard service area.`;
      }
    }
    return `We might not service ${location}. Our primary areas are Mid-Willamette Valley (Albany, Lebanon, Sweet Home) and Harney County.`;
  },
);
