"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteMaintenanceEndpoint = exports.productionEndpoint = exports.departmentIdeationEndpoint = exports.setupGoogleApisEndpoint = exports.validateAddressEndpoint = exports.optimizeSiteEndpoint = exports.supportAgentEndpoint = void 0;
const support_1 = require("./flows/support");
Object.defineProperty(exports, "supportAgentEndpoint", { enumerable: true, get: function () { return support_1.supportFlow; } });
const seo_1 = require("./flows/seo");
Object.defineProperty(exports, "optimizeSiteEndpoint", { enumerable: true, get: function () { return seo_1.optimizeSiteFlow; } });
const address_1 = require("./flows/address");
Object.defineProperty(exports, "validateAddressEndpoint", { enumerable: true, get: function () { return address_1.validateAddressFlow; } });
const setup_1 = require("./flows/setup");
Object.defineProperty(exports, "setupGoogleApisEndpoint", { enumerable: true, get: function () { return setup_1.setupGoogleApisFlow; } });
const departments_1 = require("./flows/departments");
Object.defineProperty(exports, "departmentIdeationEndpoint", { enumerable: true, get: function () { return departments_1.departmentIdeationFlow; } });
Object.defineProperty(exports, "productionEndpoint", { enumerable: true, get: function () { return departments_1.productionFlow; } });
Object.defineProperty(exports, "websiteMaintenanceEndpoint", { enumerable: true, get: function () { return departments_1.websiteMaintenanceFlow; } });
//# sourceMappingURL=index.js.map