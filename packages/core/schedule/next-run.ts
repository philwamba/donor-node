import { getNextRun, Recurrence } from './rrule';

/**
 * Compute the next run date given the current date and recurrence.
 */
export function computeNextRun(current: Date, recurrence: Recurrence): Date {
  return getNextRun(current, recurrence);
}