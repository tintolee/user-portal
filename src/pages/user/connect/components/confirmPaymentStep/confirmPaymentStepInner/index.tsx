import Api from '@sendsprint/api-types';
import { Box } from '@sendsprint/ui-react';
import { VeriffModal } from '@src/components';
import PaymentDropdownList, {
  PayBtnClickHandlerOptions,
  PaymentMethodI
} from '@src/components/paymentDropdownList';
import AddressSummary from '@src/components/sendMoneyFlow/components/confirmPaymentStep/addressSummary';
import { resolveChargeRoute } from '@src/components/sendMoneyFlow/components/confirmPaymentStep/confirmPaymentStepInner';
import ProcessPayment from '@src/components/paymentDropdownList/components/processPayment';
import RecipientSummary from '@src/components/sendMoneyFlow/components/confirmPaymentStep/recipientSummary';
import {
  useAccount,
  useConnect,
  useDashboardContext,
  useMixpanel,
  useNethone
} from '@src/contexts';
import { useCreateTransactionMutation } from '@src/hooks';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ConfirmPaymentStepProps, EditableSteps } from '..';
import { GiftSummary, StoreSummary } from '../../summary';
import VoucherSection from '../voucherSection';

type ConfirmPaymentStepInnerProps = Omit<
  ConfirmPaymentStepProps,
  'amountFormData' | 'selectedRecipient' | 'onInvalidData'
>;

export interface TransactionDataI {
  txref: string;
  amount: number;
}

