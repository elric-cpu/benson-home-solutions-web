/**
 * Server-side GA4 tracking using the Measurement Protocol.
 * Used for tracking events that happen in API routes or background jobs.
 */

const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;
const GA4_API_SECRET = process.env.GA4_API_SECRET;

interface GA4Event {
  name: string;
  params?: Record<string, unknown>;
}

/**
 * Sends an event to GA4 via the Measurement Protocol.
 * @param clientId A unique identifier for the client (e.g., a hashed IP or session ID).
 * @param event The event data.
 */
export async function trackServerEvent(clientId: string, event: GA4Event) {
  if (!GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
    console.warn(
      '[GA4 Server] Missing credentials, skipping event:',
      event.name,
    );
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: event.name,
            params: {
              ...event.params,
              engagement_time_msec: '100', // Required for some reports
            },
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GA4 Server Error]', response.status, errorText);
    }
  } catch (error) {
    console.error('[GA4 Server Exception]', error);
  }
}

// --- Specific server events ---

export async function trackServerContactSubmit(
  clientId: string,
  service?: string,
) {
  return trackServerEvent(clientId, {
    name: 'generate_lead',
    params: {
      service: service || 'general',
      method: 'contact_form',
    },
  });
}

export async function trackServerCalculatorUse(
  clientId: string,
  service: string,
) {
  return trackServerEvent(clientId, {
    name: 'use_calculator',
    params: {
      service,
    },
  });
}
