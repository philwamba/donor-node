'use client';

import { useState } from 'react';

/**
 * A simple pledge form component.
 *
 * Allows the user to enter an amount and submit it.  In a real
 * application you might add recurrence options, validation and UI
 * enhancements using a component library like `@headlessui/react`.
 */
export default function PledgeForm({ onSubmit }: { onSubmit?: (amount: number) => void }) {
  const [amount, setAmount] = useState(0);
  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(amount);
      }}
    >
      <label className="font-medium">Donation Amount (USD)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="border rounded p-2"
        min={0}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Donate
      </button>
    </form>
  );
}