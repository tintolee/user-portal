import { FormFieldDropdown } from '@sendsprint/ui-react';
import { HomeOutline } from '@sendsprint/ui-react/dist/icons';
import { useField } from 'formik';
import React from 'react';

interface Props {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const BankBranchField = ({ data, isLoading }: Props) => {
  const [{ value }] = useField('bankCode');

  if (!value) return null;

  return (
    <FormFieldDropdown
      icon={HomeOutline}
      data={data}
      emptyOptionLabel=""
      isLoading={isLoading}
      name="branchCode"
      optionLabel="name"
      optionValue="code"
      label="Bank branch"
    />
  );
};

export default BankBranchField;
