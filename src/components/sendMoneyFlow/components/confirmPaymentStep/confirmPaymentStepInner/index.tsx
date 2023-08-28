import Api from '@sendsprint/api-types';
import { Box } from '@sendsprint/ui-react';
import PaymentDropdownList, {
  PayBtnClickHandlerOptions,
  PaymentMethodI
} from '@src/components/paymentDropdownList';
import VeriffModal from '@src/components/veriffModal';
import { useDashboardContext, useMixpanel, useNethone } from '@src/contexts';
import { useCreateTransactionMutation } from '@src/hooks';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ConfirmPaymentStepProps, EditableSteps } from '..';
import { TransferScheduleDataI } from '../../scheduleStep/scheduleForm';
import TransferInformation from '../../transferInformation';
import AddressSummary from '../addressSummary';
import ProcessPayment from '../../../../paymentDropdownList/components/processPayment';
import RecipientSummary from '../recipientSummary';
import ScheduleSummary from '../scheduleSummary';
import SecurityQuestionSummary from '../securityQuestionSummary';
import VoucherSection from '../voucherSection';

type ConfirmPaymentStepInnerProps = {
  amountFormData: NonNullable<ConfirmPaymentStepProps['amountFormData']>;
  selectedRecipient: NonNullable<ConfirmPaymentStepProps['selectedRecipient']>;
} & Omit<ConfirmPaymentStepProps, 'amountFormData' | 'selectedRecipient' | 'onInvalidData'>;

const transferScheduleDataUpdate = (
  transferScheduleData: TransferScheduleDataI | undefined
): TransferScheduleDataI | undefined => {
  if (!transferScheduleData) return;

  return {
    duration: (Number(transferScheduleData?.duration) - 1).toString(),
    transferType: transferScheduleData?.transferType || '',
    interval: transferScheduleData?.interval || '',
    name: transferScheduleData?.name || ''
  };
};

export const resolveChargeRoute = (variant: PaymentMethodI) => {
  if (variant === 'volume') return 'VolumePay';
  if (variant === 'modulr') return 'Modulr';
  if (variant === 'wirefx') return 'WireFX';

  return 'Flutterwave';
};

