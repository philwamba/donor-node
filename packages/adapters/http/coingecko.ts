/**
 * Adapter for the CoinGecko API.
 *
 * Fetches currency exchange rates.  This stub returns a static rate.  In
 * production, call the CoinGecko API to retrieve real time exchange rates.
 */
export async function fetchUsdBtcRate(): Promise<number> {
  // TODO: call the CoinGecko API
  console.log('Fetching USD/BTC rate from CoinGecko');
  return 0.00002; // dummy value: 1 USD = 0.00002 BTC
}