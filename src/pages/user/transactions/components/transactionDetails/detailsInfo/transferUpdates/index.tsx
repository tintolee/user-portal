import { Box, Skeleton, Text } from '@sendsprint/ui-react';
import { DURATION_10_SEC } from '@src/constants';
import { useGetTransactionTimestamp } from '@src/hooks';
import { isStageCurrent } from '@src/pages/user/transactions/utils';
import ClientApi from '@src/types/client';
import React from 'react';
import getBreakdownStagesData from './getStagesData';
import UpdateInfo from './UpdateInfo';

interface Props {
  transaction: ClientApi.Transaction;
}

const TransferUpdates = ({ transaction }: Props) => {
  const { data: timestamp, isLoading: isTimestampLoading } = useGetTransactionTimestamp(
    {
      txref: transaction?.txRef
    },
    {
      refetchInterval: DURATION_10_SEC
    }
  );

  const breakdown = getBreakdownStagesData(timestamp, transaction.status);

  const finalStage =
    breakdown?.reverse.status !== 'notStarted' ? breakdown?.reverse : breakdown?.complete;

  return (
    <Box className="ss-mb-8">
      {isTimestampLoading && <Skeleton className="ss-h-44 ss-rounded-lg" />}
      {!isTimestampLoading && timestamp && (
        <Box className="ss-mb-8">
          <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-mb-4 ss-font-bold">
            Transfer Updates
          </Text>
          <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg">
            <UpdateInfo
              label="Transfer Setup"
              isCurrent={isStageCurrent(breakdown?.setup, breakdown?.processing)}
              {...breakdown?.setup}
            />
            <UpdateInfo
              label="Processing"
              isCurrent={isStageCurrent(breakdown?.processing, breakdown?.charge)}
              {...breakdown?.processing}
            />
            <UpdateInfo
              label="Payment Verified"
              isCurrent={isStageCurrent(breakdown?.charge, breakdown?.disburse)}
              {...breakdown?.charge}
            />
            <UpdateInfo
              label="Transfer Processing"
              isCurrent={isStageCurrent(breakdown?.disburse, finalStage)}
              {...breakdown?.disburse}
            />
            <UpdateInfo
              label="Transfer Sent"
              isCurrent={isStageCurrent(finalStage)}
              isFinalStage={isStageCurrent(finalStage)}
              extraInfo="Transfer may take up to 24hrs to get to the recipient."
              {...finalStage}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TransferUpdates;
