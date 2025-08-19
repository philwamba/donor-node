/**
 * Worker to schedule pledges.
 *
 * Scans for pledges that are due for invoicing and enqueues jobs for the
 * invoice generator.  This is a stub that logs its activity.
 */
export async function runPledgeScheduler() {
  console.log('Running pledge scheduler...');
  // TODO: fetch due pledges from the database and enqueue jobs
}