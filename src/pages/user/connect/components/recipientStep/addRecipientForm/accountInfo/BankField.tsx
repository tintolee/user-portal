import { FormFieldDropdown } from '@sendsprint/ui-react';
import { HomeOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React from 'react';

interface Props {
  resolvedBanks: ClientApi.Bank[];
  areBanksLoading: boolean;
}

const resolveLabel = (paymentType: string) => {
  if (paymentType === 'GH-MOBILE') return 'Choose a mobile operator';
  if (paymentType === 'NG-CASH') return 'Cash pickup bank';
  return "Recipient's bank";
};

const BankField = ({ areBanksLoading, resolvedBanks }: Props) => {
  const [{ value: paymentType }] = useField('paymentType');

  const isCashPickup = paymentType === 'NG-CASH';

  return (
    <FormFieldDropdown
      data={resolvedBanks}
      icon={HomeOutline}
      emptyOptionLabel=""
      extraInfo={
        isCashPickup ? 'Your recipient will pick the cash up from the bank you select' : ''
      }
      isLoading={areBanksLoading}
      name="bankCode"
      optionLabel="name"
      optionValue="code"
      label={resolveLabel(paymentType)}
    />
  );
};

export default BankField;
