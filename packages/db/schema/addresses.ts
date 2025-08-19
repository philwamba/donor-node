/**
 * Address schema definition.
 */
export interface Address {
  id: number;
  descriptorId: number;
  address: string;
  index: number;
  used?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}