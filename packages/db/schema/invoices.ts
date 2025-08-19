/**
 * Invoice schema definition.
 */
export type InvoiceStatus = 'pending' | 'paid' | 'expired';

export interface Invoice {
  id: number;
  pledgeId: number;
  amount: number;
  status: InvoiceStatus;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}