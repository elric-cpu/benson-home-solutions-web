import { genkit, z } from "genkit";
import { google } from "googleapis";

const ai = genkit({});
const addressvalidation = google.addressvalidation("v1");

export const validateAddressTool = ai.defineTool(
  {
    name: "validateAddress",
    description: "Validates a US address using Google Maps Address Validation API.",
    inputSchema: z.object({
      address: z.string().describe("The full address to validate"),
    }),
  },
  async ({ address }) => {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/maps-platform.addressvalidation"],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient as never });

    const response = await addressvalidation.v1.validateAddress({
      requestBody: {
        address: {
          addressLines: [address],
        },
      },
    });

    const result = response.data.result;
    if (!result) {
      throw new Error("No validation result returned from Google.");
    }

    const verdict = result.verdict;
    const addressDetails = result.address;
    
    return {
      isValid: verdict?.validationGranularity === "SUB_PREMISE" || verdict?.validationGranularity === "PREMISE",
      standardizedAddress: addressDetails?.formattedAddress,
      granularity: verdict?.validationGranularity,
      hasIncompleteComponents: (verdict as Record<string, unknown>)?.hasIncompleteComponents,
      hasUnconfirmedComponents: (verdict as Record<string, unknown>)?.hasUnconfirmedComponents,
      hasReplacedComponents: (verdict as Record<string, unknown>)?.hasReplacedComponents,
      uspsData: result.uspsData,
    };
  }
);
