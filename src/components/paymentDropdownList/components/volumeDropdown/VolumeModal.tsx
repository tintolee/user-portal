/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Volume } from '@getvolume/react';
import {
  Button,
  ButtonLink,
  Dialog,
  DialogBody,
  DialogFooter,
  Icon,
  Text,
  useId
} from '@sendsprint/ui-react';
import {
  CheckmarkCircle2Outline,
  CloseCircleOutline,
  LoaderOutline
} from '@sendsprint/ui-react/dist/icons';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  value: number;
  currency: string;
  reference: string;
  handleOtherPaymentMethods: () => void;
  merchantPaymentId: string;
  handleMadePaymentBtn: () => void;
  data: ClientApi.Transaction | null | undefined;
  isLoading: boolean;
  status: TrackingStatus;
  setStatus: React.Dispatch<React.SetStateAction<TrackingStatus>>;
  markPageAsClean: () => void;
  transferType: string;
  onSuccess?: () => void;
}

type TrackingStatus = 'success' | 'failed' | 'pending';

const VolumeModal = ({
  handleClose,
  isOpen,
  currency,
  merchantPaymentId,
  reference,
  value,
  handleMadePaymentBtn,
  data,
  isLoading,
  status,
  setStatus,
  handleOtherPaymentMethods,
  markPageAsClean,
  transferType,
  onSuccess
}: Props) => {
  const titleId = useId();

  return (
    <Dialog
      showCloseButton={false}
      isOpen={isOpen}
      onDismiss={() => undefined}
      aria-labelledby={titleId}
      size="normal">
      <DialogBody>
        <div className="ss-mb-10 ss-space-y-4">
          {status === 'pending' && (
            <Volume
              amount={value}
              currency={currency}
              reference={reference}
              merchantPaymentId={merchantPaymentId}
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
          {status === 'success' && !isLoading && data && (
            <PaymentSuccessScreen
              amount={value}
              recipientName={data?.recipientName || ''}
              currency={data?.sendCurrency || 'GBP'}
              markPageAsClean={markPageAsClean}
              merchantPaymentId={merchantPaymentId}
              transferType={transferType}
              onSuccess={onSuccess}
            />
          )}
          {status === 'success' && isLoading && <PaymentLoadingScreen />}
          {status === 'failed' && <PaymentFailedScreen />}
        </div>
        <div className="ss-space-y-6"></div>
      </DialogBody>
      <DialogFooter>
        <div className="ss-max-w-400 ss-mx-auto ss-flex ss-flex-col ss-gap-3 ss-mt-4">
          {status === 'pending' && (
            <>
              {/* <Button onClick={handleMadePaymentBtn} label="I've made this payment" isBlock /> */}
              <Button label="Cancel" onClick={handleClose} variant="tertiary" isBlock />
            </>
          )}
          {status === 'failed' && (
            <>
              <Button
                onClick={handleOtherPaymentMethods}
                label="Try other payment methods"
                isBlock
                variant="secondary"
              />
              <Button label="Cancel" onClick={handleClose} variant="tertiary" isBlock />
            </>
          )}
          {status === 'success' && (
            <>
              <ButtonLink
                to={`${Path.TransferHistory}?txref=${merchantPaymentId}`}
                label="Transaction details"
                variant="secondary"
                isBlock
              />
            </>
          )}
        </div>
      </DialogFooter>
    </Dialog>
  );
};

interface PaymentSuccessScreenProps {
  amount: number;
  currency: string;
  recipientName: string;
  transferType?: string;
  merchantPaymentId?: string;
  markPageAsClean?: () => void;
  onSuccess?: () => void;
}

const PaymentSuccessScreen = ({
  amount,
  currency,
  recipientName,
  markPageAsClean,
  merchantPaymentId,
  transferType,
  onSuccess
}: PaymentSuccessScreenProps) => {
  const navigate = useNavigate();

  const cleanUp = () => {
    if (markPageAsClean) {
      markPageAsClean();

      if (onSuccess) {
        onSuccess();
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (merchantPaymentId) {
      cleanUp();
      timer = setTimeout(() => {
        let queries = '';

        if (transferType && transferType === 'recurring') {
          queries = `?txRef=${merchantPaymentId}&paymentType=recurring`;
        } else if (transferType && transferType === 'gift') {
          queries = `?txRef=${merchantPaymentId}&paymentType=gift`;
        } else {
          queries = `?txRef=${merchantPaymentId}`;
        }

        navigate(`${Path.PaymentSuccess}${queries}`);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [transferType, merchantPaymentId]);

  return (
    <div className="ss-flex ss-flex-col ss-items-center ss-gap-5">
      <Icon
        className="ss-w-24 ss-h-24 ss-text-positive-80"
        size="100%"
        svg={CheckmarkCircle2Outline}
      />
      <Text variant="h3" className="ss-text-center">
        Your payment was successful
      </Text>
      <Text className="ss-text-center ss-max-w-500">
        Your transfer of{' '}
        <strong>
          {currency} {amount}
        </strong>{' '}
        has been initiated, it&apos;ll get to them in a few minutes.{' '}
      </Text>
    </div>
  );
};

const PaymentLoadingScreen = () => {
  return (
    <div className="ss-flex ss-flex-col ss-items-center ss-gap-5">
      <Icon className="ss-w-24 ss-h-24 ss-animate-spin" size="100%" svg={LoaderOutline} />
      <Text variant="h3" className="ss-text-center">
        Confirming payment
      </Text>
      <Text className="ss-text-center">Please hold on while we confirm your payment</Text>
    </div>
  );
};

const PaymentFailedScreen = () => {
  return (
    <div className="ss-flex ss-flex-col ss-items-center ss-gap-5">
      <Icon className="ss-w-24 ss-h-24 ss-text-error-500" size="100%" svg={CloseCircleOutline} />
      <Text variant="h4" className="ss-text-center">
        Your payment was unsuccessful
      </Text>
      <Text className="ss-text-center ss-max-w-500">
        Sorry, we were unable to process your payment. Please try again or use a different payment
        option.
      </Text>
    </div>
  );
};

export default VolumeModal;
export {
  PaymentLoadingScreen as VolumePaymentLoadingScreen,
  PaymentSuccessScreen as VolumePaymentSuccessScreen,
  PaymentFailedScreen as VolumePaymentFailedScreen
};
