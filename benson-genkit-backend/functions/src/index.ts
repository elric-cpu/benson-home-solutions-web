import { onCallGenkit, onRequest } from 'firebase-functions/https';
import { supportFlow } from './flows/support';
import { optimizeSiteFlow } from './flows/seo';
import { validateAddressFlow } from './flows/address';
import { setupGoogleApisFlow } from './flows/setup';
import { departmentIdeationFlow, productionFlow, websiteMaintenanceFlow } from './flows/departments';
import { marketingContentFlow } from './flows/marketingContentFlow';
import { costEstimationFlow } from './flows/estimator';
import { generalChatFlow } from './flows/chat';
import { recommendationFlow } from './flows/recommendation';

function onRequestFlow<TInput, TOutput>(handler: (input: TInput) => Promise<TOutput>) {
  return onRequest(async (request, response) => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const body = typeof request.body === 'object' && request.body !== null ? request.body : {};
      const input = ('data' in body ? body.data : body) as TInput;
      const result = await handler(input);
      response.status(200).json({ result });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown flow error';
      response.status(500).json({ error: message });
    }
  });
}

export const supportEndpoint = onCallGenkit(supportFlow);
export const optimizeSiteEndpoint = onCallGenkit(optimizeSiteFlow);
export const validateAddressEndpoint = onCallGenkit(validateAddressFlow);
export const setupGoogleApisEndpoint = onCallGenkit(setupGoogleApisFlow);
export const departmentIdeationEndpoint = onCallGenkit(departmentIdeationFlow);
export const productionEndpoint = onCallGenkit(productionFlow);
export const websiteMaintenanceEndpoint = onCallGenkit(websiteMaintenanceFlow);
export const marketingContentEndpoint = onCallGenkit(marketingContentFlow);
export const costEstimationEndpoint = onRequestFlow(costEstimationFlow);
export const chatEndpoint = onRequestFlow(generalChatFlow);
export const recommendationFlowEndpoint = onRequestFlow(recommendationFlow);
