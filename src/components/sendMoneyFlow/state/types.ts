import { PaymentMethodsI } from '@src/components/paymentDropdownList/GetPaymentMethods';
import ClientApi from '@src/types/client';
import { SetAddressFormData } from '../components/addressStep/addressStepForm';
import { ChooseAmountFormData } from '../components/amountStep';
// import { PaymentMethodsI } from '../components/confirmPaymentStep/paymentDropdownList/GetPaymentMethods';
import { VoucherDataI } from '../components/confirmPaymentStep/voucherSection';
import { UpdatePhoneNumberData } from '../components/phoneNumberUpdate';
import { TransferScheduleDataI } from '../components/scheduleStep/scheduleForm';
import { SecurityQuestionFormData } from '../components/securityQuestionStep/securityQuestionForm';

export type FormVariantsI = 'send money' | 'transfer schedule';

type StepIndex = number;

type StepName =
  | 'amount'
  | 'address'
  | 'updatePhoneNumber'
  | 'schedule'
  | 'recipient'
  | 'securityQuestion'
  | 'confirmPayment';

type StepType = {
  id: StepName;
  label: string;
  isVisible: boolean;
};

type State = {
  /** List of steps, it is used for the nav */
  steps: StepType[];

  /**
   * This is set to true when there are changes to the form on the current step. That way, we can put a notice to users
   * navigating to another step that changes on the current step will be lost.
   */
  isCurrentStepDirty: boolean;
  /**
   * This is similar to `isCurrentStepDirty` property but at the page level. We use this to show a prompt when a user
   * goes to another page or a refresh
   */
  isPageDirty: boolean;
  // Set to true when a user clicks on the edit button from the confirm payment step.
  editMode: boolean;
  stepsIndexMap: Record<StepName, StepIndex>;
  // currentIndex is the index of the current step. It cannot be higher than the maxActiveIndex
  currentIndex: StepIndex;
  // maxActiveIndex is the index of the highest step you can navigate to (or active).
  // It should, ideally, only be updated when the new value is larger
  maxActiveIndex: StepIndex;
  amountFormData?: ChooseAmountFormData;
  addressFormData?: SetAddressFormData;
  transferScheduleData?: TransferScheduleDataI;
  updatePhoneNumberData?: UpdatePhoneNumberData;
  selectedRecipient?: ClientApi.Recipient;
  securityQuestionFormData?: SecurityQuestionFormData;
  // Show the leaving step dialog
  showLeavingStepDialog: boolean;
  paymentMethodData?: PaymentMethodsI[];
  voucher?: VoucherDataI;
  // The next step index for the leaving step dialog
  leavingStepDialogNextIndex: StepIndex;
  discount?: number;
  /** Holds data that might be used to prefill (the ChooseAmount) form */
  prefillForm?: {
    sendToRecipient?: ClientApi.Recipient;
    sendFromWebsite?: ClientApi.SendFromWebsiteLocationState['sendFromWebsite'];
  };
};

export type { StepIndex, StepName, StepType, State };
