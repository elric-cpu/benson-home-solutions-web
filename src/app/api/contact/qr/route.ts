import { NextRequest, NextResponse } from 'next/server';

/**
 * QR Code Generator for Lead Tracking
 * Returns an SVG QR code pointing to the contact portal with a location tag.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get('tag') || 'direct';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bensonhomesolutions.com';
  
  // Construct the tracking URL
  const trackingUrl = `${baseUrl}/contact?utm_source=qr&utm_medium=physical&utm_campaign=${tag}`;

  // Simple QR Code generation logic (SVG)
  // For production, we'd use a library like 'qrcode', but for MVP we can use a free API or return a styled link.
  // Using goqr.me API for the actual image data
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(trackingUrl)}&color=4C0C14&bgcolor=FDFBF7`;

  return NextResponse.json({
    tag,
    trackingUrl,
    qrImageUrl,
    branding: {
      primary: '#4C0C14', // Oxblood
      accent: '#FDFBF7'   // Cream
    }
  });
}
