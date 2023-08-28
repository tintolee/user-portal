import { Box, Text } from '@sendsprint/ui-react';
import { useConnect } from '@src/contexts';
import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import AmountItem from './AmountItem';

interface Props {
  productDetails: ClientApi.GiftMerchants | null;
}

const Amount = ({ productDetails }: Props) => {
  if (!productDetails) return null;
  const { MinimumPrice } = productDetails;
  const [amountNo, setAmountNo] = useState<number[]>([]);

  const { state } = useConnect();
  const [{ value }, , { setValue }] = useField('amount');

  useEffect(() => {
    if (MinimumPrice) {
      const minimumAmtToUse = Number(MinimumPrice) < 5000 ? 5000 : Number(MinimumPrice);
      setAmountNo([
        minimumAmtToUse,
        minimumAmtToUse + 5000,
        minimumAmtToUse + 10000,
        minimumAmtToUse + 15000
      ]);
    }
  }, [MinimumPrice]);

  const handleAmount = (amount: string) => {
    setValue(amount);
  };

  return (
    <Box>
      <Text className="ss-font-bold ss-text-neutral-500 ss-mb-4">Suggested Amounts</Text>
      <Box className="ss-grid lg:ss-grid-cols-2 ss-gap-3">
        {amountNo.map((item) => (
          <AmountItem
            key={item}
            amount={item.toString()}
            isActive={item.toString() === value}
            currency={state.recipient.selectedCountry?.Currency || ''}
            handleAmountUpdate={() => handleAmount(item.toString())}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Amount;
