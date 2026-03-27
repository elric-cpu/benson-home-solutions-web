import { genkit, z } from 'genkit';
import { onFlow, noAuth } from '@genkit-ai/firebase/functions';
import { validateAddressTool } from '../addressTool';

const ai = genkit({});

export const validateAddressFlow = onFlow(
  ai,
  {
    name: 'validateAddressFlow',
    inputSchema: z.string().describe('The address to validate'),
    outputSchema: z.object({
      isValid: z.boolean(),
      standardizedAddress: z.string().optional(),
      message: z.string(),
      details: z.any().optional(),
    }),
    authPolicy: noAuth(),
  },
  async (address) => {
    const result = await validateAddressTool({ address });

    let message = 'Address is valid.';
    if (!result.isValid) {
      if (result.hasIncompleteComponents) {
        message =
          'Address is incomplete. Please provide more details (e.g., street number or unit).';
      } else if (result.hasUnconfirmedComponents) {
        message = 'Could not confirm all components of this address.';
      } else {
        message = 'Address might be invalid or not precise enough.';
      }
    }

    return {
      isValid: result.isValid,
      standardizedAddress: result.standardizedAddress,
      message,
      details: result,
    };
  },
);
