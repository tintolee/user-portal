import { PaymentMethodsI } from '@src/components/paymentDropdownList/GetPaymentMethods';
import { useMixpanel } from '@src/contexts';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import React, { useEffect } from 'react';
import { FormVariantsI, State, StepName } from '../../state/types';
import { ChooseAmountFormData } from '../amountStep';
import { TransferScheduleDataI } from '../scheduleStep/scheduleForm';
import { SecurityQuestionFormData } from '../securityQuestionStep/securityQuestionForm';
import ConfirmPaymentStepInner from './confirmPaymentStepInner';
import { VoucherDataI } from './voucherSection';

export type EditableSteps = Exclude<StepName, 'confirmPayment'>;

export type ConfirmPaymentStepProps = {
  amountFormData: undefined | ChooseAmountFormData;
  selectedRecipient: undefined | ClientApi.Recipient;
  securityQuestionFormData: undefined | SecurityQuestionFormData;
  transferScheduleData: undefined | TransferScheduleDataI;
  onInvalidData: () => void;
  // eslint-disable-next-line no-unused-vars
  onReEditStep: (step: EditableSteps) => void;
  onCancelTransfer: () => void;
  onPaymentSuccess: () => void;
  state: State;
  variant: FormVariantsI;
  // eslint-disable-next-line no-unused-vars
  loadVoucherSuccessHandler: (voucher: VoucherDataI) => void;
  paymentMethodData: PaymentMethodsI[] | undefined;
  markPageAsClean: () => void;
};

const ConfirmPaymentStep = ({
  amountFormData,
  selectedRecipient,
  onInvalidData,
  state,
  loadVoucherSuccessHandler,
  ...props
}: ConfirmPaymentStepProps) => {
  const isPropsInvalid =
    !amountFormData ||
    !selectedRecipient ||
    (amountFormData &&
      selectedRecipient &&
      amountFormData.recipientType !== selectedRecipient.type);
  const { mixpanelInstance } = useMixpanel();

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.ViewingConfirmPaymentStep);
  }, [mixpanelInstance]);

  useEffect(() => {
    if (isPropsInvalid) {
      onInvalidData();
    }
  }, [isPropsInvalid, onInvalidData]);

  if (!amountFormData || !selectedRecipient || isPropsInvalid) {
    return null;
  }

  return (
    <ConfirmPaymentStepInner
      amountFormData={amountFormData}
      selectedRecipient={selectedRecipient}
      state={state}
      loadVoucherSuccessHandler={loadVoucherSuccessHandler}
      {...props}
    />
  );
};

export default ConfirmPaymentStep;
