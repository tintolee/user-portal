import { Box, Button, FormFieldDropdown, Text } from '@sendsprint/ui-react';
import React, { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { AddRecipientFormI, FormSteps } from '..';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { PaymentTypeBlock } from '@src/components';
import { mapReceiveCountries } from '../../../utils';

export interface TransferInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  handleToggleStep: (arg: FormSteps, values?: any) => void;
  getPaymentTypesLoading: boolean;
  receiveCountries: ClientApi.ReceiveCountry[];
  receiveCountriesLoading: boolean;
  paymentTypesData: ClientApi.PaymentTypeInfo[];
  isWithoutAccountInfo: boolean;
}

const TransferInfo = ({
  handleToggleStep,
  getPaymentTypesLoading,
  receiveCountries,
  receiveCountriesLoading,
  paymentTypesData,
  isWithoutAccountInfo
}: TransferInfoProps) => {
  const [formattedCountries, setFormattedCountries] = useState<ClientApi.ReceiveCountry[]>([]);

  const [{ value: paymentTypeValue }] = useField('paymentType');
  const formik = useFormikContext<AddRecipientFormI>();
  const { setValues, values } = formik;

  const clearValues = (paymentType: string, country: string) => {
    setValues({
      accountName: '',
      accountNumber: '',
      address: '',
      bankCode: '',
      birthday: '',
      branchCode: '',
      country,
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      paymentOperator: '',
      paymentType,
      phoneNumber: '',
      routingNumber: '',
      saveDetails: true
    });
  };

  useEffect(() => {
    if (receiveCountries.length) {
      const mapped = mapReceiveCountries(receiveCountries);
      setFormattedCountries(mapped);
    }
  }, [receiveCountries]);

  useEffect(() => {
    if (paymentTypesData.length && paymentTypeValue) {
      const isValueInPaymentTypes = paymentTypesData.findIndex(
        (type) => type.recipientType === paymentTypeValue
      );

      if (isValueInPaymentTypes > -1) return;
      clearValues(paymentTypeValue, values.country);
    }
  }, [paymentTypeValue, paymentTypesData, values.country]);

  return (
    <Box>
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold ss-mb-6">
          How do you want them to receive the money?
        </Text>
        <FormFieldDropdown
          data={formattedCountries}
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
          onClick={() => handleToggleStep(isWithoutAccountInfo ? 3 : 2, formik)}
          label="Continue"
        />
      </Box>
    </Box>
  );
};

export default TransferInfo;
