import { Box, Button, FormFieldDropdown, Text } from '@sendsprint/ui-react';
import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { FormSteps } from '..';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { PaymentTypeBlock } from '@src/components';

export interface TransferInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleToggleStep: (arg: FormSteps, values?: any) => void;
  // paymentTypes: Client Api.PaymentTypeInfo[];
  getPaymentTypesLoading: boolean;
  receiveCountries: ClientApi.ReceiveCountry[];
  receiveCountriesLoading: boolean;
  paymentTypesData: ClientApi.PaymentTypeInfo[];
  // handleGetPaymentTypes: (country: Api.Model.CountryInitials) => void;
}

const TransferInfo = ({
  handleToggleStep,
  getPaymentTypesLoading,
  // paymentTypes,
  receiveCountries,
  receiveCountriesLoading,
  paymentTypesData
}: TransferInfoProps) => {
  const [{ value: recipientCurrencyValue }] = useField('country');
  const [{ value }, , { setValue }] = useField('paymentType');
  const formik = useFormikContext();

  // useEffect(() => {
  //   if (recipientCurrencyValue) {
  //     handleGetPaymentTypes(recipientCurrencyValue);
  //   }
  // }, [recipientCurrencyValue]);

  useEffect(() => {
    if (paymentTypesData && value) {
      const isValueInPaymentTypes = paymentTypesData.findIndex(
        (type) => type.recipientType === value
      );

      if (isValueInPaymentTypes > -1) return;

      setValue('');
    }
  }, [value, paymentTypesData]);

  return (
    <Box>
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold ss-mb-6">
          How do you want them to receive the money?
        </Text>
        <FormFieldDropdown
          data={receiveCountries}
          emptyOptionLabel=""
          name="country"
          icon={Api.Model.CountryInitials.Nigeria}
          isLoading={receiveCountriesLoading}
          optionLabel="name"
          optionValue="initials"
          optionIcon="initials"
          label="Recipient's currency"
        />
      </Box>
      <PaymentTypeBlock
        getPaymentTypesLoading={getPaymentTypesLoading}
        paymentTypes={paymentTypesData}
        name="paymentType"
      />
      <Box>
        <Button
          type="submit"
          isBlock
          onClick={() => handleToggleStep(2, formik)}
          label="Continue"
        />
      </Box>
    </Box>
  );
};

export default TransferInfo;
