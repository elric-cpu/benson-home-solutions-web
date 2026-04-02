import { ai } from "../genkit-config";
import { z } from "genkit";

export const validateAddressFlow = ai.defineFlow(
  {
    name: "validateAddressFlow",
    inputSchema: z.string().describe("The address to validate"),
    outputSchema: z.object({
      isValid: z.boolean(),
      formattedAddress: z.string().optional(),
      error: z.string().optional(),
    }),
  },
  async (address) => {
    // In a real app, you would call the Google Maps Address Validation API here.
    // For this example, we'll use Genkit to "simulated" validation.
    const response = await ai.generate({
      prompt: `Validate the following address: ${address}. 
      Return a JSON object with 'isValid' (boolean), 'formattedAddress' (string), and 'error' (string, if any).`,
      output: {
        schema: z.object({
          isValid: z.boolean(),
          formattedAddress: z.string(),
          error: z.string().optional(),
        })
      }
    });

    return response.output!;
  }
);
