import type { LedgerEntry, LedgerType } from '@donor-node/db/schema/ledger';

/**
 * Ledger service.
 *
 * Provides functions to credit and debit ledger entries.  In a real
 * implementation this would persist entries to a database and ensure that
 * balances remain consistent.
 */
export function createLedgerEntry(amount: number, type: LedgerType, invoiceId?: number): LedgerEntry {
  return {
    id: Date.now(),
    invoiceId,
    amount,
    type,
    timestamp: new Date(),
  };
}