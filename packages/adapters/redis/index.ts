/**
 * Adapter for Redis.
 *
 * Provides a simple wrapper around a Redis client.  Replace the methods
 * with calls to your preferred Redis library (e.g. ioredis).  Note that
 * Node.js standard library does not include a Redis client by default.
 */
export class RedisClient {
  constructor(private url: string) {}

  async get(key: string): Promise<string | null> {
    // TODO: implement get
    console.log(`Redis GET ${key}`);
    return null;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    // TODO: implement set
    console.log(`Redis SET ${key} = ${value} (ttl=${ttlSeconds})`);
  }
}