/*
 * Wait for Postgres to be ready
 *
 * This script polls the database connection until it responds to simple
 * queries.  Use it in CI workflows to ensure the database is available
 * before running tests or migrations.
 */

import { Client } from 'pg';

async function waitForDatabase(url: string) {
  const client = new Client({ connectionString: url });
  const timeout = Date.now() + 60_000; // 60 seconds timeout
  while (Date.now() < timeout) {
    try {
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      console.log('Database is ready');
      return;
    } catch (err) {
      console.log('Waiting for database...');
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw new Error('Database did not become ready in time');
}

waitForDatabase(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/donor').catch(
  (err) => {
    console.error(err);
    process.exit(1);
  },
);