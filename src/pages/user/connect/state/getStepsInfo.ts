import { State, StepIndex, StepName, StepType } from './types';

interface GetStepsInfoOptions {
  isAddressFilled: boolean;
  isPhoneNumberUpdate: boolean;
}

export const getStepsInfo = (
  options: GetStepsInfoOptions
): Pick<State, 'steps' | 'stepsIndexMap'> => {
  const { isAddressFilled, isPhoneNumberUpdate } = options;

  const steps: StepType[] = [
    { label: 'Store', id: 'store', isVisible: true },
    { label: 'Gift information', id: 'giftInformation', isVisible: true },
    {
      label: 'Your details',
      id: 'address',
      // isVisible: true
      isVisible: !isAddressFilled
    },
    {
      label: 'Your details',
      id: 'phoneNumberUpdate',
      // isVisible: true
      isVisible: isPhoneNumberUpdate
    },
    {
      label: "Recipient's Details",
      id: 'recipient',
      isVisible: true
    },
    {
      label: 'Confirm payment',
      id: 'payment',
      isVisible: true
    }
  ];

  // function to return the step index
  const findIndexById = (id: StepName): StepIndex => {
    return steps.findIndex((item) => item.id === id);
  };

  // this is an object with the stepname as key and its index as value
  const stepsIndexMap: Record<StepName, StepIndex> = {
    store: findIndexById('store'),
    address: findIndexById('address'),
    phoneNumberUpdate: findIndexById('phoneNumberUpdate'),
    giftInformation: findIndexById('giftInformation'),
    recipient: findIndexById('recipient'),
    payment: findIndexById('payment')
  };

  return { steps, stepsIndexMap };
};
