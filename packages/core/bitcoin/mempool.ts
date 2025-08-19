/**
 * Mempool API abstraction.
 *
 * These functions wrap calls to the mempool.space API or any other
 * transaction tracker.  Use them to check transaction confirmations and
 * fee estimates.  Currently returns a dummy response.
 */
export async function getTransactionStatus(txid: string) {
  // TODO: call an external API to get the real status
  return { confirmed: false, confirmations: 0 };
}