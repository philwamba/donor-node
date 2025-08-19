/**
 * Receipt service.
 *
 * Responsible for issuing receipts and generating PDF links.  This is a
 * stub implementation; integrate with a PDF generation service or build
 * your own using something like `pdfkit`.
 */
export function issueReceipt(invoiceId: number) {
  // TODO: implement receipt issuance
  return {
    id: Date.now(),
    invoiceId,
    url: `https://example.com/receipts/${invoiceId}.pdf`,
  };
}