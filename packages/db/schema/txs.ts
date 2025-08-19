/**
 * Transaction schema definition.
 */
export interface Tx {
  id: string;
  hex: string;
  confirmed: boolean;
  confirmedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}