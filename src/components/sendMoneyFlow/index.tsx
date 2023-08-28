import { Box } from '@sendsprint/ui-react';
import { DashboardLayout } from '@src/layouts';
import React from 'react';
import cs from 'classnames';
import {
  AddressStep,
  AmountStep,
  ConfirmPaymentStep,
  LeavingStepDialog,
  PageNav,
  RecipientStep,
  ResolveVolumeStatus,
  RouteLeavingGuard,
  ScheduleStep,
  SecurityQuestionStep,
  TransferInformation
} from './components';
import PhoneNumberUpdate from './components/phoneNumberUpdate';
import useMultiForm from './state/useMultiForm';
// import GetPaymentMethods from './components/confirmPaymentStep/paymentDropdownList/GetPaymentMethods';
import ScheduleSummary from './components/confirmPaymentStep/scheduleSummary';
import { FormVariantsI } from './state';
import ModulrPrompt from '../modulrPrompt';
import GetPaymentMethods from '../paymentDropdownList/GetPaymentMethods';

interface Props {
  variant?: FormVariantsI;
}

const SendMoneyFlow = ({ variant = 'send money' }: Props) => {
  const pageViewName = variant === 'transfer schedule' ? 'Add Scheduled Transfer' : 'Send Money';

  const {
    state,
    markCurrentStepAsDirty,
    amountStepSuccessHandler,
    goToHandler,
    recipientStepSuccessHandler,
    recipientStepInvalidDataHandler,
    yourAddressSuccessHandler,
    updatePhoneNumberSuccessHandler,
    securityQuestionStepSuccessHandler,
    confirmStepInvalidDataHandler,
    reEditStepHandler,
    resetStateHandler,
    markPageAsClean,
    loadVoucherSuccessHandler,
    handlePaymentMethods,
    resetToSendIndexPage,
    isLoggedIn,
    navigateToStep,
    closeLeavingStepDialog,
    TransferScheduleSuccessHandler,
    markPageAllAsClean
  } = useMultiForm({
    variant,
    pageViewName
  });

  return (
    <DashboardLayout pageTitle={pageViewName}>
      <Box className="ss-mb-5">
        <PageNav
          steps={state.steps}
          currentIndex={state.currentIndex}
          maxActiveIndex={state.maxActiveIndex}
          goTo={goToHandler}
        />
      </Box>
      <GetPaymentMethods
        handlePaymentMethods={handlePaymentMethods}
        senderInitials={state.amountFormData?.sendCountry || ''}
      />
      <Box onChange={markCurrentStepAsDirty} className="ss-flex ss-items-start ss-gap-8">
        <Box className="ss-flex-1">
          {variant === 'transfer schedule' &&
            state.currentIndex === state.stepsIndexMap.schedule && (
              <ScheduleStep
                formData={state.transferScheduleData}
                onSubmitSuccess={TransferScheduleSuccessHandler}
              />
            )}
          {state.currentIndex === state.stepsIndexMap.amount && (
            <AmountStep
              state={state}
              formData={state.amountFormData}
              prefillFormData={state.prefillForm}
              onStepIsDirty={markCurrentStepAsDirty}
              onSubmitSuccess={amountStepSuccessHandler}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.address && (
            <AddressStep
              formData={state.addressFormData}
              onSubmitSuccess={yourAddressSuccessHandler}
              editMode={state.editMode}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.updatePhoneNumber && (
            <PhoneNumberUpdate
              formData={state.updatePhoneNumberData}
              onSubmitSuccess={updatePhoneNumberSuccessHandler}
              editMode={state.editMode}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.recipient && (
            <RecipientStep
              recipientType={state?.amountFormData?.recipientType}
              selectedRecipient={state.selectedRecipient}
              onSelectRecipient={recipientStepSuccessHandler}
              onInvalidData={recipientStepInvalidDataHandler}
              editMode={state.editMode}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.securityQuestion && (
            <SecurityQuestionStep
              formData={state.securityQuestionFormData}
              onSuccess={securityQuestionStepSuccessHandler}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.confirmPayment && (
            <ConfirmPaymentStep
              amountFormData={state.amountFormData}
              selectedRecipient={state.selectedRecipient}
              securityQuestionFormData={state.securityQuestionFormData}
              transferScheduleData={state.transferScheduleData}
              onInvalidData={confirmStepInvalidDataHandler}
              onReEditStep={reEditStepHandler}
              onCancelTransfer={resetStateHandler}
              onPaymentSuccess={markPageAsClean}
              state={state}
              loadVoucherSuccessHandler={loadVoucherSuccessHandler}
              paymentMethodData={state.paymentMethodData}
              variant={variant}
              markPageAsClean={markPageAllAsClean}
            />
          )}
        </Box>
        <Box
          className={cs('ss-hidden ss-space-y-5', {
            'ss-w-350 xl:ss-block':
              state.currentIndex !== state.stepsIndexMap.confirmPayment &&
              state.currentIndex !== state.stepsIndexMap.schedule,
            'ss-hidden':
              state.currentIndex === state.stepsIndexMap.confirmPayment ||
              state.currentIndex === state.stepsIndexMap.schedule
          })}>
          {variant === 'transfer schedule' && (
            <ScheduleSummary
              transferScheduleData={state.transferScheduleData}
              handleEdit={() => reEditStepHandler('schedule')}
            />
          )}
          <TransferInformation state={state} handleEdit={() => reEditStepHandler('amount')} />
        </Box>
      </Box>
      <RouteLeavingGuard
        when={state.isPageDirty && isLoggedIn}
        dialogTitle="Leave page?"
        dialogContent="You are about to leave without sending money to your recipient. Are you sure you want to leave this page?"
        destructiveBtnLabel="Leave"
        nonDestructiveBtnLabel="Continue"
        resetToSendIndexPage={resetToSendIndexPage}
        markPageAsClean={markPageAsClean}
        isSendIndexPage={state.currentIndex === state.stepsIndexMap.amount}
      />
      <LeavingStepDialog
        nextStep={state.leavingStepDialogNextIndex}
        handleDestructiveClick={navigateToStep}
        isOpen={state.showLeavingStepDialog}
        onDismiss={closeLeavingStepDialog}
      />
      <ResolveVolumeStatus />
      <ModulrPrompt markPageAsClean={markPageAllAsClean} />
    </DashboardLayout>
  );
};

export default SendMoneyFlow;
