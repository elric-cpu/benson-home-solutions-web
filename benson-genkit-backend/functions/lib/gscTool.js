"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchPerformance = void 0;
const genkit_1 = require("genkit");
const googleapis_1 = require("googleapis");
const ai = (0, genkit_1.genkit)({});
const searchconsole = googleapis_1.google.searchconsole("v1");
exports.getSearchPerformance = ai.defineTool({
    name: "getSearchPerformance",
    description: "Fetches search queries, impressions, and CTR from Google Search Console for a specific site.",
    inputSchema: genkit_1.z.object({
        siteUrl: genkit_1.z.string().describe("The URL of the property in GSC (e.g., https://example.com/)"),
        days: genkit_1.z.number().default(30).describe("Number of days of data to look back"),
    }),
}, async (input) => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
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
});
//# sourceMappingURL=gscTool.js.map