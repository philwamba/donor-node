/**
 * Donor schema definition.
 */
export interface Donor {
  id: number;
  email: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}