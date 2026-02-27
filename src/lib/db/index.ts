import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let _db: ReturnType<typeof initDb> | null = null;

function initDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not set. Provision a Neon database and add the pooled connection string.'
    );
  }
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

/**
 * Lazily-initialized Drizzle client backed by Neon serverless.
 * Throws if DATABASE_URL is missing — callers should gate on env check.
 */
export function getDb() {
  if (!_db) {
    _db = initDb();
  }
  return _db;
}

export type Database = ReturnType<typeof initDb>;
