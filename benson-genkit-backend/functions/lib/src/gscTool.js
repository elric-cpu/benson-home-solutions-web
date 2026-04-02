"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchPerformance = void 0;
const genkit_config_1 = require("./genkit-config");
const genkit_1 = require("genkit");
const googleapis_1 = require("googleapis");
const searchconsole = googleapis_1.google.searchconsole("v1");
exports.getSearchPerformance = genkit_config_1.ai.defineTool({
    name: "getSearchPerformance",
    description: "Fetches search queries, impressions, and CTR from Google Search Console for a specific site.",
    inputSchema: genkit_1.z.object({
        siteUrl: genkit_1.z.string().describe("The URL of the property in GSC (e.g., https://example.com/)"),
        days: genkit_1.z.number().default(30).describe("Number of days of data to look back"),
    }),
}, async (input) => {
    // If we don't have credentials, return mock data instead of crashing
    if (!process.env.GSC_CLIENT_EMAIL || !process.env.GSC_PRIVATE_KEY) {
        console.warn('[GSC Tool] Missing GSC_CLIENT_EMAIL or GSC_PRIVATE_KEY. Returning demonstration data.');
        return [
            { query: 'benson home solutions', clicks: 145, impressions: 890, ctr: 16.2, position: 1.2 },
            { query: 'water damage repair albany', clicks: 42, impressions: 320, ctr: 13.1, position: 2.4 },
            { query: 'diagnostic maintenance near me', clicks: 28, impressions: 450, ctr: 6.2, position: 4.1 },
            { query: 'concrete sawing harney county', clicks: 12, impressions: 85, ctr: 14.1, position: 1.8 }
        ];
    }
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GSC_CLIENT_EMAIL,
                // Replace literal \n with actual newlines for private key parsing
                private_key: process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
        });
        const authClient = await auth.getClient();
        googleapis_1.google.options({ auth: authClient });
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
    catch (error) {
        console.error('[GSC Tool] Error fetching search performance:', error);
        throw new Error('Failed to fetch GSC data', { cause: error });
    }
});
//# sourceMappingURL=gscTool.js.map