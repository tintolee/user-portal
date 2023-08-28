import { TransferBreakdownStageName, TransferBreakdownStatus } from './types';

type TransferBreakdownContent = Record<
  Exclude<TransferBreakdownStageName, 'setup'>,
  Record<TransferBreakdownStatus, string>
>;

const CONTENT: TransferBreakdownContent = {
  processing: {
    notStarted: '',
    pending: 'Payment processing',
    failed: 'Payment failed',
    successful: 'Payment processed'
  },
  // For charge stage, valid statuses are: pending, failed & successful
  charge: {
    notStarted: '',
    pending: 'Payment processing',
    failed: 'Payment failed',
    successful: 'Payment processed'
  },
  disburse: {
    notStarted: 'Transfer in progress',
    pending: 'Transfer in progress',
    failed: 'Transfer failed',
    successful: 'Transfer processed'
  },
  // For complete stage, valid statuses are: notStarted & successful
  complete: {
    notStarted: 'Transfer sent',
    pending: '',
    failed: '',
    successful: 'Transfer sent'
  },
  // For reverse stage, valid statuses are: pending, failed & successful
  reverse: {
    notStarted: '',
    pending: 'Reversing payment',
    failed: 'Payment reversal failed',
    successful: 'Payment reversed'
  }
};

const getBreakdownContent = (
  stage: TransferBreakdownStageName,
  status: TransferBreakdownStatus
): string => {
  if (stage === 'setup') {
    return 'Transfer setup';
  }
  return CONTENT[stage][status];
};

export default getBreakdownContent;
