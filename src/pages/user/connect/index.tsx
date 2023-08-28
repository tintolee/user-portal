import { Box } from '@sendsprint/ui-react';
import {
  AddressStep,
  LeavingStepDialog,
  ResolveVolumeStatus,
  RouteLeavingGuard
} from '@src/components/sendMoneyFlow/components';
import PhoneNumberUpdate from '@src/components/sendMoneyFlow/components/phoneNumberUpdate';
import { DashboardLayout } from '@src/layouts';
import ClientApi from '@src/types/client';
import React from 'react';
import {
  ConfirmPaymentStep,
  GiftInformation,
  GiftSummary,
  PageNav,
  RecipientStep,
  StoreStep,
  StoreSummary
} from './components';
import cs from 'classnames';
import { useMultiForm } from './state';
// import GetPaymentMethods from './components/confirmPaymentStep/confirmPaymentStepInner/paymentDropdownList/GetPaymentMethods';
import ModulrPrompt from '@src/components/modulrPrompt';
import GetPaymentMethods from '@src/components/paymentDropdownList/GetPaymentMethods';

const Connect = () => {
  const {
    state,
    giftInformationSuccessHandler,
    goToHandler,
    yourAddressSuccessHandler,
    updatePhoneNumberSuccessHandler,
    recipientStepSuccessHandler,
    storeSuccessHandler,
    loadVoucherSuccessHandler,
    reEditStepHandler,
    resetStateHandler,
    isLoggedIn,
    handlePaymentMethods,
    resetToSendIndexPage,
    markCurrentStepAsDirty,
    navigateToStep,
    closeLeavingStepDialog,
    markPageAsClean
  } = useMultiForm({
    pageViewName: 'Connect'
  });

  return (
    <DashboardLayout pageTitle="Connect">
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
        senderInitials={state.storeFormData?.sender?.initials || ''}
      />
      <Box onChange={markCurrentStepAsDirty} className="ss-flex ss-items-start ss-gap-8">
        <Box className="ss-flex-1">
          {state.currentIndex === state.stepsIndexMap.store && (
            <StoreStep
              formData={state.storeFormData}
              resetToSendIndexPage={resetToSendIndexPage}
              storeSuccessHandler={storeSuccessHandler}
              markPageAsClean={markPageAsClean}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.giftInformation && (
            <GiftInformation
              formData={state.giftInformationData}
              onSuccess={giftInformationSuccessHandler}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.address && (
            <AddressStep
              formData={state.addressFormData}
              onSubmitSuccess={yourAddressSuccessHandler}
              editMode={state.editMode}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.phoneNumberUpdate && (
            <PhoneNumberUpdate
              formData={state.updatePhoneNumberData}
              onSubmitSuccess={updatePhoneNumberSuccessHandler}
              editMode={state.editMode}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.recipient && (
            <RecipientStep
              state={state}
              recipientType={ClientApi.RecipientType.NG_DOM}
              onInvalidData={() => undefined}
              onSelectRecipient={recipientStepSuccessHandler}
              selectedRecipient={state.selectedRecipient}
            />
          )}
          {state.currentIndex === state.stepsIndexMap.payment && (
            <ConfirmPaymentStep
              onCancelTransfer={resetStateHandler}
              loadVoucherSuccessHandler={loadVoucherSuccessHandler}
              state={state}
              onReEditStep={reEditStepHandler}
              markPageAsClean={markPageAsClean}
            />
          )}
        </Box>
        <Box
          className={cs('ss-hidden ss-space-y-5', {
            'ss-w-350 xl:ss-block':
              state.currentIndex !== state.stepsIndexMap.payment &&
              state.currentIndex !== state.stepsIndexMap.store,
            'ss-hidden':
              state.currentIndex === state.stepsIndexMap.payment ||
              state.currentIndex === state.stepsIndexMap.store
          })}>
          <StoreSummary state={state} handleEdit={() => reEditStepHandler('store')} />
          <GiftSummary state={state} handleEdit={() => reEditStepHandler('giftInformation')} />
        </Box>
      </Box>
      <RouteLeavingGuard
        when={state.isPageDirty && isLoggedIn}
        dialogTitle="Leave page?"
        dialogContent="You are about to leave without sending gift(s) to your recipient. Are you sure you want to leave this page?"
        destructiveBtnLabel="Leave"
        nonDestructiveBtnLabel="Continue"
        markPageAsClean={markPageAsClean}
        resetToSendIndexPage={resetToSendIndexPage}
        isSendIndexPage={state.currentIndex === state.stepsIndexMap.store}
      />
      <LeavingStepDialog
        nextStep={state.leavingStepDialogNextIndex}
        handleDestructiveClick={navigateToStep}
        isOpen={state.showLeavingStepDialog}
        onDismiss={closeLeavingStepDialog}
      />
      <ResolveVolumeStatus />
      <ModulrPrompt variant="gift" markPageAsClean={markPageAsClean} />
    </DashboardLayout>
  );
};

export default Connect;
