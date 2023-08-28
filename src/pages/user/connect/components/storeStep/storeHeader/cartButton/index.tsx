import { Box, Button, Text } from '@sendsprint/ui-react';
import { useConnect } from '@src/contexts';
import { useToggle } from '@src/hooks';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { StoreStepData } from '../..';
import CartDialog from './CartDialog';

interface Props {
  // eslint-disable-next-line no-unused-vars
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
}

const CartButton = ({ storeSuccessHandler }: Props) => {
  const { handleFalse: handleClose, handleTrue: handleOpen, state: isOpen } = useToggle();
  const { state } = useConnect();

  const cartLength = state.cart.productList.length;
  return (
    <Box>
      <Button
        variant="secondary"
        onClick={handleOpen}
        label={
          <Box className="ss-flex ss-items-center ss-gap-2">
            <FiShoppingCart size={24} />
            <Text>{cartLength}</Text>
          </Box>
        }
      />
      <CartDialog
        storeSuccessHandler={storeSuccessHandler}
        cartLength={cartLength}
        state={state}
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default CartButton;