// TODO: make the payment reusable for all scenarios of payments like send money, connect etc
const ConfirmPaymentStepInner = ({
  amountFormData,
  selectedRecipient,
  transferScheduleData,
  securityQuestionFormData,
  onReEditStep,
  onCancelTransfer,
  onPaymentSuccess,
  state,
  loadVoucherSuccessHandler,
  variant,
  markPageAsClean,
  paymentMethodData
}: ConfirmPaymentStepInnerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txRef, setTxRef] = useState<string>();
  const [paymentPlan, setPaymentPlan] = useState<string>();
  const [modulrURL, setModularURL] = useState('');
  const queryClient = useQueryClient();

  const mutation = useCreateTransactionMutation();
  const { mixpanelInstance } = useMixpanel();
  const [showVeriffModal, setShowVeriffModal] = useState(false);
  const { isUserVerified } = useDashboardContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodI | null>(null);

  const { handleSetNethoneTxref, isNethoneCheck, isNethoneFailed } = useNethone();

  useEffect(() => {
    if (isNethoneFailed) {
      setTxRef('');
    }
  }, [isNethoneFailed]);

  const onCancelBtnClickHandler = () => {
    onCancelTransfer();
    mixpanelInstance.track(mixpanelEvents.CancelTransfer);
  };

  const payBtnClickHandler = async (
    variant: PaymentMethodI,
    options?: PayBtnClickHandlerOptions
  ) => {
    setSelectedPaymentMethod(variant);
    setTxRef('');
    setIsSubmitting(true);
    setPaymentPlan('');

    const {
      sendCurrency,
      receiveCurrency,
      sendAmount,
      receiveAmount,
      totalAmount,
      receiveCountry,
      rate
    } = amountFormData;
    const {
      id: recipientId,
      fullName,
      email,
      phoneNumber,
      accountNumber,
      bankCode
    } = selectedRecipient;

    const wireFxPayload: ClientApi.Transactions.CreateTransaction.Request['wireFxRequest'] = {
      aba: options?.wireFxValues?.routingNumber || '',
      account: options?.wireFxValues?.accountNumber || '',
      type: options?.wireFxValues?.accountType || ''
    };

    mixpanelInstance.track(mixpanelEvents.TriggerTransfer);

    // add schedule details later here
    try {
      const transactionRefInfo = await mutation.mutateAsync({
        sendCurrency,
        receiveCurrency,
        amount: sendAmount,
        securityQuestion: securityQuestionFormData?.question || '',
        securityAnswer: securityQuestionFormData?.answer || '',
        recipientId,
        chargeRoute: resolveChargeRoute(variant),
        transferScheduleData: transferScheduleDataUpdate(transferScheduleData),
        wireFxRequest: variant === 'wirefx' ? wireFxPayload : undefined,
        PIN: options?.Pin || '',
        ModulrBank: options?.modulrValues?.id,
        Voucher: state.voucher?.code
      });
      setTxRef(transactionRefInfo.txRef);
      handleSetNethoneTxref(transactionRefInfo.txRef);

      if (transactionRefInfo.payment_plan) {
        setPaymentPlan(transactionRefInfo.payment_plan.toString());
      }

      if (transactionRefInfo.URL && variant === 'modulr') {
        // window.open(transactionRefInfo.URL);
        setModularURL(transactionRefInfo.URL);
      }

      queryClient.invalidateQueries(['getTransactions']);
      mixpanelInstance.track(mixpanelEvents.InitiatePayment, {
        payload: {
          'Sending currency': sendCurrency,
          'Beneficiary currency': receiveCurrency,
          'Sending amount': totalAmount,
          'Beneficiary amount': receiveAmount,
          'Transfer destination': receiveCountry,
          'Beneficiary name': fullName,
          'Beneficiary email address': email,
          'Beneficiary phone number': phoneNumber,
          'Beneficiary account number': accountNumber,
          'Beneficiary Bank/Momo name': bankCode,
          'Transaction ref': txRef,
          'Processing fee': rate.fee
        }
      });

      setIsSubmitting(false);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      mixpanelInstance.track(mixpanelEvents.TransferFailed, {
        error: e?.ResponseMessage || 'Error occured'
      });

      setIsSubmitting(false);
      return false;
    }
  };

  const paymentSuccessHandler: ConfirmPaymentStepProps['onPaymentSuccess'] = () => {
    const { sendCurrency, receiveCurrency, receiveAmount, totalAmount, receiveCountry, rate } =
      amountFormData;
    const { fullName, email, phoneNumber, accountNumber, bankCode } = selectedRecipient;

    mixpanelInstance.track(mixpanelEvents.PaymentSuccessful, {
      payload: {
        'Sending currency': sendCurrency,
        'Beneficiary currency': receiveCurrency,
        'Sending amount': totalAmount,
        'Beneficiary amount': receiveAmount,
        'Transfer destination': receiveCountry,
        'Beneficiary name': fullName,
        'Beneficiary email address': email,
        'Beneficiary phone number': phoneNumber,
        'Beneficiary account number': accountNumber,
        'Beneficiary Bank/Momo name': bankCode,
        'Transaction ref': txRef,
        'Processing fee': rate.fee
      }
    });
    mixpanelInstance.people.increment(`Lifetime revenue ${sendCurrency}`, totalAmount);

    onPaymentSuccess();
  };

  const handlePayment = (variant: PaymentMethodI, options?: PayBtnClickHandlerOptions) => {
    if (!isUserVerified) {
      return setShowVeriffModal(true);
    }

    return payBtnClickHandler(variant, options);
  };

  const handleReEdit = (step: EditableSteps) => {
    onReEditStep(step);

    mixpanelInstance.track(mixpanelEvents.ReEditForm, {
      step: step
    });
  };

  return (
    <Box className="ss-flex xl:ss-flex-row ss-flex-col ss-items-start ss-gap-8">
      <Box className="ss-w-full xl:ss-flex-1 ss-space-y-5">
        <TransferInformation state={state} handleEdit={() => handleReEdit('amount')} />
        {variant === 'transfer schedule' && (
          <ScheduleSummary
            transferScheduleData={state.transferScheduleData}
            handleEdit={() => handleReEdit('schedule')}
          />
        )}
        <RecipientSummary
          selectedRecipient={state.selectedRecipient}
          handleEdit={() => handleReEdit('recipient')}
        />
        <AddressSummary
          addressState={state.addressFormData}
          phoneNumberState={state.updatePhoneNumberData}
          handleEdit={() =>
            state.updatePhoneNumberData?.phone
              ? handleReEdit('updatePhoneNumber')
              : handleReEdit('address')
          }
        />
        <SecurityQuestionSummary
          handleEdit={() => handleReEdit('securityQuestion')}
          securityQuestionState={state.securityQuestionFormData}
        />
      </Box>
      <Box className="ss-w-full xl:ss-w-350 ss-space-y-5">
        <VoucherSection
          loadVoucherSuccessHandler={loadVoucherSuccessHandler}
          amountFormData={amountFormData}
          voucherData={state.voucher}
        />
        <PaymentDropdownList
          currency={amountFormData.sendCurrency}
          handlePayment={handlePayment}
          isNethoneCheck={isNethoneCheck}
          isSubmitting={isSubmitting}
          paymentMethodData={paymentMethodData}
          value={amountFormData.totalAmount}
          txRef={txRef}
          modulrURL={modulrURL}
          onCancelBtnClickHandler={onCancelBtnClickHandler}
          markPageAsClean={markPageAsClean}
          selectedPaymentMethod={selectedPaymentMethod}
          transferType={transferScheduleData?.transferType || ''}
        />
      </Box>
      <VeriffModal state={showVeriffModal} handleClick={() => setShowVeriffModal(false)} />
      <ProcessPayment
        amount={amountFormData.totalAmount}
        country={
          amountFormData.sendCountry === Api.Model.CountryInitials.UnitedKingdom
            ? Api.Model.CountryInitials.Nigeria || 'NG'
            : amountFormData.sendCountry
        }
        // country={amountFormData.sendCountry}
        currency={amountFormData.sendCurrency}
        transferType={state.transferScheduleData ? 'recurring' : 'send money'}
        txRef={selectedPaymentMethod === 'flutterwave' ? txRef : undefined}
        paymentType={selectedRecipient.paymentType}
        onSuccess={paymentSuccessHandler}
        isNethoneCheck={isNethoneCheck}
        markPageAsClean={markPageAsClean}
        paymentPlan={paymentPlan}
      />
    </Box>
  );
};

export default ConfirmPaymentStepInner;
