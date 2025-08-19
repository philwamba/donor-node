/**
 * Wallet descriptor schema definition.
 */
export interface WalletDescriptor {
  id: number;
  descriptor: string;
  nextIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}