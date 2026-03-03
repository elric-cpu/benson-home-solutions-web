import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    '⚠️  DATABASE_URL is not set. Database functionality will fail at runtime.',
  );
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(
  connectionString ||
    'postgres://placeholder:placeholder@localhost:5432/placeholder',
  { prepare: false },
);

export const db = drizzle(client, { schema });

export * from 'drizzle-orm';
