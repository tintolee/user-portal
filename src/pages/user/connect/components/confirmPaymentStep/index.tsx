import React from 'react';
import { State, StepName } from '../../state';
import ConfirmPaymentStepInner from './confirmPaymentStepInner';
import { VoucherDataI } from './voucherSection';

export type EditableSteps = Exclude<StepName, 'confirmPayment'>;

export type ConfirmPaymentStepProps = {
  state: State;
  // eslint-disable-next-line no-unused-vars
  loadVoucherSuccessHandler: (voucher: VoucherDataI) => void;
  // eslint-disable-next-line no-unused-vars
  onReEditStep: (step: EditableSteps) => void;
  onCancelTransfer: () => void;
  markPageAsClean: () => void;
};

const ConfirmPaymentStep = ({
  state,
  loadVoucherSuccessHandler,
  onReEditStep,
  onCancelTransfer,
  markPageAsClean
}: ConfirmPaymentStepProps) => {
  return (
    <ConfirmPaymentStepInner
      onCancelTransfer={onCancelTransfer}
      onReEditStep={onReEditStep}
      loadVoucherSuccessHandler={loadVoucherSuccessHandler}
      state={state}
      markPageAsClean={markPageAsClean}
    />
  );
};

export default ConfirmPaymentStep;
