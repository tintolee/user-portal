import { FormVariantsI, State, StepIndex, StepName, StepType } from './types';

interface GetStepsInfoOptions {
  isAddressFilled: boolean;
  isPhoneNumberUpdate: boolean;
  variant: FormVariantsI;
}

export const getStepsInfo = (
  options: GetStepsInfoOptions
): Pick<State, 'steps' | 'stepsIndexMap'> => {
  const { isAddressFilled, isPhoneNumberUpdate, variant } = options;

  let steps: StepType[] = [];

  if (variant === 'send money') {
    steps = [
      { label: 'Amount', id: 'amount', isVisible: true },
      {
        label: 'Your details',
        id: 'address',
        // isVisible: true
        isVisible: !isAddressFilled
      },
      {
        label: 'Your details',
        id: 'updatePhoneNumber',
        // isVisible: true
        isVisible: isPhoneNumberUpdate
      },
      {
        label: "Recipient's Details",
        id: 'recipient',
        isVisible: true
      },
      {
        label: 'Security Question',
        id: 'securityQuestion',
        isVisible: false
      },
      {
        label: 'Confirm payment',
        id: 'confirmPayment',
        isVisible: true
      }
    ];
  }

  if (variant === 'transfer schedule') {
    steps = [
      { label: 'Schedule', id: 'schedule', isVisible: true },
      { label: 'Amount', id: 'amount', isVisible: true },
      {
        label: 'Your details',
        id: 'address',
        // isVisible: true
        isVisible: !isAddressFilled
      },
      {
        label: 'Your details',
        id: 'updatePhoneNumber',
        // isVisible: true
        isVisible: isPhoneNumberUpdate
      },
      // {
      //   label: 'Transfer Schedule',
      //   id: 'schedule',
      //   isVisible: true
      // },
      {
        label: "Recipient's Details",
        id: 'recipient',
        isVisible: true
      },
      {
        label: 'Security Question',
        id: 'securityQuestion',
        isVisible: false
      },
      {
        label: 'Confirm payment',
        id: 'confirmPayment',
        isVisible: true
      }
    ];
  }

  // function to return the step index
  const findIndexById = (id: StepName): StepIndex => {
    return steps.findIndex((item) => item.id === id);
  };

  // this is an object with the stepname as key and its index as value
  const stepsIndexMap: Record<StepName, StepIndex> = {
    amount: findIndexById('amount'),
    address: findIndexById('address'),
    updatePhoneNumber: findIndexById('updatePhoneNumber'),
    schedule: findIndexById('schedule'),
    recipient: findIndexById('recipient'),
    securityQuestion: findIndexById('securityQuestion'),
    confirmPayment: findIndexById('confirmPayment')
  };

  return { steps, stepsIndexMap };
};
