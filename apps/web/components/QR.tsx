/**
 * Placeholder QR code component.
 *
 * In a complete implementation you would use a library such as `qrcode.react`
 * or `react-qr-code` to generate a QR code for the provided value.  Here we
 * simply show a styled box with the text "QR" as a placeholder.
 */
export default function QR({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded">
      <span className="text-sm font-semibold">QR</span>
    </div>
  );
}