import { test, expect } from '@playwright/test';

/**
 * Benson Home Solutions - Intelligence Layer Verification
 * Ensures all AI interactions route through Genkit and Gcloud.
 */
test.describe('Genkit Intelligence Verification', () => {
  test('Chat API should reject missing message payloads', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {},
    });

    expect(response.status()).toBe(400);
    await expect(response.text()).resolves.toContain('Message required');
  });

  test('Gus should respond with authoritative contractor voice', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: { message: 'What is the CCB number?' }
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['x-benson-agent-mode']).toBe('multi');
    const text = await response.text();
    expect(text).toContain('258533');
    expect(text).not.toContain('Gumloop');
  });

  test('Agreement recommender should use Genkit flow or demo fallback', async ({ request }) => {
    const response = await request.post('/api/agreements/recommend', {
      data: { 
        property: { type: 'residential', zip: '97386' } 
      }
    });

    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    
    // Depending on environment, this can use the Google Vertex local path or the demo fallback.
    expect(['vertex', 'demo-mode', 'backend']).toContain(json.source);
    expect(json.recommendations.length).toBeGreaterThan(0);
  });

  test('Agreement recommender should reject missing property payloads', async ({ request }) => {
    const response = await request.post('/api/agreements/recommend', {
      data: {},
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: 'Property info required',
    });
  });
});
