import { supportFlow } from "./flows/support";
import { optimizeSiteFlow } from "./flows/seo";
import { validateAddressFlow } from "./flows/address";
import { setupGoogleApisFlow } from "./flows/setup";
import { departmentIdeationFlow, productionFlow, websiteMaintenanceFlow } from "./flows/departments";

export { supportFlow as supportAgentEndpoint };
export { optimizeSiteFlow as optimizeSiteEndpoint };
export { validateAddressFlow as validateAddressEndpoint };
export { setupGoogleApisFlow as setupGoogleApisEndpoint };
export { departmentIdeationFlow as departmentIdeationEndpoint };
export { productionFlow as productionEndpoint };
export { websiteMaintenanceFlow as websiteMaintenanceEndpoint };
