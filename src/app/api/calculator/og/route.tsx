import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic Open Graph image for calculator results.
 * Renders a branded card with the user's annual total.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const total = searchParams.get('total') || '0';
  const address = searchParams.get('address') || 'Your Address';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFDF9', // Cream
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #4C0C14 2%, transparent 0%), radial-gradient(circle at 75px 75px, #4C0C14 2%, transparent 0%)',
        backgroundSize: '100px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 80px',
          borderRadius: '40px',
          border: '8px solid #4C0C14',
          boxShadow: '0 20px 50px rgba(76, 12, 20, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4C0C14',
            marginBottom: 20,
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          TRUE COST REVEALED
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#4C0C14',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          ${Number(total).toLocaleString()}
          <span style={{ fontSize: 40, marginLeft: 10, opacity: 0.6 }}>
            /year
          </span>
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#2D2D2D',
            marginTop: 20,
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          {address}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#4A4A4A',
            marginTop: 40,
            borderTop: '2px solid #E2E8F0',
            paddingTop: 20,
          }}
        >
          Benson Home Solutions — CCB #258533
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
