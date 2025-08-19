/**
 * Receipt schema definition.
 */
export interface Receipt {
  id: number;
  invoiceId: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}