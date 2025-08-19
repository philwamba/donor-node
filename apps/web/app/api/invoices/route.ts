import { NextResponse } from 'next/server';

/**
 * API route for invoices.
 *
 * Supports `GET` to list invoices by status.  Pass a query parameter
 * `?status=paid` (or `pending`, etc.) to filter results.  This stub
 * implementation returns an empty array.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  // TODO: query the database for invoices filtered by status
  return NextResponse.json([]);
}