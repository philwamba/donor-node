interface Attempt {
  timestamp: string;
  status: string;
}

/**
 * Table component to display webhook delivery attempts.
 */
export default function WebhookAttemptsTable({ attempts }: { attempts: Attempt[] }) {
  return (
    <table className="min-w-full border border-gray-300 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2">Timestamp</th>
          <th className="border px-3 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((attempt, i) => (
          <tr key={i} className="odd:bg-white even:bg-gray-50">
            <td className="border px-3 py-2 whitespace-nowrap">{attempt.timestamp}</td>
            <td className="border px-3 py-2 whitespace-nowrap">{attempt.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}