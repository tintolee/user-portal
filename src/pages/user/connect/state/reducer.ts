/* eslint-disable no-unused-vars */
import { getMonetaryValue } from '@src/utils/currency';
import { isNumber } from '@src/utils/type';
import { StoreStepData } from '../components/storeStep';
import { State, StepIndex } from './types';

type DispatchData = Partial<State>;

enum DispatchType {
  SetCurrentIndex = 'SetCurrentIndex',
  SetCurrentStepDirtyState = 'SetCurrentStepDirtyState',
  SetDiscountValue = 'SetDiscountValue',
  SetVoucherData = 'SetVoucherData',
  SetPageDirtyState = 'SetPageDirtyState',
  SetPaymentMethods = 'SetPaymentMethods',
  StoreStepSuccess = 'StoreStepSuccess',
  GiftInformationStepSuccess = 'GiftInformationStepSuccess',
  YourAddressStepSuccess = 'YourAddressStepSuccess',
  UpdatePhoneNumberSuccess = 'UpdatePhoneNumberSuccess',
  RecipientStepSuccess = 'RecipientStepSuccess',
  StepHasInvalidData = 'StepHasInvalidData',
  ReEditStep = 'ReEditStep',
  LeaveStepDialogActive = 'LeaveStepDialogActive',
  LeaveStepDialogInactive = 'LeaveStepDialogInactive',
  ResetState = 'ResetState'
}

type DispatchAction = {
  type: DispatchType;
  data: DispatchData;
};

type StateReducer = (s: State, a: DispatchAction) => State;

