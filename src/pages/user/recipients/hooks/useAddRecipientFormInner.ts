import Api from '@sendsprint/api-types';
import {
  useGetBankBranches,
  useGetBanks,
  useGetBanksForAutoDom,
  useGetBanksForCashPickup,
  useGetBanksGh,
  useGetPaymentTypesByCountry,
  useResolveBankAccount
} from '@src/hooks';
import ClientApi from '@src/types/client';
import {
  paymentTypesWithAccountName,
  paymentTypesWithBranchCode,
  recipientSchema
} from '@src/validations';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { resolveCountryFields } from '../data/country-fields';

interface UseAddRecipientFormInnerOptions {
  handleResetEnteredSteps: () => void;
}

const paymentTypesWithoutAccountInfo = ['KE-MOBILE'];

const useAddRecipientFormInner = (options: UseAddRecipientFormInnerOptions) => {
  const { handleResetEnteredSteps } = options;

  const [resolvedBanks, setResolvedBanks] = useState<ClientApi.Bank[]>([]);
  const [areBanksLoading, setAreBanksLoading] = useState(false);

  const [{ value: paymentType }] = useField('paymentType');
  const [{ value: country }] = useField('country');
  const [{ value: bankCode }] = useField('bankCode');

  const isWithoutAccountInfo = paymentTypesWithoutAccountInfo.includes(paymentType);

  const { data: paymentTypesData = [], isLoading: getPaymentTypesLoading } =
    useGetPaymentTypesByCountry({ country });

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
      enabled:
        paymentTypesWithAccountName.includes(paymentType) && areDependentFieldsValid && !accountName
    }
  );

  const { data: banks = [], isLoading: banksLoading } = useGetBanks({ country });
  const { data: banksForCashPickup = [], isLoading: banksForCashPickupLoading } =
    useGetBanksForCashPickup();
  const { data: banksForAutoDom = [], isLoading: banksForAutoDomLoading } = useGetBanksForAutoDom();
  const { data: banksForGh = [], isLoading: banksForGhLoading } = useGetBanksGh(
    {
      type: paymentType === 'GH-BANK' ? 'bank' : 'mobile',
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
    { enabled: !!bankCode && paymentTypesWithBranchCode.includes(paymentType) }
  );

  useEffect(() => {
    if (!paymentType) return;

    if (country === Api.Model.CountryInitials.Ghana) {
      setResolvedBanks(banksForGh);
      setAreBanksLoading(banksForGhLoading);
    } else if (paymentType === 'NG-CASH') {
      setResolvedBanks(banksForCashPickup);
      setAreBanksLoading(banksForCashPickupLoading);
    } else if (paymentType === 'NG-A-DOM') {
      setResolvedBanks(banksForAutoDom);
      setAreBanksLoading(banksForAutoDomLoading);
    } else {
      setResolvedBanks(banks);
      setAreBanksLoading(banksLoading);
    }
  }, [paymentType]);

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

  const fieldsData = resolveCountryFields(paymentType);

  return {
    fieldsData,
    resolvedBanks,
    areBanksLoading,
    isWithoutAccountInfo,
    resolveBankLoading,
    paymentTypesData,
    getPaymentTypesLoading,
    bankBranches,
    bankBranchesLoading
  };
};

export default useAddRecipientFormInner;
