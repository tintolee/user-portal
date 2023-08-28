import Api from '@sendsprint/api-types';
import { useAccount, useEnv, useMixpanel } from '@src/contexts';
import { useCallback, useEffect, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';
import { Path } from '@src/navigations/routes';

export type TransferType = 'recurring' | 'send money' | 'gift';

type ProcessPaymentProps = {
  amount: number;
  country: Api.Model.CountryInitials;
  currency: Api.Model.CurrencyCode;
  paymentType: Api.Model.PaymentType;
  transferType?: TransferType;
  txRef?: string;
  onSuccess: () => void;
  description?: string;
  isNethoneCheck?: boolean;
  markPageAsClean: () => void;
  paymentPlan?: string;
};

// eslint-disable-next-line no-unused-vars
const removeFlutterwaveModals = (shouldRemoveFn: (iframe: HTMLElement) => boolean) => {
  return () => {
    document.getElementsByName('checkout').forEach((iframe) => {
      if (shouldRemoveFn(iframe)) {
        (iframe.parentElement || document.body).removeChild(iframe);
      }
    });
  };
};

/**
 * Remove all the old modals (they usually don't have an id)
 */
const removeOldModals = removeFlutterwaveModals((iframe) => !iframe.id);
/**
 * Remove all modals
 */
const removeAllModals = removeFlutterwaveModals(() => true);

const ProcessPayment = ({
  amount,
  currency,
  country,
  paymentType,
  txRef = '',
  onSuccess,
  description = 'Send money with Sprint',
  isNethoneCheck,
  transferType,
  markPageAsClean,
  paymentPlan
}: ProcessPaymentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTxRef, setActiveTxRef] = useState('');
  const { user } = useAccount();
  const { FLUTTERWAVE_PUBLIC_KEY, APP_DEPLOY_URL } = useEnv();
  const { mixpanelInstance } = useMixpanel();
  const navigate = useNavigate();

  // const handlePayment = useFlutterwave({
  //   public_key: FLUTTERWAVE_PUBLIC_KEY,
  //   tx_ref: txRef,
  //   amount,
  //   currency,
  //   payment_options: "card",
  //   // @ts-ignore-next-line
  //   country,
  //   customer: {
  //     email: user?.email || "",
  //     name: user?.fullName || "",
  //     // @ts-ignore-next-line
  //     phone_number: "",
  //   },
  //   customizations: {
  //     title: "Sprint",
  //     description,
  //     logo: `${APP_DEPLOY_URL}/logo192.png`,
  //   },
  // });

  const handlePayment = useFlutterwave({
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: txRef,
    amount,
    currency,
    payment_options: '',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    country,
    customer: {
      email: user?.email || '',
      name: user?.fullName || '',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      phone_number: ''
    },
    paymentPlan,
    customizations: {
      title: 'Sprint',
      description,
      logo: `${APP_DEPLOY_URL}/logo192.png`
    }
  });

  const trackCanceledPayment = useCallback(() => {
    mixpanelInstance.track('Canceled Transfer', {
      Amount: amount,
      Currency: currency,
      'Sprint Transaction Ref': txRef,
      'Transfer Destination': paymentType
    });
  }, [mixpanelInstance, amount, currency, txRef, paymentType]);

  useEffect(
    function () {
      if (isOpen || !txRef || !isNethoneCheck || activeTxRef === txRef) {
        return;
      }

      handlePayment({
        callback(data) {
          if (data.status === 'successful') {
            markPageAsClean();
            setIsOpen(true);
            closePaymentModal();
            onSuccess();
          }
        },
        onClose() {
          removeOldModals();
          trackCanceledPayment();
        }
      });

      setActiveTxRef(txRef);
    },
    [handlePayment, isOpen, isNethoneCheck, txRef, activeTxRef, onSuccess, trackCanceledPayment]
  );

  useEffect(() => {
    return () => {
      removeAllModals();
    };
  }, []);

  useEffect(() => {
    if (isOpen && txRef) {
      markPageAsClean();

      let queries = '';

      if (transferType === 'recurring') {
        queries = `?txRef=${txRef}&paymentType=recurring`;
      } else if (transferType === 'gift') {
        queries = `?txRef=${txRef}&paymentType=gift`;
      } else {
        queries = `?txRef=${txRef}`;
      }

      setTimeout(() => {
        markPageAsClean();
        navigate(`${Path.PaymentSuccess}${queries}`);
      }, 1000);
    }
  }, [isOpen, txRef, transferType]);

  return null;
  // return <PaymentStatusDialog transferType={transferType} txRef={txRef} isOpen={isOpen} />;
};

export default ProcessPayment;
