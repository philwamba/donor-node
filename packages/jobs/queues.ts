/**
 * Job queue definitions.
 *
 * Defines the names of BullMQ queues used by the workers.  In a full
 * implementation you would instantiate BullMQ Queue objects here.
 */
export const QUEUE_PLEDGE_SCHEDULER = 'pledge-scheduler';
export const QUEUE_INVOICE_GENERATOR = 'invoice-generator';
export const QUEUE_MEMPOOL = 'mempool';
export const QUEUE_CONFIRMER = 'confirmer';
export const QUEUE_RECEIPTS = 'receipts';
export const QUEUE_WEBHOOKS = 'webhooks';