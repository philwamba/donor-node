import { NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

/**
 * API route for a single invoice.
 *
 * Returns the status of the invoice identified by `id`.  In a full
 * implementation this would perform a database lookup.  For demonstration
 * purposes it returns a static status.
 */
export async function GET(_request: Request, context: Context) {
  const { id } = context.params;
  // TODO: lookup invoice by ID
  return NextResponse.json({ id, status: 'pending' });
}