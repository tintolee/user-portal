import { Button } from '@sendsprint/ui-react';
import DisplayAmount from '@src/components/displayAmount';
import VeriffModal from '@src/components/veriffModal';
import { useGetModulrBanks, useToggle } from '@src/hooks';
import React, { useEffect, useState } from 'react';
import { PayBtnClickHandlerOptions, PaymentMethodI } from '../..';
import AuthenticationCode from '../../authenticationCode';
import { FirstTimeUserFormI } from '../../authenticationCode/FirstTimeUser';
import { RegularUserFormI } from '../../authenticationCode/RegularUser';
import useTransactionPin from '../../hooks/useTransactionPin';
import PaymentDropdown from '../paymentDropdown';
import SelectBank from './SelectBank';

export interface ModulrValuesI {
  id: string;
}

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
  value: number;
  currency: string;
  // eslint-disable-next-line no-unused-vars
  handlePayment?: (variant: PaymentMethodI, options: PayBtnClickHandlerOptions) => void;
  isSubmitting: boolean;
  txRef: string | undefined;
  isNethoneCheck: boolean;
  description: string;
  modulrURL?: string;
}

const ModulrDropdown = ({
  handleToggle,
  isOpen,
  currency,
  value,
  handlePayment,
  isNethoneCheck,
  isSubmitting,
  txRef,
  description,
  modulrURL
}: Props) => {
  const [windowBackup, setWindowBackup] = useState<Window | null>();
  const [selectedModulrBank, setSelectedModulrBank] = useState('');
  const {
    handleFalse: handleCloseSelectBanks,
    handleTrue: handleOpenSelectBanks,
    state: isSelectBanksOpen
  } = useToggle();

  const { data: modulrBanks = [] } = useGetModulrBanks();

  const handleOpenWindow = () => {
    const newWindow = window.open('');
    if (newWindow) {
      newWindow.document.write('Loading...'); // to let the user know that an action is in process
      newWindow.document.title = 'Payment';
      setWindowBackup(newWindow);
    }
  };

  const handleFirstTimeCallback = (values: FirstTimeUserFormI) => {
    if (handlePayment) {
      handleOpenWindow();

      return handlePayment('modulr', {
        Pin: values.code,
        modulrValues: {
          id: selectedModulrBank
        }
      });
    }
  };

  const handleRegularCallback = (values: RegularUserFormI) => {
    if (handlePayment) {
      handleOpenWindow();

      return handlePayment('modulr', {
        Pin: values.code,
        modulrValues: {
          id: selectedModulrBank
        }
      });
    }
  };

  const handleModulrBankClick = (id: string) => {
    setSelectedModulrBank(id);
    handleCheckPin();
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
    isTransactionComplete,
    handleVeriffClose,
    isVeriffOpen
  } = useTransactionPin({ handleFirstTimeCallback, handleRegularCallback, isNethoneCheck, txRef });

  useEffect(() => {
    if (isTransactionComplete && !!modulrURL && windowBackup) {
      if (windowBackup) {
        windowBackup.location.href = modulrURL;
      }
    }
  }, [isTransactionComplete, modulrURL, windowBackup]);

  const isTransactionLoading = createPinLoading || isSubmitting || (!!txRef && !isNethoneCheck);
  return (
    <>
      <PaymentDropdown
        isOpen={isOpen}
        handleToggle={handleToggle}
        header={description}
        headerImage={''}
        // headerImage={paymentWithBanks}
      >
        <Button
          type="button"
          label={<DisplayAmount prefix="Pay" value={value} currency={currency} />}
          isBlock={true}
          onClick={handleOpenSelectBanks}
          // onClick={handleCheckPin}
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
      <SelectBank
        modulrBanks={modulrBanks}
        isOpen={isSelectBanksOpen}
        handleClose={handleCloseSelectBanks}
        handleModulrBankClick={handleModulrBankClick}
        checkPinLoading={checkPinLoading}
        selectedModulrBank={selectedModulrBank}
      />
    </>
  );
};

export default ModulrDropdown;
