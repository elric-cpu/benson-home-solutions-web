import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { MOCK_ZIP_DATA, DEFAULT_BENCHMARK } from '@/lib/calculator-data';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const alt = 'True Cost of Homeownership Report';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { hash: string } }) {
  const { hash } = params;

  try {
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.addressHash, hash));

    if (!property) {
      return new ImageResponse(
        <div
          style={{
            fontSize: 48,
            background: '#4C0C14',
            color: '#FFFDF9',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Property Report Not Found
        </div>,
        { ...size },
      );
    }

    const zipData = MOCK_ZIP_DATA[property.zip || ''] || DEFAULT_BENCHMARK;

    // Extract costs with proper fallback
    const energyBenchmarks = property.energyBenchmarks as {
      costs?: Record<string, number>;
    } | null;
    const costs = energyBenchmarks?.costs || zipData.costs;

    const annualTotal = Object.values(costs).reduce((a, b) => a + b, 0);

    return new ImageResponse(
      <div
        style={{
          background: '#4C0C14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFDF9',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        {/* Logo Placeholder / Brand Name */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            marginBottom: '40px',
            opacity: 0.6,
            textTransform: 'uppercase',
          }}
        >
          Benson Home Solutions
        </div>

        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            opacity: 0.8,
          }}
        >
          THE TRUE COST OF OWNING
        </div>

        <div
          style={{
            fontSize: '110px',
            fontWeight: 900,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          ${annualTotal.toLocaleString()}
          <span style={{ fontSize: '40px', opacity: 0.5, marginLeft: '16px' }}>
            /yr
          </span>
        </div>

        <div
          style={{
            fontSize: '32px',
            fontWeight: 500,
            opacity: 0.9,
            maxWidth: '900px',
            marginTop: '20px',
            lineHeight: 1.4,
          }}
        >
          {property.rawAddress}
        </div>

        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            background: 'rgba(255, 253, 249, 0.1)',
            padding: '12px 24px',
            borderRadius: '100px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          📍 Mid-Willamette Valley & Harney County Intelligence
        </div>
      </div>,
      {
        ...size,
      },
    );
  } catch {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: '#4C0C14',
          color: '#FFFDF9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Error generating report image
      </div>,
      { ...size },
    );
  }
}
