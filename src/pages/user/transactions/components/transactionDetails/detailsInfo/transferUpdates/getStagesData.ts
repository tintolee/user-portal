import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import {
  TransferBreakdownStageData,
  TransferBreakdownStageName,
  TransferBreakdownStagesData
} from './types';

/**
 * Different stages for a Transaction time stamp, and how they map to statuses
 * Setup stage - created date means success
 * Charge stage - Pending (createdDate), Failed charge, Charged
 * Disbursement stage - Disbursed, Failed disburse, Completed
 * Return stage - Chargeback, - , Reversed
 */

const getInitialStageData = (stage: TransferBreakdownStageName): TransferBreakdownStageData => ({
  stage,
  status: 'notStarted',
  dateTimeISO: null
});

const getBreakdownStagesData = (
  timestamp: ClientApi.TransactionTimestamp | null | undefined,
  status?: Api.Model.TransactionStatus | undefined
): TransferBreakdownStagesData | undefined => {
  if (!timestamp) return;

  const {
    createdDateISO,
    failedChargeDateISO,
    chargedDateISO,
    disbursedDateISO,
    failedDisburseISO,
    completedDateISO,
    chargebackDateISO,
    reversedDateISO
  } = timestamp;
  const setup: TransferBreakdownStageData = {
    stage: 'setup',
    status: 'successful',
    dateTimeISO: createdDateISO
  };

  const processing: TransferBreakdownStageData = getInitialStageData('processing');
  const charge: TransferBreakdownStageData = getInitialStageData('charge');
  const disburse: TransferBreakdownStageData = getInitialStageData('disburse');
  const complete: TransferBreakdownStageData = getInitialStageData('complete');
  const reverse: TransferBreakdownStageData = getInitialStageData('reverse');

  if (
    (status && status === Api.Model.TransactionStatus.Processing) ||
    (status && status === Api.Model.TransactionStatus.Confirming)
  ) {
    processing.status = 'pending';
  } else {
    processing.status = 'successful';

    // if (chargedDateISO) {
    //   charge.status = 'successful';
    //   charge.dateTimeISO = chargedDateISO;
    // } else if (failedChargeDateISO) {
    //   charge.status = 'failed';
    //   charge.dateTimeISO = failedChargeDateISO;
    // } else {
    //   charge.status = 'pending';
    //   charge.dateTimeISO = createdDateISO;
    // }

    if (failedChargeDateISO) {
      charge.status = 'failed';
      charge.dateTimeISO = failedChargeDateISO;
      disburse.status = 'notStarted';
      disburse.dateTimeISO = null;
    } else {
      if (chargedDateISO) {
        charge.status = 'successful';
        charge.dateTimeISO = chargedDateISO;
      } else {
        charge.status = 'pending';
        charge.dateTimeISO = createdDateISO;
      }

      if (failedDisburseISO) {
        disburse.status = 'failed';
        disburse.dateTimeISO = failedDisburseISO;
      } else {
        if (
          completedDateISO ||
          (status && status === Api.Model.TransactionStatus.Completed) ||
          (status && status === Api.Model.TransactionStatus.Disbursed)
        ) {
          disburse.status = 'successful';
          disburse.dateTimeISO = completedDateISO;
          complete.status = 'successful';
          complete.dateTimeISO = completedDateISO;
        } else if (failedDisburseISO) {
          disburse.status = 'failed';
          disburse.dateTimeISO = failedDisburseISO;
        } else if (disbursedDateISO) {
          disburse.status = 'pending';
          disburse.dateTimeISO = disbursedDateISO;
        }
      }

      if (reversedDateISO) {
        reverse.status = 'successful';
        reverse.dateTimeISO = reversedDateISO;
      } else if (chargebackDateISO) {
        reverse.status = 'pending';
        reverse.dateTimeISO = chargebackDateISO;
      }
    }
  }

  return { setup, charge, disburse, complete, reverse, processing };
};

export default getBreakdownStagesData;
