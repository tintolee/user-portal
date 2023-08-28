import Api from '@sendsprint/api-types';
import { PaymentMethodsI } from '@src/components/paymentDropdownList/GetPaymentMethods';
import { AddressStepProps } from '@src/components/sendMoneyFlow/components/addressStep';
import { RecipientStepProps } from '@src/components/sendMoneyFlow/components/recipientStep';
import { useAccount, useDashboardContext, useToasts } from '@src/contexts';
import { useAppLocation, useMixpanelLoadEvent } from '@src/hooks';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmPaymentStepProps } from '../components/confirmPaymentStep';
// import { PaymentMethodsI } from '../components/confirmPaymentStep/confirmPaymentStepInner/paymentDropdownList/GetPaymentMethods';
import { VoucherDataI } from '../components/confirmPaymentStep/voucherSection';
import { GiftInformationProps } from '../components/giftInformation';
import { PageNavProps } from '../components/pageNav';
import { StoreStepData } from '../components/storeStep';
import { getStepsInfo } from './getStepsInfo';
import stateReducer, { DispatchData, DispatchType } from './reducer';
import { State, StepIndex } from './types';

interface UseMultiFormOptions {
  pageViewName: string;
}

const useMultiForm = (options: UseMultiFormOptions) => {
  const { pageViewName } = options;

  const { userAddress, isLoggedIn } = useAccount();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useAppLocation();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { mixpanelInstance } = useMixpanelLoadEvent({
    pageViewName
  });

  const { handleClickFalse, isSendBtnClicked, isUserVerified } = useDashboardContext();

  const userHasAddress = !!userAddress;

  // this is the initial state
  const initialState = useMemo<State>(() => {
    const { steps, stepsIndexMap } = getStepsInfo({
      isAddressFilled: userHasAddress,
      isPhoneNumberUpdate: userHasAddress && !userAddress?.phone
    });

    let recipientFromQuery: ClientApi.Recipient | string = searchParams.get('recipientData') || '';

    if (recipientFromQuery) {
      recipientFromQuery = JSON.parse(recipientFromQuery) as ClientApi.Recipient;
    }

    return {
      steps,
      stepsIndexMap,
      currentIndex: stepsIndexMap.store,
      maxActiveIndex: stepsIndexMap.store,
      isCurrentStepDirty: false,
      isPageDirty: false,
      editMode: false,
      leavingStepDialogNextIndex: -1,
      showLeavingStepDialog: false,
      storeFormData: undefined,
      selectedRecipient:
        location.state?.selectedRecipient || (recipientFromQuery as ClientApi.Recipient),
      prefillForm: {
        sendToRecipient: location.state?.selectedRecipient,
        sendFromWebsite: location.state?.sendFromWebsite
      }
    };
  }, [userHasAddress, location.state, userAddress?.phone]);

  const [state, dispatch] = useReducer(stateReducer, initialState);

  /** Clear location state if we used any of it's values for state.prefillForm */
  useEffect(() => {
    if (location.state?.selectedRecipient || location.state?.sendFromWebsite) {
      navigate(location.pathname, {
        replace: true
      });
    }
  }, [history, location.state, location.pathname]);

  /**
   * Set the page as dirty when currentStep becomes dirty
   */
  useEffect(() => {
    if (state.isPageDirty || !state.isCurrentStepDirty) {
      return;
    }

    dispatch({
      type: DispatchType.SetPageDirtyState,
      data: { isPageDirty: true }
    });
  }, [state.isPageDirty, state.isCurrentStepDirty]);

  /**
   * add a `beforeunload` event listener when page is dirty
   */
  useEffect(() => {
    if (!state.isPageDirty) {
      return;
    }

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [state.isPageDirty]);

  // used to set isSendBtnClicked to false when it is on the amount page
  useEffect(() => {
    if (state.currentIndex === state.stepsIndexMap.store && isSendBtnClicked) {
      return handleClickFalse();
    }
  }, [handleClickFalse, isSendBtnClicked, state.currentIndex, state.stepsIndexMap.store]);

  const markCurrentStepAsDirty = () => {
    if (state.isCurrentStepDirty) {
      return;
    }

    dispatch({
      type: DispatchType.SetCurrentStepDirtyState,
      data: { isCurrentStepDirty: true }
    });
  };

  const markPageAsClean = () => {
    dispatch({
      type: DispatchType.SetPageDirtyState,
      data: { isPageDirty: false }
    });

    dispatch({
      type: DispatchType.SetCurrentStepDirtyState,
      data: { isCurrentStepDirty: false }
    });
  };

  /**
   * Navigate to the provided step index if possible
   * We don't check if the current step is dirty.
   */
  const navigateToStep = useCallback(
    (index: StepIndex) => {
      dispatch({
        type: DispatchType.SetCurrentIndex,
        data: { currentIndex: index }
      });

      const stepName = state.steps[index]?.id || '';
      mixpanelInstance.track(mixpanelEvents.SendMoneyTopNav, {
        'Nav item': stepName
      });
    },
    [mixpanelInstance, state.steps]
  );

  /**
   * Go to a step by it's index number. Currently used by PageNav to navigate between steps
   */
  const goToHandler: PageNavProps['goTo'] = useCallback(
    (id) => {
      if (state.currentIndex === id) {
        return;
      }

      if (state.isCurrentStepDirty) {
        dispatch({
          type: DispatchType.LeaveStepDialogActive,
          data: { leavingStepDialogNextIndex: id }
        });
        return;
      }

      navigateToStep(id);
    },
    [navigateToStep, state.currentIndex, state.isCurrentStepDirty]
  );

  const closeLeavingStepDialog = () => {
    dispatch({ type: DispatchType.LeaveStepDialogInactive, data: {} });
  };

  const handlePaymentMethods = (paymentMethodData: PaymentMethodsI[]) => {
    dispatch({
      type: DispatchType.SetPaymentMethods,
      data: { paymentMethodData }
    });
  };

  const storeSuccessHandler = (storeFormData: StoreStepData) => {
    dispatch({
      type: DispatchType.StoreStepSuccess,
      data: { storeFormData }
    });
  };

  /**
   * This handler is called when the address form submits it's data successfully.
   */
  const giftInformationSuccessHandler: GiftInformationProps['onSuccess'] = (
    giftInformationData
  ) => {
    dispatch({
      type: DispatchType.GiftInformationStepSuccess,
      data: { giftInformationData }
    });
  };

  /**
   * This handler is called when the address form submits it's data successfully.
   */
  const yourAddressSuccessHandler: AddressStepProps['onSubmitSuccess'] = (addressFormData) => {
    dispatch({
      type: DispatchType.YourAddressStepSuccess,
      data: { addressFormData }
    });

    addToast(
      {
        title: 'Address saved',
        body: 'Your address has been successfully saved.'
      },
      { appearance: 'success' }
    );
  };

  /**
   * This handler is called when the address form submits it's data successfully.
   */
  const updatePhoneNumberSuccessHandler: AddressStepProps['onSubmitSuccess'] = (
    addressFormData
  ) => {
    dispatch({
      type: DispatchType.UpdatePhoneNumberSuccess,
      data: { addressFormData }
    });

    addToast(
      {
        title: 'Phone number saved',
        body: 'Your phone number has been successfully saved.'
      },
      { appearance: 'success' }
    );
  };

  /**
   * This handler is called when the recipient is selected / new recipient info is saved
   */
  const recipientStepSuccessHandler: RecipientStepProps['onSelectRecipient'] = (
    selectedRecipient,
    fromForm
  ) => {
    const data: DispatchData = { selectedRecipient };
    if (state.editMode) {
      data.currentIndex = state.stepsIndexMap.payment;
    }
    markPageAsClean();

    dispatch({
      type: DispatchType.RecipientStepSuccess,
      data
    });

    if (searchParams.get('recipientData')) {
      setTimeout(() => {
        searchParams.delete('recipientData');
        setSearchParams(searchParams);
      }, 500);
    }

    mixpanelInstance.track(mixpanelEvents.CompleteRecipientStep, {
      'New recipient': fromForm
    });

    if (fromForm && selectedRecipient.status === Api.Model.Status.Saved) {
      addToast(
        {
          title: 'Recipient details saved',
          body: 'Your recipient has been saved and added to the payment'
        },
        { appearance: 'success' }
      );
    }
  };

  const recipientStepInvalidDataHandler: RecipientStepProps['onInvalidData'] = () => {
    const maxActiveIndex = state.currentIndex - 1;
    const currentIndex = state.stepsIndexMap.store;
    const selectedRecipient = undefined;

    dispatch({
      type: DispatchType.StepHasInvalidData,
      data: { currentIndex, maxActiveIndex, selectedRecipient }
    });
  };

  // const confirmStepInvalidDataHandler: ConfirmPaymentStepProps['onInvalidData'] = () => {
  //   const maxActiveIndex = state.stepsIndexMap.recipient;
  //   const currentIndex = maxActiveIndex;
  //   const selectedRecipient = undefined;

  //   dispatch({
  //     type: DispatchType.StepHasInvalidData,
  //     data: { currentIndex, maxActiveIndex, selectedRecipient }
  //   });
  // };

  const reEditStepHandler: ConfirmPaymentStepProps['onReEditStep'] = (step) => {
    dispatch({
      type: DispatchType.ReEditStep,
      data: { currentIndex: state.stepsIndexMap[step] as number }
    });
  };

  const resetStateHandler: ConfirmPaymentStepProps['onCancelTransfer'] = useCallback(() => {
    dispatch({
      type: DispatchType.ResetState,
      data: initialState
    });
  }, [initialState]);

  const resetToSendIndexPage = useCallback(() => {
    resetStateHandler();
    goToHandler(state.stepsIndexMap.store);
  }, [goToHandler, resetStateHandler, state.stepsIndexMap.store]);

  const loadVoucherSuccessHandler = (voucher: VoucherDataI) => {
    dispatch({
      type: DispatchType.SetVoucherData,
      data: { voucher }
    });

    dispatch({
      type: DispatchType.SetCurrentStepDirtyState,
      data: { isCurrentStepDirty: false }
    });
  };

  return {
    state,
    dispatch,
    navigateToStep,
    markCurrentStepAsDirty,
    giftInformationSuccessHandler,
    yourAddressSuccessHandler,
    recipientStepSuccessHandler,
    recipientStepInvalidDataHandler,
    updatePhoneNumberSuccessHandler,
    markPageAsClean,
    isLoggedIn,
    closeLeavingStepDialog,
    isUserVerified,
    goToHandler,
    storeSuccessHandler,
    loadVoucherSuccessHandler,
    reEditStepHandler,
    resetStateHandler,
    handlePaymentMethods,
    resetToSendIndexPage
  };
};

export default useMultiForm;
