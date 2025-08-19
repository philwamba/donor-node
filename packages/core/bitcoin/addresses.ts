/**
 * Helpers for working with bitcoin addresses.
 *
 * In a production environment you would derive addresses from a descriptor
 * using BIP32/BIP86.  This placeholder simply constructs a mock taproot
 * address for demonstration purposes.
 */
export function generateTaprootAddress(index: number): string {
  return `tb1qmock${index}`;
}