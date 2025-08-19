/**
 * Currency formatting utilities.
 */

export type Currency = 'USD' | 'BTC' | 'SATS';

export function formatCurrency(value: number, currency: Currency): string {
  switch (currency) {
    case 'USD':
      return `$${value.toFixed(2)}`;
    case 'BTC':
      return `${value} BTC`;
    case 'SATS':
      return `${value.toLocaleString()} sats`;
    default:
      return String(value);
  }
}