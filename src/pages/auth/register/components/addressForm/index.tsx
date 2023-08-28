import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import useCountDown from '@src/hooks/utils/useCountDown';
import { useGetSendCountries } from '@src/hooks/queries/location';
import React from 'react';
import AddressFormInner, { AddressFormInnerProps } from './AddressFormInner';

type Props = Omit<
  AddressFormInnerProps,
  'sendCountries' | 'countDown' | 'handleStartTimer' | 'isStarted'
>;

const AddressForm = (props: Props) => {
  const { data: sendCountries = [] } = useGetSendCountries();

  const { countDown, handleStartTimer, isStarted } = useCountDown({
    countDownValue: RESEND_OTP_COUNTDOWN_TIME
  });

  return (
    <AddressFormInner
      countDown={countDown}
      sendCountries={sendCountries}
      handleStartTimer={handleStartTimer}
      isStarted={isStarted}
      {...props}
    />
  );
};

export default AddressForm;
