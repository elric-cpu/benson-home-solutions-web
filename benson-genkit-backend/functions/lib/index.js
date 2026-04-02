"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationFlowEndpoint = exports.chatEndpoint = exports.costEstimationEndpoint = exports.marketingContentEndpoint = exports.websiteMaintenanceEndpoint = exports.productionEndpoint = exports.departmentIdeationEndpoint = exports.setupGoogleApisEndpoint = exports.validateAddressEndpoint = exports.optimizeSiteEndpoint = exports.supportEndpoint = void 0;
const https_1 = require("firebase-functions/https");
const support_1 = require("./flows/support");
const seo_1 = require("./flows/seo");
const address_1 = require("./flows/address");
const setup_1 = require("./flows/setup");
const departments_1 = require("./flows/departments");
const marketingContentFlow_1 = require("./flows/marketingContentFlow");
const estimator_1 = require("./flows/estimator");
const chat_1 = require("./flows/chat");
const recommendation_1 = require("./flows/recommendation");
function onRequestFlow(handler) {
    return (0, https_1.onRequest)(async (request, response) => {
        if (request.method !== 'POST') {
            response.status(405).json({ error: 'Method not allowed' });
            return;
        }
        try {
            const body = typeof request.body === 'object' && request.body !== null ? request.body : {};
            const input = ('data' in body ? body.data : body);
            const result = await handler(input);
            response.status(200).json({ result });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown flow error';
            response.status(500).json({ error: message });
        }
    });
}
exports.supportEndpoint = (0, https_1.onCallGenkit)(support_1.supportFlow);
exports.optimizeSiteEndpoint = (0, https_1.onCallGenkit)(seo_1.optimizeSiteFlow);
exports.validateAddressEndpoint = (0, https_1.onCallGenkit)(address_1.validateAddressFlow);
exports.setupGoogleApisEndpoint = (0, https_1.onCallGenkit)(setup_1.setupGoogleApisFlow);
exports.departmentIdeationEndpoint = (0, https_1.onCallGenkit)(departments_1.departmentIdeationFlow);
exports.productionEndpoint = (0, https_1.onCallGenkit)(departments_1.productionFlow);
exports.websiteMaintenanceEndpoint = (0, https_1.onCallGenkit)(departments_1.websiteMaintenanceFlow);
exports.marketingContentEndpoint = (0, https_1.onCallGenkit)(marketingContentFlow_1.marketingContentFlow);
exports.costEstimationEndpoint = onRequestFlow(estimator_1.costEstimationFlow);
exports.chatEndpoint = onRequestFlow(chat_1.generalChatFlow);
exports.recommendationFlowEndpoint = onRequestFlow(recommendation_1.recommendationFlow);
//# sourceMappingURL=index.js.map