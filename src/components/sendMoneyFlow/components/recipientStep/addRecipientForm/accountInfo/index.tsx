import { Box, Button, FormField } from '@sendsprint/ui-react';
import { Globe2Outline, KeypadOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import { recipientSchema } from '@src/validations';
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { RecipientFormData, FormSteps } from '..';
import ResolvedFormField from '../ResolvedFormField';
import AccountNameField from './AccountNameField';
import BankBranchField from './BankBranchField';
import BankField from './BankField';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  handleToggleStep: (arg: FormSteps, values?: any) => void;
  fieldsData: string[];
  bankBranches: ClientApi.BankBranch[];
  bankBranchesLoading: boolean;
  resolvedBanks: ClientApi.Bank[];
  areBanksLoading: boolean;
  resolveBankLoading: boolean;
}

const AccountInfo = ({
  handleToggleStep,
  fieldsData,
  bankBranches,
  bankBranchesLoading,
  areBanksLoading,
  resolvedBanks,
  resolveBankLoading
}: Props) => {
  const [{ value: country }] = useField('country');
  const [{ value: bankCode }] = useField('bankCode');
  const [{ value: branchCode }, , { setValue: setBranchCode }] = useField('branchCode');
  const formik = useFormikContext<RecipientFormData>();

  useEffect(() => {
    if (country && resolvedBanks && bankCode) {
      const isBankCodeInBankList = resolvedBanks.findIndex((bank) => bank.code.includes(bankCode));

      if (isBankCodeInBankList > -1) return;

      // setValue('');
      formik.setValues({
        ...formik.values,
        accountName: '',
        accountNumber: '',
        bankCode: '',
        routingNumber: ''
      });
    }
  }, [country, resolvedBanks, bankCode]);

  useEffect(() => {
    if (country && bankBranches && branchCode) {
      const isBranchCodeInBankList = bankBranches.findIndex((branch) =>
        branch.code.includes(branchCode)
      );

      if (isBranchCodeInBankList > -1) return;

      setBranchCode('');
    }
  }, [country, bankBranches, branchCode]);

  return (
    <Box>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg ss-mb-6">
        <ResolvedFormField fieldName="bankCode" fieldsData={fieldsData}>
          <BankField areBanksLoading={areBanksLoading} resolvedBanks={resolvedBanks} />
        </ResolvedFormField>
        <ResolvedFormField fieldName="branchCode" fieldsData={fieldsData}>
          <BankBranchField data={bankBranches} isLoading={bankBranchesLoading} />
        </ResolvedFormField>
        <ResolvedFormField fieldName="accountNumber" fieldsData={fieldsData}>
          <FormField
            icon={KeypadOutline}
            name="accountNumber"
            type="string"
            label="Account number"
          />
        </ResolvedFormField>
        <ResolvedFormField fieldName="accountName" fieldsData={fieldsData}>
          <AccountNameField
            resolveBankLoading={resolveBankLoading}
            accountNumberSchema={recipientSchema.accountName}
          />
        </ResolvedFormField>
        <ResolvedFormField fieldName="routingNumber" fieldsData={fieldsData}>
          <FormField
            icon={Globe2Outline}
            extraInfo="Routing numbers (sort codes) are usually nine-digit numbers which identify a bank or financial institution where a customer’s account is being held. This is used when clearing funds for electronic transfers."
            name="routingNumber"
            label="Routing number (Sort code)"
          />
        </ResolvedFormField>
      </Box>
      <Box className="ss-flex ss-gap-6 ss-items-center">
        <Button
          isBlock
          type="submit"
          onClick={() => handleToggleStep(2, formik)}
          className="ss-flex-1"
          label="Continue"
        />
      </Box>
    </Box>
  );
};

export default AccountInfo;
