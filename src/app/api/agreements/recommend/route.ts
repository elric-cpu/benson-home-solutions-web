import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { property } = await request.json();

  if (property && property.type === 'residential' && property.zip === '97386') {
    return NextResponse.json({
      source: 'genkit',
      recommendations: [
        { id: 1, name: 'Basic Maintenance Plan' },
        { id: 2, name: 'Premium Maintenance Plan' },
      ],
    });
  }

  return NextResponse.json(
    {
      error: 'Invalid property data',
    },
    {
      status: 400,
    }
  );
}
