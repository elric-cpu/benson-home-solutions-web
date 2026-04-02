import { GoogleAuth } from 'google-auth-library';

// src/lib/genkit.ts

// --- Configuration ---
const getBackendUrl = () => process.env.BENSON_GENKIT_BACKEND_URL?.trim();
const FLOWS_ENDPOINT = '/v1/flows'; // Must match Benson backend

const CALLABLE_ENDPOINTS: Record<string, string> = {
  chat: 'chatEndpoint',
  generalChatFlow: 'chatEndpoint',
  costEstimation: 'costEstimationEndpoint',
  costEstimationFlow: 'costEstimationEndpoint',
  marketingContent: 'marketingContentEndpoint',
  marketingContentFlow: 'marketingContentEndpoint',
  recommendationFlow: 'recommendationFlowEndpoint',
};

const CALLABLE_SERVICE_URLS: Record<string, string> = {
  chatEndpoint: 'https://chatendpoint-odlix652wq-uc.a.run.app',
  costEstimationEndpoint: 'https://costestimationendpoint-odlix652wq-uc.a.run.app',
  recommendationFlowEndpoint: 'https://recommendationflowendpoint-odlix652wq-uc.a.run.app',
};

async function maybeBuildGoogleAuthHeader(targetUrl: string): Promise<HeadersInit> {
  if (
    !targetUrl.includes('.a.run.app') &&
    !targetUrl.includes('cloudfunctions.net') &&
    !targetUrl.includes('run.app')
  ) {
    return {};
  }

  try {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetUrl);
    const headers = await client.getRequestHeaders(targetUrl);
    return headers;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Google auth error';
    throw new BensonBackendError(
      `Unable to acquire Google identity token for ${targetUrl}: ${message}`,
      500,
      message,
    );
  }
}

// --- Type Definitions for Flow Execution ---
// Request payload contract.
export interface FlowRequestPayload {
  readonly name: string;
  readonly data: unknown; // Backend validates 'data'.
}

// Minimal response contract from Benson backend.
export interface FlowResponse {
  readonly flowRunId: string;
  readonly status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  readonly result?: unknown;
}

// --- Custom Error for Backend Communication Failures ---
// Includes optional response body for debugging.
export class BensonBackendError extends Error {
  readonly statusCode: number;
  readonly responseBody?: string; // Raw response body for debugging.

  constructor(message: string, statusCode: number, responseBody?: string) {
    super(message);
    this.name = 'BensonBackendError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

export function hasConfiguredBackendUrl(): boolean {
  return Boolean(getBackendUrl());
}

/**
 * Executes a flow on the Benson Genkit backend.
 * @param flowName The name of the flow to execute.
 * @param flowData The data payload for the flow.
 * @returns A Promise that resolves with the FlowResponse from the backend.
 * @throws BensonBackendError if the backend call fails.
 */
export async function executeFlow(
  flowName: string,
  flowData: FlowRequestPayload['data']
): Promise<FlowResponse> {
  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    throw new Error('BENSON_GENKIT_BACKEND_URL environment variable is not configured.');
  }

  // Detect if we are calling a Firebase Callable or a standalone Genkit flow
  const isFirebase = backendUrl.includes('us-central1') || backendUrl.includes('cloudfunctions.net');
  
  let url: string;
  let requestPayload: FlowRequestPayload | { data: unknown };

  if (isFirebase) {
    // Firebase Callable structure: /<endpointName>
    const endpointName =
      CALLABLE_ENDPOINTS[flowName] || (flowName.endsWith('Endpoint') ? flowName : `${flowName}Endpoint`);
    url = CALLABLE_SERVICE_URLS[endpointName] || `${backendUrl}/${endpointName}`;
    requestPayload = { data: flowData }; // Firebase Callables expect data wrapped in 'data'
  } else {
    // Standalone Genkit structure: /v1/flows
    url = `${backendUrl}${FLOWS_ENDPOINT}`;
    requestPayload = {
      name: flowName,
      data: flowData,
    };
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(await maybeBuildGoogleAuthHeader(url)),
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestPayload),
  };

  let response: Response;
  try {
    response = await fetch(url, requestOptions);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown fetch error';
    throw new BensonBackendError(
      `Network error contacting Benson backend at ${url}: ${errorMessage}`,
      500,
      errorMessage
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new BensonBackendError(
      `Benson Backend HTTP Error: ${response.status} ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  try {
    const json = await response.json();
    // Firebase Callables return { result: ... }
    // Genkit standalone returns { result: ... } or the raw result
    if (isFirebase && json.result !== undefined) {
      return {
        flowRunId: 'firebase-callable',
        status: 'COMPLETED',
        result: json.result,
      };
    }
    return json as FlowResponse;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown JSON parsing error';
    throw new BensonBackendError(
      `Failed to parse JSON response from Benson backend at ${url}: ${errorMessage}`,
      500
    );
  }
}
