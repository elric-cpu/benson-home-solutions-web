import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clients, properties } from '@/lib/db/schema';
import { syncLeadToHubSpot } from '@/lib/crm/hubspot';
import { isServiceArea } from '@/lib/calculator-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, propertyType, address, costs, total } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Save/Update Client in DB
    let clientId: string | undefined;
    try {
      const [client] = await db
        .insert(clients)
        .values({
          name: 'Calculator Lead', // We only have email initially
          email,
          sourceChannel: 'cost-calculator',
        })
        .onConflictDoUpdate({
          target: clients.email,
          set: { updatedAt: new Date() },
        })
        .returning({ id: clients.id });
      clientId = client.id;
    } catch (dbError) {
      console.error('Database client insertion failed:', dbError);
    }

    // 2. Save Property Search in DB
    let propertyId: string | undefined;
    if (address && clientId) {
      try {
        const inServiceAreaMatch = isServiceArea(
          address.postcode,
          address.county,
          address.state,
        );

        // Generate address hash for uniqueness
        const msgUint8 = new TextEncoder().encode(
          address.formatted.toLowerCase().trim(),
        );
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const addressHash = hashArray
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        const [prop] = await db
          .insert(properties)
          .values({
            clientId,
            addressHash,
            rawAddress: address.formatted,
            standardizedAddress: address.formatted,
            city: address.city,
            state: address.state,
            zip: address.postcode,
            county: address.county,
            latitude: address.lat,
            longitude: address.lon,
            geocodeStatus: 'success',
            dataCompleteness: 100,
            housingData: { costs, total },
            serviceAreaMatch: inServiceAreaMatch,
          })
          .onConflictDoUpdate({
            target: properties.addressHash,
            set: { updatedAt: new Date(), clientId: clientId }, // Update clientId in case it changed
          })
          .returning({ id: properties.id });
        propertyId = prop.id;
      } catch (propError) {
        console.error('Database property insertion failed:', propError);
      }
    }

    // 3. Sync to HubSpot
    try {
      const inServiceArea = address
        ? isServiceArea(address.postcode, address.county, address.state)
        : false;

      await syncLeadToHubSpot({
        email,
        source: body.source || 'cost-calculator',
        propertyAddress: address?.formatted,
        propertyType: propertyType as any,
        isServiceArea: inServiceArea,
      });
    } catch (hubspotError) {
      console.error('HubSpot sync failed:', hubspotError);
    }

    return NextResponse.json(
      {
        message: 'Lead captured successfully',
        clientId,
        propertyId,
        addressHash,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Calculator Lead API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
