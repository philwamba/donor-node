import { NextResponse } from 'next/server';

/**
 * API route to build a PSBT (Partially Signed Bitcoin Transaction).
 *
 * This is optional; use it to support on‑chain withdrawals.  You would
 * generate a PSBT with the correct outputs and return it to the client
 * for signing.  The client can then broadcast the final transaction.
 */
export async function POST(_request: Request) {
  // TODO: build a PSBT using wallet descriptor and selected UTXOs
  return NextResponse.json({ psbt: '' });
}