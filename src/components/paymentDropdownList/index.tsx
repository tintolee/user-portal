/* eslint-disable no-unused-vars */
import { useToggle } from '@src/hooks';
import React, { useEffect, useState } from 'react';
import { PaymentMethodsI } from './GetPaymentMethods';
import { WireFxBankFormI } from './components/wirefxDropdown/BankDetailsModal';
import PaymentDropdownListInner from './PaymentDropdownListInner';
import { ModulrValuesI } from './components/modulrDropdown';

export type PaymentMethodI = 'flutterwave' | 'volume' | 'modulr' | 'wirefx';

export interface PayBtnClickHandlerOptions {
  wireFxValues?: WireFxBankFormI;
  modulrValues?: ModulrValuesI;
  Pin: string;
}

interface Props {
  paymentMethodData: PaymentMethodsI[] | undefined;
  value: number;
  currency: string;
  handlePayment: (
    variant: PaymentMethodI,
    options?: PayBtnClickHandlerOptions
  ) => void | Promise<boolean>;
  isSubmitting: boolean;
  txRef?: string;
  isNethoneCheck: boolean;
  onCancelBtnClickHandler: () => void;
  markPageAsClean: () => void;
  transferType: string;
  onSuccess?: () => void;
  selectedPaymentMethod: PaymentMethodI | null;
  modulrURL?: string;
}

export interface SortedDataI extends PaymentMethodsI {
  handleSubmit?: (
    variant: PaymentMethodI,
    options: PayBtnClickHandlerOptions
  ) => void | Promise<boolean>;
  isOpen: boolean;
}

export const resolveTxRef = (
  selectedPaymentMethod: PaymentMethodI | null,
  paymentMethod: PaymentMethodI,
  txRef: string | undefined
) => {
  return selectedPaymentMethod === paymentMethod && txRef ? txRef : undefined;
};

const PaymentDropdownList = ({
  paymentMethodData,
  currency,
  value,
  handlePayment,
  isNethoneCheck,
  isSubmitting,
  txRef,
  onCancelBtnClickHandler,
  markPageAsClean,
  transferType,
  onSuccess,
  selectedPaymentMethod,
  modulrURL
}: Props) => {
  const [sortedData, setSortedData] = useState<SortedDataI[]>([]);

  const {
    state: showVolumeModal,
    handleFalse: handleModalClose,
    handleTrue: handleModalOpen
  } = useToggle();

  const handleCloseVolumeModal = () => {
    handleModalClose();
  };

  useEffect(() => {
    if (paymentMethodData && paymentMethodData.length) {
      let mappedData: SortedDataI[] = [];

      if (transferType === 'recurring') {
        mappedData = paymentMethodData
          .filter((item) => item.Gateway.toLowerCase() === 'flutterwave')
          .map((item) => {
            return {
              Gateway: item.Gateway,
              Id: item.Id,
              Description: item.Description,
              isOpen: false,
              handleSubmit: handlePayment
            };
          });
      } else {
        mappedData = paymentMethodData.map((item) => {
          return {
            Gateway: item.Gateway,
            Id: item.Id,
            Description: item.Description,
            isOpen: false,
            handleSubmit: handlePayment
          };
        });
      }

      mappedData[0].isOpen = true;

      setSortedData(mappedData);
    }
  }, [paymentMethodData, transferType, handlePayment]);

  const handleToggle = (id: number) => {
    if (sortedData) {
      const copiedData = [...sortedData];
      for (const i of copiedData) {
        if (i.Id === id) {
          i.isOpen = true;
        } else {
          i.isOpen = false;
        }
      }

      setSortedData(copiedData);
    }
  };

  const handleOtherPaymentMethods = () => {
    handleCloseVolumeModal();

    const volumePaymentMethodIndex = sortedData?.findIndex((item) => item.Gateway === 'VolumePay');

    if (volumePaymentMethodIndex < 0) return;

    const nextPaymentMethod = sortedData[volumePaymentMethodIndex + 1];
    const copiedData = [...sortedData];

    if (nextPaymentMethod) {
      copiedData[volumePaymentMethodIndex].isOpen = false;
      copiedData[volumePaymentMethodIndex + 1].isOpen = true;
    } else {
      copiedData[0].isOpen = true;
      copiedData[volumePaymentMethodIndex].isOpen = false;
    }

    setSortedData(copiedData);
  };

  return (
    <PaymentDropdownListInner
      currency={currency}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      handleOtherPaymentMethods={handleOtherPaymentMethods}
      handleToggle={handleToggle}
      isNethoneCheck={isNethoneCheck}
      isSubmitting={isSubmitting}
      markPageAsClean={markPageAsClean}
      onCancelBtnClickHandler={onCancelBtnClickHandler}
      selectedPaymentMethod={selectedPaymentMethod}
      showVolumeModal={showVolumeModal}
      sortedData={sortedData}
      transferType={transferType}
      value={value}
      modulrURL={modulrURL}
      onSuccess={onSuccess}
      txRef={txRef}
    />
  );
};

export default PaymentDropdownList;
