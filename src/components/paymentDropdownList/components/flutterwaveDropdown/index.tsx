import React from 'react';
import { Button } from '@sendsprint/ui-react';
import DisplayAmount from '@src/components/displayAmount';
import { PayBtnClickHandlerOptions, PaymentMethodI } from '../..';
import { paymentWithFlutterwave } from '../../assets';
import AuthenticationCode from '../../authenticationCode';
import { FirstTimeUserFormI } from '../../authenticationCode/FirstTimeUser';
import { RegularUserFormI } from '../../authenticationCode/RegularUser';
import useTransactionPin from '../../hooks/useTransactionPin';
import PaymentDropdown from '../paymentDropdown';
import VeriffModal from '@src/components/veriffModal';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
  value: number;
  currency: string;
  handlePayment?: (
    // eslint-disable-next-line no-unused-vars
    variant: PaymentMethodI,
    // eslint-disable-next-line no-unused-vars
    options: PayBtnClickHandlerOptions
  ) => void | Promise<boolean>;
  isSubmitting: boolean;
  txRef: string | undefined;
  isNethoneCheck: boolean;
}

const FlutterwaveDropdown = ({
  handleToggle,
  isOpen,
  currency,
  value,
  handlePayment,
  isNethoneCheck,
  isSubmitting,
  txRef
}: Props) => {
  const handleFirstTimeCallback = (values: FirstTimeUserFormI) => {
    if (handlePayment) {
      return handlePayment('flutterwave', { Pin: values.code });
    }
  };

  const handleRegularCallback = (values: RegularUserFormI) => {
    if (handlePayment) {
      return handlePayment('flutterwave', { Pin: values.code });
    }
  };

  const {
    isPinAvailable,
    checkPinLoading,
    createPinLoading,
    handleCheckPin,
    handleModalClose,
    handleFirstTimeSubmit,
    handleRegularSubmit,
    isOpen: isModalOpen,
    handleVeriffClose,
    isVeriffOpen
  } = useTransactionPin({ handleFirstTimeCallback, handleRegularCallback, isNethoneCheck, txRef });

  const isTransactionLoading = createPinLoading || isSubmitting || (!!txRef && !isNethoneCheck);

  return (
    <>
      <PaymentDropdown
        isOpen={isOpen}
        handleToggle={handleToggle}
        header={''}
        showMoreText
        headerImage={paymentWithFlutterwave}>
        <Button
          type="button"
          label={<DisplayAmount prefix="Pay" value={value} currency={currency} />}
          isBlock={true}
          onClick={handleCheckPin}
          showSpinner={checkPinLoading}
          disabled={checkPinLoading}
        />
      </PaymentDropdown>
      <AuthenticationCode
        variant={isPinAvailable ? 'regular' : 'first-time'}
        handleFalse={handleModalClose}
        state={isModalOpen}
        handleRegularSubmit={handleRegularSubmit}
        handleFirstTimeSubmit={handleFirstTimeSubmit}
        isLoading={isTransactionLoading}
      />
      <VeriffModal state={isVeriffOpen} handleClick={handleVeriffClose} />
    </>
  );
};

export default FlutterwaveDropdown;
