import { ai } from "./genkit-config";
import { z } from "genkit";
import { google } from "googleapis";
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
    google.options({ auth: authClient as any });

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
      hasIncompleteComponents: (verdict as any)?.hasIncompleteComponents,
      hasUnconfirmedComponents: (verdict as any)?.hasUnconfirmedComponents,
      hasReplacedComponents: (verdict as any)?.hasReplacedComponents,
      uspsData: result.uspsData,
    };
  }
);
