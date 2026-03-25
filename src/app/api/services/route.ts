import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { catalogItems } from '@/lib/db/schema';
import { ilike, or } from 'drizzle-orm';

/**
 * API Route: Service Catalog Search
 * Provides a backend to query the 5,000+ item service catalog.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { search, category } = body;

    // Basic validation
    if (search && typeof search !== 'string') {
      return NextResponse.json({ error: 'Invalid search query.' }, { status: 400 });
    }
    if (category && typeof category !== 'string') {
      return NextResponse.json({ error: 'Invalid category filter.' }, { status: 400 });
    }

    // Build the query dynamically
    const query = db.select().from(catalogItems);

    const conditions = [];
    if (search) {
      const searchCondition = ilike(catalogItems.name, `%${search}%`);
      conditions.push(searchCondition);
    }
    if (category) {
      const categoryCondition = or(
        ilike(catalogItems.category1, `%${category}%`),
        ilike(catalogItems.category2, `%${category}%`),
        ilike(catalogItems.category3, `%${category}%`)
      );
      conditions.push(categoryCondition);
    }

    if (conditions.length > 0) {
      query.where(or(...conditions));
    }

    const services = await query.limit(100); // Add a reasonable limit

    return NextResponse.json(services, { status: 200 });

  } catch (error) {
    console.error('[Service API Error]', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching services. Please try again.' },
      { status: 500 }
    );
  }
}
