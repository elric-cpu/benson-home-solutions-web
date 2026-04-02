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
    if (!process.env.GSC_CLIENT_EMAIL || !process.env.GSC_PRIVATE_KEY) {
        throw new Error('GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY must be configured for Search Console access.');
    }
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GSC_CLIENT_EMAIL,
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
            ctr: (row.ctr || 0) * 100,
            position: row.position || 0,
        }));
    }
    catch (error) {
        console.error('[GSC Tool] Error fetching search performance:', error);
        throw new Error('Failed to fetch GSC data', { cause: error });
    }
});
//# sourceMappingURL=gscTool.js.map