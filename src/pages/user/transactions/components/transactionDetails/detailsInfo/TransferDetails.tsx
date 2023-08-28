import { Box, Flag, Text } from '@sendsprint/ui-react';
import { DisplayAmount } from '@src/components';
import { useGetSendCountries } from '@src/hooks';
import ClientApi from '@src/types/client';
import React, { useMemo } from 'react';
import InfoRow from './InfoRow';

interface Props {
  transaction: ClientApi.Transaction;
  recipient: ClientApi.Recipient | null | undefined;
}

const TransferDetails = ({ recipient, transaction }: Props) => {
  const {
    sendAmount,
    sendCurrency,
    receiveAmount,
    receiveCurrency,
    txRef,
    fee,
    securityAnswer,
    securityQuestion,
    rate
  } = transaction;
  const { data: sendCountries = [] } = useGetSendCountries();

  const sendCountryInitials = useMemo(() => {
    const country = sendCountries.find((c) => c.currency === sendCurrency);
    return country ? country.initials : null;
  }, [sendCountries, sendCurrency]);

  const receiveCountryInitials = useMemo(() => {
    return recipient ? recipient.country : null;
  }, [recipient]);

  const recipientName = recipient
    ? `${recipient?.firstName || ''} ${recipient?.lastName || ''}`
    : 'Recipient';
  return (
    <Box className="ss-mb-8">
      <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-mb-4 ss-font-bold">
        Transfer Details
      </Text>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg">
        <InfoRow
          label="You sent"
          value={<DisplayAmount value={sendAmount} currency={sendCurrency} />}
        />
        <InfoRow
          label={`${recipientName}  received`}
          value={<DisplayAmount value={receiveAmount} currency={receiveCurrency} />}
        />
        <InfoRow
          label="Exchange rate"
          value={
            <div className="ss-flex ss-items-center ss-space-x-2">
              {sendCountryInitials && receiveCountryInitials && (
                <Flag size={24} countryInitials={sendCountryInitials} />
              )}
              <DisplayAmount as="span" value={1} currency={sendCurrency} />
              <span>-</span>
              {sendCountryInitials && receiveCountryInitials && (
                <Flag size={24} countryInitials={receiveCountryInitials} />
              )}
              <DisplayAmount as="span" value={rate} currency={receiveCurrency} />
            </div>
          }
        />
        <InfoRow label="Our fee" value={<DisplayAmount value={fee} currency={sendCurrency} />} />
        {/* <InfoRow label="Payment method" value="100 USD" /> */}
        {securityQuestion && <InfoRow label="Security question" value={securityQuestion} />}
        {securityAnswer && <InfoRow label="Answer" value={securityAnswer} />}
        <InfoRow label="Reference number" value={txRef} />
      </Box>
    </Box>
  );
};

export default TransferDetails;
