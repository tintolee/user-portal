import ClientApi from '@src/types/client';

export type TransferBreakdownStageName =
  | 'setup'
  | 'charge'
  | 'disburse'
  | 'reverse'
  | 'complete'
  | 'processing';

export type TransferBreakdownStatus = 'notStarted' | 'pending' | 'successful' | 'failed';

export type TransferBreakdownStageData = {
  stage: TransferBreakdownStageName;
  status: TransferBreakdownStatus;
  dateTimeISO: null | ClientApi.DateTimeTZ;
};

export type TransferBreakdownStagesData = Record<
  TransferBreakdownStageName,
  TransferBreakdownStageData
>;