// "DeliveryDate" : "7/8/2017 2:19 PM"
const formatDeliveryDate = (arg: Date) => {
  const year = arg.getFullYear();
  let month: string | number = arg.getMonth() + 1;
  let day: string | number = arg.getDate();

  let hour: string | number = arg.getHours();
  let minutes: string | number = arg.getMinutes();
  const period = hour > 12 ? 'PM' : 'AM';

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hour = hour < 12 ? hour : hour - 12;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${month}/${day}/${year} ${hour}:${minutes} ${period}`;
};

// TODO: make the payment reusable for all scenarios of payments like send money, connect etc
const ConfirmPaymentStepInner = ({
  state,
  loadVoucherSuccessHandler,
  onReEditStep,
  onCancelTransfer,
  markPageAsClean
}: ConfirmPaymentStepInnerProps) => {
  const { user } = useAccount();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modulrURL, setModularURL] = useState('');

  const queryClient = useQueryClient();
  // const [paymentPlan, setPaymentPlan] = useState<string | number>();
  const mutation = useCreateTransactionMutation();
  const { mixpanelInstance } = useMixpanel();
  const [showVeriffModal, setShowVeriffModal] = useState(false);
  const { isUserVerified } = useDashboardContext();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodI | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionDataI>({
    txref: '',
    amount: 0
  });
  const { handleClearCart } = useConnect();
  // const [isNethoneCheck, setIsNethoneCheck] = useState(false);

  const { isNethoneCheck, isNethoneFailed, handleSetNethoneTxref } = useNethone();

  useEffect(() => {
    if (isNethoneFailed) {
      setTransactionData({
        amount: 0,
        txref: ''
      });
    }
  }, [isNethoneFailed]);

  const onCancelBtnClickHandler = () => {
    onCancelTransfer();
    mixpanelInstance.track(mixpanelEvents.CancelTransfer);
  };

  const onSuccess = () => {
    mixpanelInstance.track(mixpanelEvents.CheckoutSuccess);
    handleClearCart();
  };

  const handleReEdit = (step: EditableSteps) => {
    onReEditStep(step);

    mixpanelInstance.track(mixpanelEvents.ReEditForm, {
      step: step
    });
  };

  const handleSubmit = useCallback(
    async (variant: PaymentMethodI, options?: PayBtnClickHandlerOptions | undefined) => {
      setTransactionData({
        amount: 0,
        txref: ''
      });

      setPaymentMethod(variant);
      setIsSubmitting(true);

      const selectedRep = state.selectedRecipient;

      const mappedCartData = state.storeFormData?.cart?.map((item) => {
        const newItem = {
          MerchantId: item.StoreId,
          TemplateId: 'C01F2C1C-19E1-4B37-943B-2F6651F48B42',
          EventName: state.giftInformationData?.purpose || '',
          Amount: item.Amount,
          Quantity: Number(item.Quantity) || 1,
          RecipientEmail: selectedRep?.email || '',
          RecipientPhone: selectedRep?.phoneNumber || '',
          RecipientFirstName: selectedRep?.firstName || '',
          RecipientLastName: selectedRep?.lastName || ''
        };

        return newItem;
      });

      const formattedDate = formatDeliveryDate(
        new Date(state.giftInformationData?.deliveryDate || '')
      );

      const wireFxPayload: ClientApi.Transactions.CreateTransaction.Request['wireFxRequest'] = {
        aba: options?.wireFxValues?.routingNumber || '',
        account: options?.wireFxValues?.accountNumber || '',
        type: options?.wireFxValues?.accountType || ''
      };

      const payload: ClientApi.Transactions.CreateTransaction.Request = {
        recipientId: state.selectedRecipient?.id || 0,
        amount: state.storeFormData?.totalAmountPlusFee || 0,
        sendCurrency: state.storeFormData?.sender?.currency || 'USD',
        receiveCurrency: state.storeFormData?.recipient?.Currency || 'NGN',
        securityQuestion: '',
        securityAnswer: '',
        gift: {
          DeliveryDate: formattedDate,
          OrderItemRequests: mappedCartData
        },
        chargeRoute: resolveChargeRoute(variant),
        wireFxRequest: variant === 'wirefx' ? wireFxPayload : undefined,
        PIN: options?.Pin || '',
        ModulrBank: options?.modulrValues?.id
      };

      try {
        if (isUserVerified) {
          mixpanelInstance.track(mixpanelEvents.TriggerCheckout);
          const transactionRefInfo = await mutation.mutateAsync(payload);
          if (transactionRefInfo.URL && variant === 'modulr') {
            // window.open(transactionRefInfo.URL);
            setModularURL(transactionRefInfo.URL);
          }

          setTransactionData({
            amount: state.storeFormData?.totalAmountPlusFee || 0,
            txref: transactionRefInfo.txRef
          });

          handleSetNethoneTxref(transactionRefInfo.txRef);

          mixpanelInstance.track(mixpanelEvents.InitiateConnectPayment);

          queryClient.invalidateQueries(['getTransactions']);
          setIsSubmitting(false);
          return true;
        } else {
          setIsSubmitting(false);
          setShowVeriffModal(true);
          return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setTransactionData({
          amount: 0,
          txref: ''
        });

        mixpanelInstance.track(mixpanelEvents.CheckoutFailed, {
          error: error?.ResponseMessage || 'Error occured'
        });

        setIsSubmitting(false);
        return false;
      }
    },
    [isUserVerified, user?.email]
  );

  return (
    <Box className="ss-flex xl:ss-flex-row ss-flex-col ss-items-start ss-gap-8">
      <Box className="ss-w-full xl:ss-flex-1 ss-space-y-5">
        <StoreSummary state={state} handleEdit={() => handleReEdit('store')} />
        <GiftSummary state={state} handleEdit={() => handleReEdit('giftInformation')} />
        <RecipientSummary
          selectedRecipient={state.selectedRecipient}
          handleEdit={() => handleReEdit('recipient')}
        />
        <AddressSummary
          addressState={state.addressFormData}
          handleEdit={() =>
            state.updatePhoneNumberData?.phone
              ? handleReEdit('phoneNumberUpdate')
              : handleReEdit('address')
          }
          phoneNumberState={state.updatePhoneNumberData}
        />
      </Box>
      <Box className="ss-w-full xl:ss-w-350 ss-space-y-5">
        <VoucherSection
          loadVoucherSuccessHandler={loadVoucherSuccessHandler}
          state={state}
          voucherData={state.voucher}
        />
        <PaymentDropdownList
          currency={state.storeFormData?.sender?.currency || ''}
          handlePayment={handleSubmit}
          isNethoneCheck={isNethoneCheck}
          isSubmitting={isSubmitting}
          paymentMethodData={state.paymentMethodData}
          value={state.storeFormData?.totalAmountPlusFee || 0}
          txRef={transactionData.txref}
          onCancelBtnClickHandler={onCancelBtnClickHandler}
          markPageAsClean={markPageAsClean}
          transferType={'gift'}
          onSuccess={onSuccess}
          selectedPaymentMethod={paymentMethod}
          modulrURL={modulrURL}
        />
      </Box>
      <VeriffModal state={showVeriffModal} handleClick={() => setShowVeriffModal(false)} />
      <ProcessPayment
        amount={getMonetaryValue(state.storeFormData?.totalAmountPlusFee || 0, {
          fractionDigits: 2
        })}
        country={
          state.storeFormData?.sender?.initials === Api.Model.CountryInitials.UnitedKingdom
            ? Api.Model.CountryInitials.Nigeria || 'NG'
            : state.storeFormData?.sender?.initials || Api.Model.CountryInitials.Canada
        }
        // country={amountFormData.sendCountry}
        transferType="gift"
        currency={state.storeFormData?.sender?.currency || ''}
        txRef={paymentMethod === 'flutterwave' ? transactionData.txref : undefined}
        paymentType={Api.Model.PaymentType.GiftCard}
        onSuccess={onSuccess}
        isNethoneCheck={isNethoneCheck}
        markPageAsClean={markPageAsClean}
      />
    </Box>
  );
};

export default ConfirmPaymentStepInner;
