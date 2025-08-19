/**
 * Advisory lock helpers.
 *
 * In a distributed system you may need to acquire advisory locks before
 * performing certain operations (e.g. invoice generation) to avoid race
 * conditions.  This file provides stubs for acquiring and releasing
 * advisory locks.  Implementations could be backed by Postgres advisory
 * locks or a distributed lock manager such as Redis.
 */
export async function acquireLock(key: string): Promise<void> {
  // TODO: implement advisory lock acquisition
  console.log(`Acquiring lock: ${key}`);
}

export async function releaseLock(key: string): Promise<void> {
  // TODO: implement advisory lock release
  console.log(`Releasing lock: ${key}`);
}