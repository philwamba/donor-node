import { NextResponse } from 'next/server';

/**
 * API route to dispatch a signed test webhook.
 *
 * In a real system this would sign a payload using a secret and send it to
 * configured webhook endpoints.  For now it simply returns a success
 * response.
 */
export async function POST(_request: Request) {
  // TODO: sign and dispatch a webhook to the registered endpoint(s)
  return NextResponse.json({ message: 'Webhook dispatched' });
}