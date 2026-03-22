import { genkit, z } from "genkit";
import { google } from "googleapis";

const ai = genkit({});
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
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient as never });

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
  }
);