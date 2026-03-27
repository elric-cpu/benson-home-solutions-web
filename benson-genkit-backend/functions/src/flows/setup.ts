import { genkit, z } from 'genkit';
import { onFlow, noAuth } from '@genkit-ai/firebase/functions';
import { google } from 'googleapis';

const ai = genkit({});
const serviceusage = google.serviceusage('v1');

export const setupGoogleApisFlow = onFlow(
  ai,
  {
    name: 'setupGoogleApisFlow',
    inputSchema: z.void(),
    outputSchema: z.object({
      status: z.string(),
      enabledServices: z.array(z.string()),
    }),
    authPolicy: noAuth(),
  },
  async () => {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient as never });

    const projectId = await auth.getProjectId();
    const servicesToEnable = [
      'addressvalidation.googleapis.com',
      'searchconsole.googleapis.com',
      'maps-backend.googleapis.com',
      'geocoding-backend.googleapis.com',
      'aiplatform.googleapis.com',
    ];

    const enabledServices: string[] = [];

    for (const service of servicesToEnable) {
      console.warn(`Checking/Enabling service: ${service}`);
      await serviceusage.services.enable({
        name: `projects/${projectId}/services/${service}`,
      });
      enabledServices.push(service);
    }

    return {
      status: 'All required Google APIs have been verified/enabled.',
      enabledServices,
    };
  },
);
