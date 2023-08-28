import { Box, ExtraInfo, Text } from '@sendsprint/ui-react';
import { Quantity } from '@src/components';
import { useField } from 'formik';
import React from 'react';

const QuantitySection = () => {
  const [{ value }, { touched, error }, { setValue }] = useField('quantity');

  const handleMinusClick = () => {
    const numberValue = Number(value);

    if (!isNaN(numberValue) && numberValue > 1) {
      setValue(`${numberValue - 1}`);
    }
  };

  const handlePlusClick = () => {
    const numberValue = Number(value);

    if (!isNaN(numberValue)) {
      setValue(`${numberValue + 1}`);
    }
  };
  return (
    <Box className="ss-bg-white ss-p-6 ss-space-y-5 ss-rounded-lg ss-mt-6">
      <Text className="ss-font-bold ss-text-neutral-500 ss-mb-4">Quantity</Text>
      <Quantity
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
        quantity={value}
      />
      {touched && error && <ExtraInfo extraInfo={error} variant="error" />}
    </Box>
  );
};

export default QuantitySection;
