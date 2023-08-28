import { Button } from '@sendsprint/ui-react';
import DisplayAmount from '@src/components/displayAmount';
import VeriffModal from '@src/components/veriffModal';
import { useToggle } from '@src/hooks';
import { Path } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayBtnClickHandlerOptions, PaymentMethodI } from '../..';
import AuthenticationCode from '../../authenticationCode';
import { FirstTimeUserFormI } from '../../authenticationCode/FirstTimeUser';
import { RegularUserFormI } from '../../authenticationCode/RegularUser';
import useTransactionPin from '../../hooks/useTransactionPin';
import PaymentDropdown from '../paymentDropdown';
import BankDetailsModal, { WireFxBankFormI } from './BankDetailsModal';
import SuccessModal from './SuccessModal';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
  value: number;
  currency: string;
  // eslint-disable-next-line no-unused-vars
  handlePayment?: (variant: PaymentMethodI, options: PayBtnClickHandlerOptions) => void;
  // handlePayment?: () => void;
  isSubmitting: boolean;
  txRef: string | undefined;
  isNethoneCheck: boolean;
  description: string;
  markPageAsClean: () => void;
}

const WirefxDropdown = ({
  currency,
  handleToggle,
  isNethoneCheck,
  isOpen,
  isSubmitting,
  txRef,
  value,
  handlePayment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  description,
  markPageAsClean
}: Props) => {
  const [backupWirefxValues, setBackupWirefxValues] = useState<WireFxBankFormI>();
  const navigate = useNavigate();

  const { handleFalse, handleTrue, state } = useToggle();
  const {
    handleFalse: handleSuccessClose,
    handleTrue: handleSuccessOpen,
    state: isSuccessOpen
  } = useToggle();

  const isLoading = isSubmitting || (!!txRef && !isNethoneCheck);

  const handleFirstTimeCallback = (values: FirstTimeUserFormI) => {
    if (handlePayment) {
      return handlePayment('wirefx', { Pin: values.code, wireFxValues: backupWirefxValues });
    }
  };

  const handleRegularCallback = (values: RegularUserFormI) => {
    if (handlePayment) {
      return handlePayment('wirefx', { Pin: values.code, wireFxValues: backupWirefxValues });
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

  const handleSuccessNavigate = () => {
    markPageAsClean();

    setTimeout(() => {
      const queries = `?txRef=${txRef}&paymentType=wirefx`;
      markPageAsClean();

      navigate(`${Path.PaymentSuccess}${queries}`);
    }, 3000);
  };

  const handleWireFxSubmit = (values: WireFxBankFormI) => {
    setBackupWirefxValues(values);
    handleCheckPin();
  };

  useEffect(() => {
    if (!!txRef && isNethoneCheck) {
      // handleFalse();
      handleSuccessOpen();
      markPageAsClean();
    }
  }, [txRef, isNethoneCheck]);

  const isTransactionLoading = createPinLoading || isSubmitting || (!!txRef && !isNethoneCheck);

  return (
    <>
      <PaymentDropdown
        isOpen={isOpen}
        handleToggle={handleToggle}
        header={'Pay with your bank account'}>
        <Button
          type="button"
          label={<DisplayAmount prefix="Pay" value={value} currency={currency} />}
          isBlock={true}
          onClick={handleTrue}
          showSpinner={isLoading}
          disabled={isLoading}
        />
      </PaymentDropdown>
      <BankDetailsModal
        isLoading={checkPinLoading}
        handleClose={handleFalse}
        isOpen={state}
        handleWireFxSubmit={handleWireFxSubmit}
      />
      <AuthenticationCode
        variant={isPinAvailable ? 'regular' : 'first-time'}
        handleFalse={handleModalClose}
        state={isModalOpen}
        handleRegularSubmit={handleRegularSubmit}
        handleFirstTimeSubmit={handleFirstTimeSubmit}
        isLoading={isTransactionLoading}
      />
      {isSuccessOpen && (
        <SuccessModal
          handleSuccessNavigate={handleSuccessNavigate}
          handleClose={handleSuccessClose}
          isOpen={isSuccessOpen}
        />
      )}
      <VeriffModal state={isVeriffOpen} handleClick={handleVeriffClose} />
    </>
  );
};

export default WirefxDropdown;
