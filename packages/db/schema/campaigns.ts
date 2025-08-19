/**
 * Campaign schema definition.
 */
export interface Campaign {
  id: number;
  orgId: number;
  slug: string;
  name: string;
  description?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}