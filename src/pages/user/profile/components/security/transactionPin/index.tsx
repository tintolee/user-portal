import { Box, Text } from '@sendsprint/ui-react';
import AuthenticationCode from '@src/components/paymentDropdownList/authenticationCode';
import { FirstTimeUserFormI } from '@src/components/paymentDropdownList/authenticationCode/FirstTimeUser';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { useToasts } from '@src/contexts';
import { useCheckIfPinExistsQuery, useCountDown, useCreatePin, useToggle } from '@src/hooks';
import React, { useEffect, useState } from 'react';
import ChangeCode from './ChangeCode';

const TransactionPin = () => {
  const [isPinAvailable, setIsPinAvailable] = useState(false);

  const { handleFalse, handleTrue, state } = useToggle();
  const {
    handleFalse: handleCloseFirstTime,
    handleTrue: handleOpenFirstTime,
    state: isFirstTimeOpen
  } = useToggle();
  const toast = useToasts();

  const { countDown, handleStartTimer, isStarted } = useCountDown({
    countDownValue: RESEND_OTP_COUNTDOWN_TIME
  });

  const { mutate: createPinMutate, isLoading: createPinLoading } = useCreatePin({
    onSuccess: () => {
      toast.addToast({ body: 'Code created successfully' });
      handleCloseFirstTime();
    }
  });
  const { data: checkIfPinExists } = useCheckIfPinExistsQuery({
    retry: 1
  });

  useEffect(() => {
    if (checkIfPinExists && checkIfPinExists.ResponseMessage === 'Successful') {
      setIsPinAvailable(true);
    } else {
      setIsPinAvailable(false);
    }
  }, [checkIfPinExists]);

  const header = isPinAvailable ? 'Update Transaction code' : 'Create Transaction code';
  const text = isPinAvailable
    ? 'Change or reset your sendsprint Transaction code'
    : 'Create a Transaction code to authorize your transactions';

  const handleFirstTimeSubmit = (values: FirstTimeUserFormI) => {
    createPinMutate({
      PIN: values.code
    });
  };

  return (
    <Box className="ss-bg-white ss-p-4 ss-space-y-4 ss-rounded-lg">
      <Box className="ss-bg-neutral-100 ss-flex ss-justify-between ss-items-center ss-gap-4 ss-w-full ss-rounded-base ss-px-4 ss-py-3">
        <Box>
          <Text className="ss-text-neutral-400" variant="paragraphSmall">
            {header}
          </Text>
          <Text className="ss-text-neutral-500" variant="paragraphSmall">
            {text}
          </Text>
        </Box>
        {isPinAvailable && (
          <button
            onClick={handleTrue}
            className="ss-font-bold focus:ss-focus-ring ss-rounded ss-text-primary1-500">
            Change code
          </button>
        )}
        {!isPinAvailable && (
          <button
            onClick={handleOpenFirstTime}
            className="ss-font-bold focus:ss-focus-ring ss-rounded ss-text-primary1-500">
            Create code
          </button>
        )}
      </Box>
      <ChangeCode
        countDown={countDown}
        handleStartTimer={handleStartTimer}
        isStarted={isStarted}
        state={state}
        handleFalse={handleFalse}
      />
      <AuthenticationCode
        variant="first-time"
        state={isFirstTimeOpen}
        scenario="profile"
        handleFalse={handleCloseFirstTime}
        handleFirstTimeSubmit={handleFirstTimeSubmit}
        isLoading={createPinLoading}
      />
    </Box>
  );
};

export default TransactionPin;
