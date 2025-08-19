interface Invoice {
  id: string;
  amount: number;
  status: string;
}

/**
 * A simple invoice card component.
 */
export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h2 className="font-semibold mb-2">Invoice {invoice.id}</h2>
      <p>Status: {invoice.status}</p>
      <p>Amount: {invoice.amount}</p>
    </div>
  );
}