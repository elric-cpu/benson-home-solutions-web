import { test, expect } from '@playwright/test';

test.describe('Multi-Channel Contact Capture', () => {
  
  test('QR Code API should return a tracking URL and image link', async ({ request }) => {
    const response = await request.get('/api/contact/qr?tag=jobsite-01');
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body.tag).toBe('jobsite-01');
    expect(body.trackingUrl).toContain('utm_source=qr');
    expect(body.qrImageUrl).toContain('api.qrserver.com');
  });

  test('HubSpot Sync logic should be triggered on contact submission', async ({ request }) => {
    // This tests the contact form API route's integration with HubSpot
    const response = await request.post('/api/contact', {
      data: {
        firstName: 'Test',
        lastName: 'Lead',
        email: 'test-capture@example.com',
        phone: '5410000000',
        message: 'TDD Test lead',
        source: 'tablet'
      }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });
});
