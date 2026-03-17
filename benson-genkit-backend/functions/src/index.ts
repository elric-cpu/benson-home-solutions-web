import { genkit } from "genkit";
import { onCallGenkit } from "@genkit-ai/firebase/functions";
import { supportFlow } from "./flows/support";
import { optimizeSiteFlow } from "./flows/seo";

const ai = genkit({});

// Expose the support flow
export const supportAgentEndpoint = onCallGenkit({
  flow: supportFlow,
  authPolicy: () => true,
});

// Expose the SEO optimization flow
export const optimizeSiteEndpoint = onCallGenkit({
  flow: optimizeSiteFlow,
  authPolicy: () => true,
});