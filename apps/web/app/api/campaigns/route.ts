import { NextResponse } from 'next/server';

/**
 * API route for campaigns.
 *
 * Supports `POST` to create a new campaign and `GET` to list campaigns.  A real
 * implementation would validate input, persist data to the database and
 * handle errors.  For now it returns a static response.
 */
export async function POST(request: Request) {
  // TODO: implement create campaign
  return NextResponse.json({ message: 'Campaign created' }, { status: 201 });
}

export async function GET() {
  // TODO: fetch campaigns from the database
  return NextResponse.json([]);
}