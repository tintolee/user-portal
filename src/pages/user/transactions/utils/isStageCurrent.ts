import { TransferBreakdownStageData } from '../components/transactionDetails/detailsInfo/transferUpdates/types';

export const isStageCurrent = (
  currentStage?: TransferBreakdownStageData,
  nextStage?: TransferBreakdownStageData
): boolean => {
  if (!currentStage) return false;
  return currentStage.status !== 'notStarted' && (!nextStage || nextStage?.status === 'notStarted');
};
