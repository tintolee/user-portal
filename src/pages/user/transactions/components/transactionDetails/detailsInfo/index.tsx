import { Box, Skeleton } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import React from 'react';
import { useGetRecipientById } from '@src/hooks';
import DetailsHead from './detailsHead';
import TransferDetails from './TransferDetails';
import RecipientDetails from './RecipientDetails';
import TransferUpdates from './transferUpdates';

interface Props {
  transaction: ClientApi.Transaction | null | undefined;
  isLoading: boolean;
  typeFromQuery: string | null;
}

const DetailsInfo = ({ transaction, isLoading, typeFromQuery }: Props) => {
  const { data: recipient, isLoading: isRecipientLoading } = useGetRecipientById(
    {
      id: transaction?.recipientId.toString() || ''
    },
    {
      enabled: !!transaction?.recipientId
    }
  );

  return (
    <>
      {isLoading && (
        <Box>
          <Skeleton className="ss-h-16 ss-rounded ss-mb-6" />
          <Box className="ss-flex ss-flex-col ss-gap-4 ss-p-6 ss-bg-white ss-rounded-lg">
            {[...Array(4)].map((_, index) => (
              <Skeleton className="ss-h-20 ss-rounded" key={index} />
            ))}
          </Box>
        </Box>
      )}
      {!isLoading && transaction && (
        <Box>
          <DetailsHead
            recipient={recipient}
            typeFromQuery={typeFromQuery}
            transaction={transaction}
          />
          <TransferUpdates transaction={transaction} />
          <TransferDetails recipient={recipient} transaction={transaction} />
          <RecipientDetails
            recipient={recipient}
            transaction={transaction}
            isRecipientLoading={isRecipientLoading}
          />
        </Box>
      )}
    </>
  );
};

export default DetailsInfo;
