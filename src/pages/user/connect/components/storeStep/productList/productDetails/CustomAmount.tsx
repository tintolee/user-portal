import { Box, ExtraInfo, FormField, Text } from '@sendsprint/ui-react';
import { useConnect } from '@src/contexts';
import { getMonetaryValue } from '@src/utils/currency';
import { useField } from 'formik';
import React, { useEffect } from 'react';

const CustomAmount = () => {
  const { state } = useConnect();

  const [{ value: amountValue }, { error, touched }] = useField('amount');
  const [, , { setValue: setSendersCurrency }] = useField('sendersCurrency');

  useEffect(() => {
    if (state.rate?.rate && amountValue) {
      const roundedDownNo = getMonetaryValue(amountValue / state.rate?.rate);
      setSendersCurrency(`${roundedDownNo} ${state.sender.selectedCountry?.currency}`);
    }
  }, [state.rate?.rate, amountValue]);
  return (
    <Box>
      <Text className="ss-font-bold ss-text-neutral-500 ss-mb-4">Custom Amount</Text>
      <Box className="ss-flex ss-flex-col lg:ss-flex-row lg:ss-items-center ss-gap-5">
        <Box className="ss-flex-1">
          <FormField disableErrorFromShowing name="amount" type="number" label="Amount" />
        </Box>
        <Box className="ss-w-34">
          <FormField disabled name="sendersCurrency" label="Your currency" />
        </Box>
      </Box>
      {touched && error && <ExtraInfo extraInfo={error} variant="error" />}
    </Box>
  );
};

export default CustomAmount;
