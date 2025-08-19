/**
 * Configuration parser.
 *
 * Use this module to parse environment variables and provide a strongly
 * typed configuration object to the rest of your application.  You can
 * integrate with `zod` or another validation library here.  The stub
 * implementation simply reads values from `process.env`.
 */
export interface AppConfig {
  databaseUrl: string;
  redisUrl: string;
  baseUrl: string;
}

export function getConfig(): AppConfig {
  return {
    databaseUrl: process.env.DATABASE_URL || '',
    redisUrl: process.env.REDIS_URL || '',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  };
}