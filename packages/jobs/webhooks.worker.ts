/**
 * Worker to dispatch webhooks.
 *
 * Consumes jobs from the webhooks queue and sends signed payloads to
 * subscribers.  This stub simply logs its activity.
 */
export async function runWebhooksWorker() {
  console.log('Running webhooks worker...');
  // TODO: implement webhook dispatch logic
}