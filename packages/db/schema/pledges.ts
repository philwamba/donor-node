/**
 * Pledge schema definition.
 */
export type Recurrence = 'weekly' | 'monthly' | 'annual';

export interface Pledge {
  id: number;
  donorId: number;
  campaignId: number;
  amount: number;
  recurrence: Recurrence;
  nextInvoiceDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}