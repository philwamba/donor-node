/*
 * Drizzle ORM configuration.
 *
 * Points to the schema definitions and output directory for migrations.  You
 * can customize this file according to your project requirements.
 */
export default {
  schema: './schema/**/*.{ts,js}',
  out: './migrations',
  driver: 'pg',
};