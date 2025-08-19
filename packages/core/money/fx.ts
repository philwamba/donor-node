/**
 * Currency conversion utilities.
 */

/**
 * Convert a USD amount to satoshis using a provided exchange rate.
 *
 * By default the conversion rate is set to 10,000 sats per USD, but in a
 * production system you should fetch the current rate from an external
 * provider like CoinGecko or a bitcoin exchange.
 */
export function convertUsdToSats(usd: number, rate: number = 10_000): number {
  return Math.round(usd * rate);
}