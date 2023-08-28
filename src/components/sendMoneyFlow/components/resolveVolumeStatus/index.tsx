import { ButtonLink, Dialog, DialogBody, DialogFooter, useId } from '@sendsprint/ui-react';
import {
  VolumePaymentFailedScreen,
  VolumePaymentLoadingScreen,
  VolumePaymentSuccessScreen
} from '@src/components/paymentDropdownList/components/volumeDropdown/VolumeModal';
import { useGetTransactionByTxref } from '@src/hooks';
import React, { useEffect, useState } from 'react';
// import {
//   VolumePaymentFailedScreen,
//   VolumePaymentLoadingScreen,
//   VolumePaymentSuccessScreen
// } from '../confirmPaymentStep/paymentDropdownList/VolumeModal';

const ResolveVolumeStatus = () => {
  const [state, setState] = useState({ txRef: '', isOpen: false });
  const titleId = useId();

  const callBackUrl = localStorage.getItem('volume-callback');

  const removeCallbackUrl = () => {
    localStorage.removeItem('volume-callback');
  };

  const { data, isLoading } = useGetTransactionByTxref(
    {
      txref: state.txRef
    },
    {
      enabled: !!state.txRef
    }
  );

  useEffect(() => {
    if (callBackUrl) {
      try {
        const url = new URL(callBackUrl);
        const merchantPaymentId = url.searchParams.get('merchantPaymentId');

        if (merchantPaymentId) {
          setState({ txRef: merchantPaymentId || '', isOpen: true });
        }
      } catch (error) {
        console.log('url error');
      }
    }
  }, [callBackUrl]);

  return (
    <Dialog
      showCloseButton={false}
      isOpen={state.isOpen}
      onDismiss={() => undefined}
      aria-labelledby={titleId}
      size="normal">
      <DialogBody>
        {isLoading && <VolumePaymentLoadingScreen />}
        {!isLoading && data && data.status === 'FailedCharge' && <VolumePaymentFailedScreen />}
        {!isLoading && data && data.status !== 'FailedCharge' && (
          <VolumePaymentSuccessScreen
            amount={data.sendAmount}
            currency={data.sendCurrency}
            recipientName={data.recipientName}
          />
        )}
      </DialogBody>
      <DialogFooter>
        <ButtonLink
          to={`/transfers/${state.txRef}`}
          label="Transaction details"
          variant="secondary"
          isBlock
          onClick={removeCallbackUrl}
        />
        {/* <Button label="Close Modal"  /> */}
      </DialogFooter>
    </Dialog>
  );
};

export default ResolveVolumeStatus;
