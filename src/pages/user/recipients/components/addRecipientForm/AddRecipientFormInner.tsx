import ClientApi from '@src/types/client';
import { FormSteps } from '.';
import { useAddRecipientFormInner } from '../../hooks';
import AccountInfo from './accountInfo';
import RecipientInfo from './recipientInfo';
import Stepper from './stepper';
import SuccessScreen from './successScreen';
import TransferInfo, { TransferInfoProps } from './transferInfo';

type AddRecipientFormInnerProps = {
  currentStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  handleStepClick: (arg: FormSteps) => void;
  enteredSteps: FormSteps[];
  handleResetEnteredSteps: () => void;
  addRecipientLoading: boolean;
  handleClose: () => void;
  recipientAdded: ClientApi.Recipient | null | undefined;
} & Omit<TransferInfoProps, 'getPaymentTypesLoading' | 'paymentTypesData' | 'isWithoutAccountInfo'>;

const AddRecipientFormInner = ({
  currentStep,
  handleToggleStep,
  receiveCountries,
  receiveCountriesLoading,
  handleStepClick,
  enteredSteps,
  handleResetEnteredSteps,
  addRecipientLoading,
  handleClose,
  recipientAdded
}: AddRecipientFormInnerProps) => {
  const {
    areBanksLoading,
    bankBranches,
    bankBranchesLoading,
    fieldsData,
    getPaymentTypesLoading,
    isWithoutAccountInfo,
    paymentTypesData,
    resolveBankLoading,
    resolvedBanks
  } = useAddRecipientFormInner({ handleResetEnteredSteps });

  return (
    <>
      {currentStep !== 4 && (
        <Stepper
          currentStep={currentStep}
          enteredSteps={enteredSteps}
          handleStepClick={handleStepClick}
          isWithoutAccountInfo={isWithoutAccountInfo}
        />
      )}
      {currentStep === 1 && (
        <TransferInfo
          receiveCountries={receiveCountries}
          receiveCountriesLoading={receiveCountriesLoading}
          getPaymentTypesLoading={getPaymentTypesLoading}
          paymentTypesData={paymentTypesData}
          handleToggleStep={handleToggleStep}
          isWithoutAccountInfo={isWithoutAccountInfo}
        />
      )}
      {!isWithoutAccountInfo && currentStep === 2 && (
        <AccountInfo
          fieldsData={fieldsData}
          handleToggleStep={handleToggleStep}
          bankBranches={bankBranches}
          bankBranchesLoading={bankBranchesLoading}
          resolvedBanks={resolvedBanks}
          areBanksLoading={areBanksLoading}
          resolveBankLoading={resolveBankLoading}
        />
      )}
      {currentStep === 3 && (
        <RecipientInfo
          addRecipientLoading={addRecipientLoading}
          fieldsData={fieldsData}
          handleToggleStep={handleToggleStep}
          isWithoutAccountInfo={isWithoutAccountInfo}
        />
      )}
      {currentStep === 4 && (
        <SuccessScreen
          resolvedBanks={resolvedBanks}
          bankBranches={bankBranches}
          handleClose={handleClose}
          recipientAdded={recipientAdded}
        />
      )}
    </>
  );
};

export default AddRecipientFormInner;
