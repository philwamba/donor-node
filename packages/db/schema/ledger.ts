/**
 * Ledger entry schema definition.
 */
export type LedgerType = 'credit' | 'debit';

export interface LedgerEntry {
  id: number;
  invoiceId?: number;
  amount: number;
  type: LedgerType;
  timestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}