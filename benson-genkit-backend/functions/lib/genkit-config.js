"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultModel = exports.ai = void 0;
const genkit_1 = require("genkit");
const google_genai_1 = require("@genkit-ai/google-genai");
const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const defaultModel = google_genai_1.vertexAI.model('gemini-2.5-flash');
exports.defaultModel = defaultModel;
exports.ai = (0, genkit_1.genkit)({
    plugins: [
        (0, google_genai_1.vertexAI)({
            projectId,
            location,
        }),
    ],
    model: defaultModel,
});
//# sourceMappingURL=genkit-config.js.map