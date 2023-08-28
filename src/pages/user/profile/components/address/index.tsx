import { Box, Button, Text } from '@sendsprint/ui-react';
import ResolveCountryProperty from '@src/components/resolveCountryProperty';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { useAccount } from '@src/contexts';
import { useCountDown, useToggle } from '@src/hooks';
import { getPostCodeLabel } from '@src/utils/address';
import { format } from 'date-fns';
import React from 'react';
import InfoRow from '../infoRow';
import AddressUpdateForm from './AddressUpdateForm';

export const formatDate = (date: string | undefined | null) => {
  if (!date) return '';

  return format(new Date(), 'dd MMM, yyyy');
};

const Address = () => {
  const { userAddress } = useAccount();
  const { handleFalse, handleTrue, state } = useToggle();

  const { countDown, handleStartTimer, isStarted } = useCountDown({
    countDownValue: RESEND_OTP_COUNTDOWN_TIME
  });

  return (
    <Box>
      <Box className="ss-mb-4 ss-flex ss-justify-between ss-items-center">
        <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-font-bold">
          Address
        </Text>
        <Button
          onClick={handleTrue}
          className="ss-px-10 md:ss-px-20"
          variant="secondary"
          label="Edit"
          size="small"
        />
      </Box>
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg">
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-justify-between ss-mb-4 ss-items-center ss-gap-4">
          <InfoRow
            label="Country"
            countryInitial={userAddress?.country ? userAddress.country : undefined}
            value={
              userAddress?.country ? (
                <ResolveCountryProperty
                  countryInitials={userAddress?.country}
                  propertyName="name"
                />
              ) : (
                ''
              )
            }
          />
          <InfoRow label="State" value={userAddress?.state || ''} />
        </Box>
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-justify-between ss-mb-4 ss-items-center ss-gap-4">
          <InfoRow label="City" value={userAddress?.city || ''} />
          <InfoRow label="Street address" value={userAddress?.street || ''} />
        </Box>
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-justify-between ss-mb-4 ss-items-center ss-gap-4">
          <InfoRow
            label={getPostCodeLabel(userAddress?.country || '') || ''}
            value={userAddress?.postCode || ''}
          />
          <InfoRow label="Date of birth" value={formatDate(userAddress?.dateOfBirth)} />
        </Box>
        <InfoRow label="Phone number" value={userAddress?.phone || ''} />
      </Box>
      <AddressUpdateForm
        countDown={countDown}
        handleStartTimer={handleStartTimer}
        isStarted={isStarted}
        isOpen={state}
        handleClose={handleFalse}
      />
    </Box>
  );
};

export default Address;
