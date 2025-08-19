/**
 * Adapter for connecting to a Bitcoin Core RPC node.
 *
 * This stub provides a simple interface to call methods on a Bitcoin node.
 * Fill in the implementation to call your node over HTTP.  For security
 * reasons do not hard‑code credentials in this file; use environment
 * variables or a configuration system.
 */
export class BitcoinCoreClient {
  constructor(private url: string, private username: string, private password: string) {}

  async call(method: string, params: unknown[] = []) {
    // TODO: implement RPC call to Bitcoin Core
    console.log(`Calling Bitcoin Core method ${method} with params`, params);
    return null;
  }
}