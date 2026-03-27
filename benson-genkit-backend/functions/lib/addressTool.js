'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateAddressTool = void 0;
const genkit_1 = require('genkit');
const googleapis_1 = require('googleapis');
const ai = (0, genkit_1.genkit)({});
const addressvalidation = googleapis_1.google.addressvalidation('v1');
exports.validateAddressTool = ai.defineTool(
  {
    name: 'validateAddress',
    description:
      'Validates a US address using Google Maps Address Validation API.',
    inputSchema: genkit_1.z.object({
      address: genkit_1.z.string().describe('The full address to validate'),
    }),
  },
  async ({ address }) => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/maps-platform.addressvalidation',
      ],
    });
    const authClient = await auth.getClient();
    googleapis_1.google.options({ auth: authClient });
    const response = await addressvalidation.v1.validateAddress({
      requestBody: {
        address: {
          addressLines: [address],
        },
      },
    });
    const result = response.data.result;
    if (!result) {
      throw new Error('No validation result returned from Google.');
    }
    const verdict = result.verdict;
    const addressDetails = result.address;
    return {
      isValid:
        verdict?.validationGranularity === 'SUB_PREMISE' ||
        verdict?.validationGranularity === 'PREMISE',
      standardizedAddress: addressDetails?.formattedAddress,
      granularity: verdict?.validationGranularity,
      hasIncompleteComponents: verdict?.hasIncompleteComponents,
      hasUnconfirmedComponents: verdict?.hasUnconfirmedComponents,
      hasReplacedComponents: verdict?.hasReplacedComponents,
      uspsData: result.uspsData,
    };
  },
);
//# sourceMappingURL=addressTool.js.map
