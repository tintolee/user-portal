import React from 'react';
import { Box, Button } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import { useFormikContext } from 'formik';
import { ChooseAmountFormData } from '.';
import { useAmountStepFormLogic, useRatesAndPaymentTypes } from '../../hooks';
import AmountBlock from './amountBlock';
import PaymentTypes from './paymentTypes';
import TransferInformation from '../transferInformation';
import { State } from '../../state/types';

interface Props {
  onChange: () => void;
  areCountriesLoading: boolean;
  isCountryError: boolean;
  receiveCountries: ClientApi.ReceiveCountry[];
  sendCountries: ClientApi.SendCountry[];
  state: State;
}

const ChooseAmountFormInner = ({
  onChange,
  areCountriesLoading,
  isCountryError,
  receiveCountries,
  sendCountries,
  state
}: Props) => {
  const formik = useFormikContext<ChooseAmountFormData>();
  const { sendAmount, sendCurrency, receiveCurrency, receiveCountry, recentlyChangedProp } =
    formik.values;

  const ratesAndPaymentTypesValues = useRatesAndPaymentTypes({
    receiveCountry,
    receiveCurrency,
    sendAmount,
    sendCurrency
  });

  useAmountStepFormLogic({
    formik,
    onChange,
    ratesAndPaymentTypesValues,
    recentlyChangedProp
  });

  return (
    <Box className="ss-flex ss-flex-col ss-gap-6">
      <AmountBlock
        areCountriesLoading={areCountriesLoading}
        isCountryError={isCountryError}
        receiveCountries={receiveCountries}
        sendCountries={sendCountries}
      />
      <PaymentTypes
        isPaymentTypesLoading={ratesAndPaymentTypesValues.isPaymentTypesLoading}
        paymentTypesByCountry={ratesAndPaymentTypesValues.paymentTypesByCountry}
      />
      <Box className="ss-block xl:ss-hidden">
        <TransferInformation state={state} />
      </Box>
      <Box>
        <Button
          type="submit"
          label="Continue"
          disabled={ratesAndPaymentTypesValues.rateDataLoading}
          isBlock
        />
      </Box>
    </Box>
  );
};

export default ChooseAmountFormInner;
