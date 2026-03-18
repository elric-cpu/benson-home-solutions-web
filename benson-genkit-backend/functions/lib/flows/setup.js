"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogleApisFlow = void 0;
const genkit_1 = require("genkit");
const functions_1 = require("@genkit-ai/firebase/functions");
const googleapis_1 = require("googleapis");
const ai = (0, genkit_1.genkit)({});
const serviceusage = googleapis_1.google.serviceusage("v1");
exports.setupGoogleApisFlow = (0, functions_1.onFlow)(ai, {
    name: "setupGoogleApisFlow",
    inputSchema: genkit_1.z.void(),
    outputSchema: genkit_1.z.object({
        status: genkit_1.z.string(),
        enabledServices: genkit_1.z.array(genkit_1.z.string()),
    }),
    authPolicy: (0, functions_1.noAuth)(),
}, async () => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const authClient = await auth.getClient();
    googleapis_1.google.options({ auth: authClient });
    const projectId = await auth.getProjectId();
    const servicesToEnable = [
        "addressvalidation.googleapis.com",
        "searchconsole.googleapis.com",
        "maps-backend.googleapis.com",
        "geocoding-backend.googleapis.com",
        "aiplatform.googleapis.com",
    ];
    const enabledServices = [];
    for (const service of servicesToEnable) {
        console.log(`Checking/Enabling service: ${service}`);
        await serviceusage.services.enable({
            name: `projects/${projectId}/services/${service}`,
        });
        enabledServices.push(service);
    }
    return {
        status: "All required Google APIs have been verified/enabled.",
        enabledServices,
    };
});
//# sourceMappingURL=setup.js.map