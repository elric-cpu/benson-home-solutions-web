import { ai } from "./genkit-config";
import { z } from "genkit";
import { google } from "googleapis";
const searchconsole = google.searchconsole("v1");

export const getSearchPerformance = ai.defineTool(
  {
    name: "getSearchPerformance",
    description: "Fetches search queries, impressions, and CTR from Google Search Console for a specific site.",
    inputSchema: z.object({
      siteUrl: z.string().describe("The URL of the property in GSC (e.g., https://example.com/)"),
      days: z.number().default(30).describe("Number of days of data to look back"),
    }),
  },
  async (input) => {
    if (!process.env.GSC_CLIENT_EMAIL || !process.env.GSC_PRIVATE_KEY) {
      throw new Error('GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY must be configured for Search Console access.');
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GSC_CLIENT_EMAIL,
          // Replace literal \n with actual newlines for private key parsing
          private_key: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
      });
      const authClient = await auth.getClient();
      google.options({ auth: authClient as any });

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);
      
      const response = await searchconsole.searchanalytics.query({
        siteUrl: input.siteUrl,
        requestBody: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          dimensions: ["query"],
          rowLimit: 25,
        },
      });

      const rows = response.data.rows || [];
      
      return rows.map(row => ({
        query: row.keys?.[0] || "unknown",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: (row.ctr || 0) * 100, // Convert to percentage
        position: row.position || 0,
      }));
    } catch (error) {
      console.error('[GSC Tool] Error fetching search performance:', error);
      throw new Error('Failed to fetch GSC data', { cause: error });
    }
  }
);
