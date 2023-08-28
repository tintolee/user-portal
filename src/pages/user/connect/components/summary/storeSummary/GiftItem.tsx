import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { useConnect } from '@src/contexts';
import ClientApi from '@src/types/client';
import { currencyConverter2, getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useEffect, useState } from 'react';

interface Props {
  item: ClientApi.CartI;
}

const GiftItem = ({ item }: Props) => {
  const { Picture, Quantity, Name, Amount, Country } = item;
  const { state } = useConnect();
  const [sendersAmount, setSendersAmount] = useState(0);

  useEffect(() => {
    if (state.rate?.rate && Amount) {
      const roundedDownNo = getMonetaryValue(Amount / state.rate?.rate);
      setSendersAmount(roundedDownNo);
    }
  }, [state.rate?.rate]);

  const formattedAmount = currencyConverter2(Amount, getCurrencySymbol(Country));
  const formattedSenderAmount = currencyConverter2(
    sendersAmount,
    getCurrencySymbol(state.sender.selectedCountry?.initials || ''),
    2
  );
  return (
    <Box className="ss-flex ss-items-center ss-gap-4 ss-p-4 ss-bg-neutral-100 ss-rounded-lg ss-mb-4">
      <Image src={Picture} imgClasses="ss-w-16 ss-h-16 ss-rounded ss-overflow-hidden" alt="" />
      <Box className="ss-flex-1">
        <Text className="ss-font-semibold" variant="paragraphSmall">
          {Name}
        </Text>
        <Box className="ss-flex ss-items-center ss-justify-between ss-gap-4">
          <Box>
            <Text variant="paragraphVerySmall" className="ss-font-semibold">
              {formattedSenderAmount}
            </Text>
            <Text variant="paragraphVerySmall">{formattedAmount}</Text>
          </Box>
          <Box className="ss-px-2 ss-py-1 ss-rounded-lg ss-bg-neutral-200 ss-text-neutral-400">
            <Text variant="paragraphVerySmall">
              {Quantity} Item{Quantity > 1 && 's'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GiftItem;
