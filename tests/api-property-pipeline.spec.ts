import { test, expect } from '@playwright/test';

test.describe('Property Enrichment Webhook API', () => {
  const ENDPOINT = '/api/webhooks/property-enrichment';

  test('should reject requests without a secret header', async ({ request }) => {
    const response = await request.post(ENDPOINT, {
      data: { address: '123 Main St, Albany, OR 97321' }
    });
    expect(response.status()).toBe(401);
  });

  test('should reject invalid address formats', async ({ request }) => {
    const response = await request.post(ENDPOINT, {
      headers: { 'X-BHS-Webhook-Secret': 'test-secret' },
      data: { address: 'invalid-address' }
    });
    expect(response.status()).toBe(400);
  });

  test('should reject honeypot submissions', async ({ request }) => {
    const response = await request.post(ENDPOINT, {
      headers: { 'X-BHS-Webhook-Secret': 'test-secret' },
      data: { 
        address: '123 Main St, Albany, OR 97321',
        _honeypot: 'bot-content'
      }
    });
    expect(response.status()).toBe(400);
  });

  test('should accept a valid Oregon address', async ({ request }) => {
    // Note: This will likely fail with 404 until we implement the route
    const response = await request.post(ENDPOINT, {
      headers: { 'X-BHS-Webhook-Secret': 'test-secret' },
      data: { address: '123 Main St, Albany, OR 97321' }
    });
    expect(response.status()).toBe(200);
  });
});
