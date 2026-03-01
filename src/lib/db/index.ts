import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️  DATABASE_URL is not set. Database functionality will fail at runtime.');
}

const sql = neon(connectionString || 'postgres://placeholder:placeholder@placeholder.neondatabase.serverless.org/placeholder');

export const db = drizzle(sql, { schema });

export * from 'drizzle-orm';
