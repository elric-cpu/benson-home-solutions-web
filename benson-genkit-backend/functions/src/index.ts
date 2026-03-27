import { onFlow } from '@genkit-ai/firebase/functions';
import { recommendationFlow } from './flows/agreements';

export const recommendationEndpoint = onFlow(recommendationFlow, (_req) => {
  // You can add authentication and other logic here.
  // For example, you might want to check if the user is logged in
  // before allowing them to run the flow.
});
