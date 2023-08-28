/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Api from '@sendsprint/api-types';
import {
  useGetBankBranches,
  useGetBanks,
  useGetBanksForAutoDom,
  useGetBanksForCashPickup,
  useGetBanksGh,
  useResolveBankAccount
} from '@src/hooks';
import ClientApi from '@src/types/client';
import {
  paymentTypesWithAccountName,
  paymentTypesWithBranchCode,
  recipientSchema
} from '@src/validations';
import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { FormSteps } from '.';
import { resolveCountryFields } from '../../../data/country-fields';
import AccountInfo from './accountInfo';
import RecipientInfo from './RecipientInfo';
import Stepper from './Stepper';
import { TransferInfoProps } from './transferInfo';

type AddRecipientFormInnerProps = {
  currentStep: number;
  handleStepClick: (arg: FormSteps) => void;
  enteredSteps: FormSteps[];
  handleResetEnteredSteps: () => void;
  addRecipientLoading: boolean;
  handleClose: () => void;
  type: ClientApi.RecipientType;
  isWithoutAccountInfo: boolean;
} & Omit<TransferInfoProps, 'getPaymentTypesLoading' | 'paymentTypesData'>;

const AddRecipientFormInner = ({
  currentStep,
  handleToggleStep,
  // paymentTypes,
  receiveCountries,
  receiveCountriesLoading,
  handleStepClick,
  enteredSteps,
  handleResetEnteredSteps,
  addRecipientLoading,
  handleClose,
  type,
  isWithoutAccountInfo
}: AddRecipientFormInnerProps) => {
  const [resolvedBanks, setResolvedBanks] = useState<ClientApi.Bank[]>([]);
  const [areBanksLoading, setAreBanksLoading] = useState(false);

  const { values } = useFormikContext();

  const [{ value: country }] = useField('country');
  const [{ value: bankCode }] = useField('bankCode');

  // const [{ value: bankCode }] = useField('bankCode');
  const [{ value: accountNumber }] = useField('accountNumber');
  const [{ value: accountName }, , { setTouched, setValue }] = useField('accountName');

  const areDependentFieldsValid = !!(
    accountNumber &&
    bankCode &&
    recipientSchema.accountName.isValidSync(accountNumber)
  );

  const {
    data: resolveBankData,
    isError: isResolveBankError,
    isLoading: resolveBankLoading
  } = useResolveBankAccount(
    {
      BankCode: bankCode,
      AccountNo: accountNumber
    },
    {
      enabled: paymentTypesWithAccountName.includes(type) && areDependentFieldsValid && !accountName
    }
  );

  const { data: banks = [], isLoading: banksLoading } = useGetBanks({ country });
  const { data: banksForCashPickup = [], isLoading: banksForCashPickupLoading } =
    useGetBanksForCashPickup();
  const { data: banksForAutoDom = [], isLoading: banksForAutoDomLoading } = useGetBanksForAutoDom();
  const { data: banksForGh = [], isLoading: banksForGhLoading } = useGetBanksGh(
    {
      type: type === 'GH-BANK' ? 'bank' : 'mobile',
      options: { country }
    },
    {
      enabled: country === Api.Model.CountryInitials.Ghana
    }
  );
  const { data: bankBranches = [], isLoading: bankBranchesLoading } = useGetBankBranches(
    {
      bankCode,
      country
    },
    { enabled: !!bankCode && paymentTypesWithBranchCode.includes(type) }
  );

  useEffect(() => {
    if (!type) return;

    if (country === Api.Model.CountryInitials.Ghana) {
      setResolvedBanks(banksForGh);
      setAreBanksLoading(banksForGhLoading);
    } else if (type === 'NG-CASH') {
      setResolvedBanks(banksForCashPickup);
      setAreBanksLoading(banksForCashPickupLoading);
    } else if (type === 'NG-A-DOM') {
      setResolvedBanks(banksForAutoDom);
      setAreBanksLoading(banksForAutoDomLoading);
    } else {
      setResolvedBanks(banks);
      setAreBanksLoading(banksLoading);
    }
  }, [
    type,
    banksLoading,
    banksForCashPickupLoading,
    banksForAutoDomLoading,
    banksForGhLoading,
    bankBranchesLoading
  ]);

  useEffect(() => {
    if (country) {
      handleResetEnteredSteps();
    }
  }, [country]);

  // clear account name when dependent fields change
  useEffect(() => {
    setValue('');
    setTouched(false, false);
  }, [accountNumber, bankCode]);

  // set account name
  useEffect(() => {
    if (!resolveBankData) {
      return;
    }
    setValue(resolveBankData.accountName);
  }, [resolveBankData]);

  // set error on field
  useEffect(() => {
    if (isResolveBankError) {
      setTouched(true, true);
    }
  }, [isResolveBankError]);

  const fieldsData = resolveCountryFields(type);

  return (
    <>
      <Stepper
        currentStep={currentStep}
        enteredSteps={enteredSteps}
        handleStepClick={handleStepClick}
        isWithoutAccountInfo={isWithoutAccountInfo}
      />
      {!isWithoutAccountInfo && currentStep === 1 && (
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
      {currentStep === 2 && (
        <RecipientInfo
          addRecipientLoading={addRecipientLoading}
          fieldsData={fieldsData}
          handleToggleStep={handleToggleStep}
          isWithoutAccountInfo={isWithoutAccountInfo}
        />
      )}
    </>
  );
};

export default AddRecipientFormInner;
