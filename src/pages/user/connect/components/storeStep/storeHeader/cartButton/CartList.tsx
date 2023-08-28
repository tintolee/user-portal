import { Box, Button, ExtraInfo } from '@sendsprint/ui-react';
import { DisplayAmount } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import { getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import React from 'react';
import { StoreStepData } from '../..';
import CartItem from './CartItem';

interface Props {
  cartItems: ClientApi.CartI[];
  state: ConnectState;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
}

const CartList = ({ cartItems, state, handleClose, storeSuccessHandler }: Props) => {
  // const totalAmount = currencyConverter2(
  //   state.cart.totalAmount,
  //   getCurrencySymbol(state.sender.selectedCountry?.initials),
  //   2
  // );

  const handleContinue = () => {
    handleClose();
    storeSuccessHandler({
      cart: state.cart.productList,
      totalAmount: state.cart.totalAmount,
      totalAmountPlusFee: state.cart.totalAmountPlusFee,
      fee: state.rate?.fee || 0,
      sender: state.sender.selectedCountry,
      recipient: state.recipient.selectedCountry
    });
  };
  return (
    <Box className="ss-h-full ss-flex ss-flex-col">
      <Box className="ss-flex-1 ss-space-y-4 ss-mb-5">
        {cartItems.map((item, index) => (
          <CartItem key={`${item.Id}${index}`} item={item} />
        ))}
      </Box>
      <Box className="ss-space-y-3 ss-pb-5">
        <ExtraInfo extraInfo="Shipping, taxes and other applicable fees will be calculated when you continue." />
        <Button
          onClick={handleContinue}
          label={
            <span className="ss-font-bold">
              Continue -{' '}
              <DisplayAmount
                value={getMonetaryValue(state.cart.totalAmount)}
                currency={getCurrencySymbol(state.sender.selectedCountry?.initials)}
                decimalScale={2}
              />
            </span>
          }
          isBlock
        />
        <Button onClick={handleClose} label="Cancel" variant="secondary" isBlock />
      </Box>
    </Box>
  );
};

export default CartList;
