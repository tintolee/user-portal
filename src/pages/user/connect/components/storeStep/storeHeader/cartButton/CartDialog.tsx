import { Box, Button, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import React from 'react';
import { StoreStepData } from '../..';
import CartList from './CartList';
import EmptyCart from './EmptyCart';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  state: ConnectState;
  cartLength: number;
  // eslint-disable-next-line no-unused-vars
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
}

const CartDialog = ({ handleClose, isOpen, state, cartLength, storeSuccessHandler }: Props) => {
  return (
    <Dialog2 handleClose={handleClose} isOpen={isOpen}>
      <Box className="ss-h-full ss-flex ss-flex-col">
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            {cartLength} gift{cartLength > 1 && '(s)'} in your cart
          </Text>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Box className="ss-flex-1">
          {state.cart.productList.length === 0 && <EmptyCart />}
          {state.cart.productList.length ? (
            <CartList
              storeSuccessHandler={storeSuccessHandler}
              state={state}
              handleClose={handleClose}
              cartItems={state.cart.productList}
            />
          ) : null}
        </Box>
      </Box>
    </Dialog2>
  );
};

export default CartDialog;
