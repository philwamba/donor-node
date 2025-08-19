/**
 * Worker to interact with mempool.space or another transaction tracker.
 *
 * Monitors pending invoices and marks them as confirmed when their
 * transactions are mined.  This stub simply logs its activity.
 */
export async function runMempoolWorker() {
  console.log('Running mempool worker...');
  // TODO: implement mempool polling and confirmation handling
}