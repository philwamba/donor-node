import type { Pledge } from '@donor-node/db/schema/pledges';
import type { Invoice } from '@donor-node/db/schema/invoices';
import { getNextRun } from '../schedule/rrule';

/**
 * Create a pledge.
 *
 * A full implementation would persist the pledge to a database, handle
 * idempotency and compute the next invoice.  This function simply
 * echoes the pledge back.
 */
export function createPledge(pledge: Pledge): Pledge {
  return pledge;
}

/**
 * Compute the next invoice for a pledge.
 *
 * Uses the recurrence on the pledge to determine the next invoice due date
 * and returns a minimal invoice object.  In a real system you would
 * persist the invoice and assign a unique identifier.
 */
export function computeNextInvoice(pledge: Pledge): Invoice {
  const dueDate = getNextRun(new Date(), pledge.recurrence);
  return {
    id: Date.now(),
    pledgeId: pledge.id,
    amount: pledge.amount,
    status: 'pending',
    dueDate,
  };
}