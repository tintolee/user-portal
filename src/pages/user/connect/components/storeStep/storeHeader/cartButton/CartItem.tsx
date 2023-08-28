import { Box, Icon, Text } from '@sendsprint/ui-react';
import { Trash2Outline } from '@sendsprint/ui-react/dist/icons';
import { DisplayAmount, Image, Quantity } from '@src/components';
import { useConnect } from '@src/contexts';
import ClientApi from '@src/types/client';
import { getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useEffect, useState } from 'react';

interface Props {
  item: ClientApi.CartI;
}

const CartItem = ({ item }: Props) => {
  const { Country, Amount } = item;
  const [convertedAmt, setConvertedAmt] = useState(0);
  const { state, handleDeleteCartItem, handleUpdateCartItemQuantity } = useConnect();

  useEffect(() => {
    if (state.rate?.rate && Amount) {
      const roundedDownNo = getMonetaryValue(Amount / state.rate?.rate);
      setConvertedAmt(roundedDownNo);
    }
  }, [state.rate?.rate]);

  // const formattedAmount = currencyConverter2(Amount, getCurrencySymbol(Country));
  // const formattedConvertedAmount = currencyConverter2(
  //   getMonetaryValue(convertedAmt),
  //   getCurrencySymbol(state.sender.selectedCountry?.initials) || '',
  //   2
  // );
  return (
    <Box className="ss-flex ss-items-center ss-gap-4 ss-w-full ss-bg-white ss-p-4 ss-rounded-lg ss-relative">
      <button
        onClick={() => handleDeleteCartItem(item)}
        className="ss-flex ss-justify-center ss-items-center ss-w-10 ss-h-10 ss-rounded-full ss-absolute ss--top-3 ss--right-3 ss-outline-none focus:ss-focus-ring ss-bg-error-50 ss-text-error-500">
        <Icon svg={Trash2Outline} size={24} />
      </button>
      <Image
        alt=""
        className="ss-w-20"
        imgClasses="ss-w-20 ss-h-20 ss-rounded"
        src={item.Picture}
      />
      <Box className="ss-flex-1">
        <Text className="ss-font-bold ss-mb-2">{item.Name}</Text>
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-justify-between md:ss-items-center ss-gap-3">
          <Box>
            <Text variant="paragraphSmall" className="ss-font-bold">
              <DisplayAmount
                value={getMonetaryValue(convertedAmt)}
                currency={getCurrencySymbol(state.sender.selectedCountry?.initials)}
                decimalScale={2}
              />
            </Text>
            <Text variant="paragraphSmall">
              <DisplayAmount
                value={getMonetaryValue(Amount)}
                currency={getCurrencySymbol(Country)}
                decimalScale={2}
              />
            </Text>
          </Box>
          <Quantity
            handleMinusClick={() =>
              handleUpdateCartItemQuantity({
                amount: item.Amount,
                id: item.Id,
                quantity: item.Quantity,
                variant: 'decrease'
              })
            }
            handlePlusClick={() =>
              handleUpdateCartItemQuantity({
                amount: item.Amount,
                id: item.Id,
                quantity: item.Quantity,
                variant: 'increase'
              })
            }
            quantity={item.Quantity}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
