import { NextResponse } from 'next/server';

/**
 * API route for pledges.
 *
 * Supports `POST` to create a pledge.  In a full implementation this would
 * persist the pledge, compute the next invoice and schedule a job to generate
 * the invoice at the appropriate time.
 */
export async function POST(request: Request) {
  // TODO: implement pledge creation
  return NextResponse.json({ message: 'Pledge created' }, { status: 201 });
}