import { test, expect } from '@playwright/test';

/**
 * Benson Home Solutions - Intelligence Layer Verification
 * Ensures all AI interactions route through Genkit and Gcloud.
 */
test.describe('Genkit Intelligence Verification', () => {
  test('Gus should respond with authoritative contractor voice', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: { message: 'What is the CCB number?' },
    });

    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text).toContain('258533');
    expect(text).not.toContain('Gumloop');
  });

  test('Agreement recommender should use Genkit flow', async ({ request }) => {
    const response = await request.post('/api/agreements/recommend', {
      data: {
        property: { type: 'residential', zip: '97386' },
      },
    });

    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.source).toBe('genkit');
    expect(json.recommendations.length).toBeGreaterThan(0);
  });
});
