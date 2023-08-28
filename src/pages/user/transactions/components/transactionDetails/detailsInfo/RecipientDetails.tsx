import Api from '@sendsprint/api-types';
import { Box, Skeleton, Text } from '@sendsprint/ui-react';
import { useGetBanks } from '@src/hooks';
import ClientApi from '@src/types/client';
import React, { useMemo } from 'react';
import InfoRow from './InfoRow';

interface Props {
  transaction: ClientApi.Transaction;
  recipient: ClientApi.Recipient | null | undefined;
  isRecipientLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const RecipientDetails = ({ recipient, transaction, isRecipientLoading }: Props) => {
  const { data: banks = [], isLoading } = useGetBanks({
    country: recipient?.country || ('' as Api.Model.CountryInitials)
  });
  const bank = useMemo(() => {
    return banks.find((b) => b.code === recipient?.bankCode);
  }, [recipient?.bankCode, banks]);

  return (
    <>
      {isRecipientLoading && <Skeleton className="ss-h-20 ss-rounded-lg" />}
      {!isRecipientLoading && recipient && (
        <Box>
          <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-mb-4 ss-font-bold">
            Recipient&apos;s Details
          </Text>
          <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg">
            <InfoRow label="Name" value={recipient.fullName} />
            {/** Non GH mobile money should show bank name */}
            {recipient.type !== ClientApi.RecipientType.GH_MOBILE && recipient.bankCode && (
              <InfoRow
                label="Bank"
                value={isLoading ? <Skeleton className="ss-h-5 ss-rounded" /> : bank?.name}
              />
            )}
            {/** GH mobile money uses bank code for mobile operator */}
            {recipient.type === ClientApi.RecipientType.GH_MOBILE && recipient.bankCode && (
              <InfoRow
                label="Mobile operator"
                value={isLoading ? <Skeleton className="ss-h-5 ss-rounded" /> : bank?.name}
              />
            )}
            {recipient.accountNumber && (
              <InfoRow label="Account number" value={recipient.accountNumber} />
            )}
            {recipient.routingNumber && (
              <InfoRow label="Routing number" value={recipient.routingNumber} />
            )}
            {recipient.email && <InfoRow label="Email" value={recipient.email} />}
            {recipient.phoneNumber && (
              <InfoRow label="Phone number" value={recipient.phoneNumber} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RecipientDetails;
