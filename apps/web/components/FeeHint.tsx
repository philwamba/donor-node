/**
 * Component to display a fee hint.
 *
 * The amount should be provided in satoshis and will be displayed in a
 * human‑friendly format.  You can enhance this component to fetch live
 * fee rates from a service like mempool.space.
 */
export default function FeeHint({ amount }: { amount: number }) {
  return (
    <p className="text-sm text-gray-600">Estimated network fee: {amount.toLocaleString()} sats</p>
  );
}