const stateReducer: StateReducer = function (state, { type, data = {} }) {
  const dataHasProperty = (prop: keyof State): boolean => {
    return {}.hasOwnProperty.call(data, prop);
  };

  const setCurrentIndex = (oldState: State, data: DispatchData): State => {
    if (isNumber(data.currentIndex) && data.currentIndex <= oldState.maxActiveIndex) {
      return {
        ...oldState,
        currentIndex: data.currentIndex,
        isCurrentStepDirty: false,
        editMode: false
      };
    } else {
      return oldState;
    }
  };

  const setMaxActiveIndex = (oldState: State, data: DispatchData): State => {
    if (isNumber(data.maxActiveIndex)) {
      let updatedState = oldState;

      // currentIndex can never be larger than maxActiveIndex, so we update it here if needed
      if (updatedState.currentIndex > data.maxActiveIndex) {
        updatedState = setCurrentIndex(updatedState, {
          currentIndex: data.maxActiveIndex
        });
      }
      return { ...updatedState, maxActiveIndex: data.maxActiveIndex };
    } else {
      return oldState;
    }
  };

  const setMaxActiveIndexIfLarger = (oldState: State, data: DispatchData): State => {
    if (isNumber(data.maxActiveIndex) && data.maxActiveIndex > oldState.maxActiveIndex) {
      return setMaxActiveIndex(oldState, data);
    } else {
      return oldState;
    }
  };

  /** Clear the selectedRecipient field if it is invalid ie. old state & new state's amountFormData.recipientType don't match */
  // const clearSelectedRecipientIfInvalid = (oldState: State, data: DispatchData): State => {
  //   const a1 = oldState.amountFormData;
  //   const a2 = data.amountFormData;
  //   const isInvalid = a1 && a2 && a1.recipientType !== a2.recipientType;

  //   if (isInvalid) {
  //     return { ...oldState, selectedRecipient: undefined };
  //   }

  //   return oldState;
  // };

  /** Clear securityQuestion form dta if it is invalid i.e new amountFormData.recipientType isn't NG_CASH */
  // const clearSecurityQuestionIfInvalid = (oldState: State, data: DispatchData): State => {
  //   const recipientType = data.amountFormData?.recipientType;

  //   if (recipientType && recipientType !== ClientApi.RecipientType.NG_CASH) {
  //     return { ...oldState, securityQuestionFormData: undefined };
  //   }
  //   return oldState;
  // };

  /** Find the next 'navigate-able' step ie the next index which is currently visible */
  const findNextNavigableStepIndex = (state: State): StepIndex => {
    const { currentIndex, steps } = state;
    for (let i = currentIndex + 1; i < steps.length; i++) {
      if (steps[i].isVisible) {
        return i;
      }
    }
    return -1;
  };

  // this sets a step visibility to true or false based on the recipient type selected on the amount step form
  // this is set when the amount form is submitted
  // const updateStepsVisibleState = (oldState: State, data: DispatchData): State => {
  //   const securityQuestionIndex = oldState.stepsIndexMap.securityQuestion;
  //   const newState = { ...oldState };

  //   const recipientType = data.amountFormData?.recipientType;

  //   // this shows the security step if the recipient type is NG_CASH
  //   if (recipientType && recipientType === ClientApi.RecipientType.NG_CASH) {
  //     newState.steps[securityQuestionIndex].isVisible = true;
  //   }
  //   if (recipientType && recipientType !== ClientApi.RecipientType.NG_CASH) {
  //     newState.steps[securityQuestionIndex].isVisible = false;
  //   }
  //   return newState;
  // };

  const onStepSuccess = (oldState: State, data: DispatchData): State => {
    const maxActiveIndex = findNextNavigableStepIndex(oldState);
    let updatedState = setMaxActiveIndexIfLarger(oldState, { maxActiveIndex });

    if (isNumber(data.currentIndex)) {
      updatedState = setCurrentIndex(updatedState, data);
    } else {
      updatedState = setCurrentIndex(updatedState, {
        currentIndex: maxActiveIndex
      });
    }

    return updatedState;
  };

  switch (type) {
    case DispatchType.SetCurrentIndex:
      return setCurrentIndex(state, data);

    case DispatchType.SetCurrentStepDirtyState:
      return { ...state, isCurrentStepDirty: data.isCurrentStepDirty || false };

    case DispatchType.SetPageDirtyState:
      return { ...state, isPageDirty: data.isPageDirty || false };

    case DispatchType.SetPaymentMethods:
      return { ...state, paymentMethodData: data.paymentMethodData || [] };

    case DispatchType.SetDiscountValue:
      return { ...state, discount: data?.discount };

    case DispatchType.SetVoucherData:
      // eslint-disable-next-line no-case-declarations
      let paidAmount: number | undefined;
      // eslint-disable-next-line no-case-declarations
      // const amountFormData = {
      //   ...state.amountFormData,
      //   sendAmount: state.amountFormData?.sendAmount || 0
      // } as ChooseAmountFormData;

      // eslint-disable-next-line no-case-declarations
      const storeStepData = {
        ...state.storeFormData
      } as StoreStepData;

      if (storeStepData) {
        paidAmount =
          (state.storeFormData?.totalAmount || 0) +
          ((state.storeFormData?.fee || 0) - (data.voucher?.discount || 0));
      }

      return {
        ...state,
        storeFormData: {
          // ...state.storeFormData,
          cart: state.storeFormData?.cart,
          totalAmount: state.storeFormData?.totalAmount || 0,
          fee: state.storeFormData?.fee || 0,
          sender: state.storeFormData?.sender,
          recipient: state.storeFormData?.recipient,
          totalAmountPlusFee: paidAmount
            ? getMonetaryValue(paidAmount)
            : state.storeFormData?.totalAmountPlusFee || 0
        },
        // amountFormData: {
        //   ...amountFormData,
        //   totalAmount: paidAmount
        //     ? getMonetaryValue(paidAmount)
        //     : state.amountFormData?.totalAmount || 0
        // },
        voucher: data?.voucher
      };

    case DispatchType.StoreStepSuccess:
      if (data.storeFormData) {
        const updatedState = onStepSuccess(state, data);

        return {
          ...updatedState,
          storeFormData: data.storeFormData
        };
      } else {
        return state;
      }

    case DispatchType.GiftInformationStepSuccess:
      if (data.giftInformationData) {
        const updatedState = onStepSuccess(state, data);

        return {
          ...updatedState,
          giftInformationData: data.giftInformationData
        };
      } else {
        return state;
      }

    case DispatchType.YourAddressStepSuccess:
      if (data.addressFormData) {
        const updatedState = onStepSuccess(state, data);

        return {
          ...updatedState,
          addressFormData: data.addressFormData
        };
      } else {
        return state;
      }

    case DispatchType.UpdatePhoneNumberSuccess:
      if (data.addressFormData) {
        const updatedState = onStepSuccess(state, data);

        return {
          ...updatedState,
          addressFormData: data.addressFormData,
          updatePhoneNumberData: { phone: data.addressFormData.phone }
        };
      } else {
        return state;
      }

    case DispatchType.RecipientStepSuccess:
      if (data.selectedRecipient) {
        const updatedState = onStepSuccess(state, data);

        return {
          ...updatedState,
          selectedRecipient: data.selectedRecipient
        };
      } else {
        return state;
      }

    case DispatchType.StepHasInvalidData:
      // eslint-disable-next-line no-case-declarations
      let updatedState = setMaxActiveIndex(state, data);
      updatedState = setCurrentIndex(updatedState, data);

      // if (dataHasProperty('amountFormData')) {
      //   updatedState = {
      //     ...updatedState,
      //     amountFormData: data.amountFormData
      //   };
      // }
      if (dataHasProperty('selectedRecipient')) {
        updatedState = {
          ...updatedState,
          selectedRecipient: data.selectedRecipient
        };
      }
      return updatedState;

    case DispatchType.ReEditStep:
      if (isNumber(data.currentIndex)) {
        const updatedState = setCurrentIndex(state, data);
        return { ...updatedState, editMode: true };
      }
      return state;

    case DispatchType.LeaveStepDialogActive:
      if (isNumber(data.leavingStepDialogNextIndex)) {
        return {
          ...state,
          showLeavingStepDialog: true,
          leavingStepDialogNextIndex: data.leavingStepDialogNextIndex
        };
      }
      return state;

    case DispatchType.LeaveStepDialogInactive:
      return {
        ...state,
        leavingStepDialogNextIndex: -1,
        showLeavingStepDialog: false
      };

    case DispatchType.ResetState:
      return { ...data } as State;

    default:
      return state;
  }
};

export type { DispatchData, DispatchAction };
export { DispatchType };
export default stateReducer;
