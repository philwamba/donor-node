/**
 * Webhook dispatcher.
 *
 * Responsible for signing payloads and sending them to configured webhook
 * endpoints.  This stub simply logs the payload to the console.
 */
export async function dispatchWebhook(event: string, payload: unknown) {
  // TODO: sign the payload and send it to subscribers
  console.log('Dispatching webhook:', event, payload);
  return { delivered: true };
}