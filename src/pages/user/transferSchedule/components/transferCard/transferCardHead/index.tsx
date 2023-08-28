import { Box, Skeleton, Text } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import React from 'react';
import { CardData } from '..';
import StatusBox from '../statusBox';

interface Props {
  isLoading: boolean;
  cardData: CardData | undefined;
  name: string | undefined;
  status: string;
  item: ClientApi.RecurringTransactionI;
}

const TransferCardHead = ({ isLoading, cardData, name, status, item }: Props) => {
  const { SentCount, IsCompleted, ChargedAmount, Duration } = item;
  return (
    <>
      {isLoading && (
        <Box className="ss-flex ss-justify-between ss-gap-4 ss-items-center ss-mb-4">
          <Skeleton className="ss-h-4 ss-flex-1 ss-rounded" />
          <Skeleton className="ss-h-4 ss-w-20 ss-rounded" />
        </Box>
      )}
      {!isLoading && cardData && (
        <Box className="ss-flex ss-items-center ss-justify-between ss-gap-2 ss-flex-wrap ss-mb-4">
          <Text className="ss-font-bold ss-text-primary1-500">{name}</Text>
          <StatusBox isCompleted={IsCompleted} status={status || cardData?.status || ''} />
        </Box>
      )}
      {isLoading && <Skeleton className="ss-h-10 ss-rounded ss-mb-4" />}
      {!isLoading && cardData && (
        <Box className="ss-flex ss-items-center ss-justify-between ss-gap-2 ss-flex-wrap">
          <Box>
            <Text variant="paragraphSmall" className="ss-font-bold ss-text-neutral-400">
              {cardData?.currency} {ChargedAmount}
            </Text>
            <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
              {cardData?.interval}
            </Text>
          </Box>
          <Box className="">
            <Text
              variant="paragraphSmall"
              className="ss-text-right ss-font-bold ss-text-neutral-400">
              {SentCount}/{Number(Duration) + 1}
            </Text>
            <Text variant="paragraphVerySmall" className="ss-text-right ss-text-neutral-400">
              Transfers
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TransferCardHead;
