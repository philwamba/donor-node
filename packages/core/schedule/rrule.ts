/**
 * Simple recurrence helper.
 *
 * Given a start date and a recurrence interval, returns the next run date.
 */
export type Recurrence = 'weekly' | 'monthly' | 'annual';

export function getNextRun(startDate: Date, recurrence: Recurrence): Date {
  const next = new Date(startDate);
  switch (recurrence) {
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    case 'annual':
      next.setFullYear(next.getFullYear() + 1);
      break;
  }
  return next;
}