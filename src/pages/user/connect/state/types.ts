import { PaymentMethodsI } from '@src/components/paymentDropdownList/GetPaymentMethods';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import { UpdatePhoneNumberData } from '@src/components/sendMoneyFlow/components/phoneNumberUpdate';
import ClientApi from '@src/types/client';
// import { PaymentMethodsI } from '../components/confirmPaymentStep/confirmPaymentStepInner/paymentDropdownList/GetPaymentMethods';
import { VoucherDataI } from '../components/confirmPaymentStep/voucherSection';
import { GiftInformationData } from '../components/giftInformation';
import { StoreStepData } from '../components/storeStep';

export type FormVariantsI = 'send money' | 'transfer schedule';

type StepIndex = number;

type StepName =
  | 'store'
  | 'giftInformation'
  | 'address'
  | 'phoneNumberUpdate'
  | 'recipient'
  | 'payment';

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
  storeFormData?: StoreStepData;
  addressFormData?: SetAddressFormData;
  updatePhoneNumberData?: UpdatePhoneNumberData;
  giftInformationData?: GiftInformationData;
  selectedRecipient?: ClientApi.Recipient;
  voucher?: VoucherDataI;
  paymentMethodData?: PaymentMethodsI[];
  // Show the leaving step dialog
  showLeavingStepDialog: boolean;
  // The next step index for the leaving step dialog
  leavingStepDialogNextIndex: StepIndex;
  discount?: number;
  /** Holds data that might be used to prefill (the ChooseAmount) form */
  prefillForm?: {
    sendToRecipient?: ClientApi.Recipient;
    sendFromWebsite?: ClientApi.SendFromWebsiteLocationState['sendFromWebsite'];
    connectFromWebsite?: Partial<StoreStepData>;
  };
};

export type { StepIndex, StepName, StepType, State };
