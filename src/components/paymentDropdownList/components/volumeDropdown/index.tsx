import React, { useEffect, useState } from 'react';
import PaymentDropdown from '../paymentDropdown';
import { isMobile } from 'react-device-detect';
import { Button } from '@sendsprint/ui-react';
import DisplayAmount from '@src/components/displayAmount';
import VolumeModal from './VolumeModal';
import { Volume } from '@getvolume/react';
import { PayBtnClickHandlerOptions, PaymentMethodI } from '../..';
import { useGetTransactionByTxref } from '@src/hooks';
import { FirstTimeUserFormI } from '../../authenticationCode/FirstTimeUser';
import { RegularUserFormI } from '../../authenticationCode/RegularUser';
import useTransactionPin from '../../hooks/useTransactionPin';
import AuthenticationCode from '../../authenticationCode';
import VeriffModal from '@src/components/veriffModal';

export type TrackingStatus = 'success' | 'failed' | 'pending';

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
  handleOtherPaymentMethods: () => void;
  markPageAsClean: () => void;
  transferType: string;
  onSuccess?: () => void;
  showVolumeModal: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

const VolumeDropdown = ({
  handleToggle,
  isOpen,
  currency,
  handlePayment,
  isNethoneCheck,
  isSubmitting,
  txRef,
  value,
  handleOtherPaymentMethods,
  markPageAsClean,
  transferType,
  onSuccess,
  showVolumeModal,
  handleModalClose,
  handleModalOpen
}: Props) => {
  const [status, setStatus] = useState<TrackingStatus>('pending');
  const { data, refetch, isLoading } = useGetTransactionByTxref(
    {
      txref: txRef || ''
    },
    {
      enabled: status === 'success' && showVolumeModal && !!txRef
    }
  );

  const handleFirstTimeCallback = (values: FirstTimeUserFormI) => {
    if (handlePayment) {
      return handlePayment('volume', { Pin: values.code });
    }
  };

  const handleRegularCallback = (values: RegularUserFormI) => {
    if (handlePayment) {
      return handlePayment('volume', { Pin: values.code });
    }
  };

  const {
    isPinAvailable,
    checkPinLoading,
    createPinLoading,
    handleCheckPin,
    handleModalClose: handleAuthClose,
    handleFirstTimeSubmit,
    handleRegularSubmit,
    isOpen: isModalOpen,
    isTransactionComplete,
    handleVeriffClose,
    isVeriffOpen
  } = useTransactionPin({ handleFirstTimeCallback, handleRegularCallback, isNethoneCheck, txRef });

  useEffect(() => {
    if (isTransactionComplete) {
      handleModalOpen();
    }
  }, [isTransactionComplete]);

  const isTransactionLoading = createPinLoading || isSubmitting || (!!txRef && !isNethoneCheck);

  const handleMadePaymentBtn = () => {
    refetch();
  };

  const handleClose = () => {
    handleModalClose();
  };

  return (
    <>
      <PaymentDropdown
        isOpen={isOpen}
        handleToggle={handleToggle}
        header="Pay with your bank"
        // headerImage={paymentWithBanks}
      >
        {isMobile && showVolumeModal && !!txRef ? null : (
          <Button
            type="button"
            label={<DisplayAmount prefix="Pay" value={value} currency={currency} />}
            isBlock={true}
            onClick={handleCheckPin}
            showSpinner={checkPinLoading}
            disabled={checkPinLoading}
          />
        )}
        {!isMobile && (
          <VolumeModal
            status={status}
            setStatus={setStatus}
            data={data}
            isLoading={isLoading}
            currency={currency}
            handleClose={handleClose}
            isOpen={showVolumeModal && !!txRef}
            merchantPaymentId={txRef || ''}
            reference="SendSprint"
            value={value}
            handleOtherPaymentMethods={handleOtherPaymentMethods}
            handleMadePaymentBtn={handleMadePaymentBtn}
            markPageAsClean={markPageAsClean}
            transferType={transferType}
            onSuccess={onSuccess}
          />
        )}
        {isMobile && showVolumeModal && !!txRef && (
          <Volume
            amount={value}
            currency={currency}
            reference="SendSprint"
            merchantPaymentId={txRef}
            disablePaymentStatusPooling={false}
            // componentViewTypeCallback={(componentViewType) => {
            //   if (
            //     componentViewType === "MOBILE_NEW_CUSTOMER" ||
            //     componentViewType === "MOBILE_RETURNING_CUSTOMER"
            //   ) {
            //     console.log(componentViewType, "componentViewType");
            //   }
            // }}
            paymentStatusCallback={(e) => {
              // writing this here because the type wasn't exported by the volume team
              if (e.paymentStatus === 'COMPLETED') {
                setStatus('success');
              }
              if (e.paymentStatus === 'FAILED') {
                setStatus('failed');
              }
            }}
          />
        )}
      </PaymentDropdown>
      <AuthenticationCode
        variant={isPinAvailable ? 'regular' : 'first-time'}
        handleFalse={handleAuthClose}
        state={isModalOpen}
        handleRegularSubmit={handleRegularSubmit}
        handleFirstTimeSubmit={handleFirstTimeSubmit}
        isLoading={isTransactionLoading}
      />
      <VeriffModal state={isVeriffOpen} handleClick={handleVeriffClose} />
    </>
  );
};

export default VolumeDropdown;
