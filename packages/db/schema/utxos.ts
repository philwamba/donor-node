/**
 * UTXO schema definition.
 */
export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  addressId: number;
  spent?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}