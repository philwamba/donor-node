/*
 * Seed script
 *
 * This script demonstrates how you might seed your database with sample data.
 * It does not perform any actual database operations — fill in the implementation
 * to connect to your database and insert rows into the tables defined in
 * `packages/db/schema`.
 */

async function main() {
  console.log('Running seed script...');
  // TODO: connect to the database and insert sample data
  console.log('Seed complete');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});