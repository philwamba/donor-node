interface PageProps {
  params: { invoiceId: string };
}

/**
 * Invoice page for a specific donation invoice.
 *
 * In a full implementation this page would fetch the invoice status from
 * the API using the `invoiceId` parameter and display whether the
 * payment has been received, the amount due, and a lightning invoice
 * QR code or on-chain payment details.
 */
export default function InvoicePage({ params }: PageProps) {
  const { invoiceId } = params;
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Invoice {invoiceId}</h1>
      <p className="mb-6">
        Display the invoice status and payment instructions here.  Poll the API
        periodically to update the status as payments are confirmed.
      </p>
    </div>
  );
}