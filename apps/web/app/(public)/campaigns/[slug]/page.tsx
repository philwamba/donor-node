interface PageProps {
  params: { slug: string };
}

/**
 * Public donate page for a specific campaign.
 *
 * Displays information about the campaign identified by `slug` and
 * provides a form or instructions for making a donation.  In a complete
 * implementation this page would fetch campaign data from the API and
 * render a QR code for scanning with a lightning wallet.
 */
export default function CampaignPage({ params }: PageProps) {
  const { slug } = params;
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Campaign: {slug}</h1>
      <p className="mb-6">
        This is a placeholder for the public donation page.  Here you can show
        campaign details, suggested donation amounts, recurrence options, and a
        QR code for paying with bitcoin.
      </p>
    </div>
  );
}