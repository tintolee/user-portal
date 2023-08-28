import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { emptyCart } from '../../../../assets';
import React from 'react';

const EmptyCart = () => {
  return (
    <Box className="ss-py-20">
      <Box className="ss-flex ss-flex-col ss-items-center">
        <Image alt="Empty Cart" imgClasses="ss-max-w-250 ss-min-h-250" src={emptyCart} />
        <Text variant="h5">Your cart is empty</Text>
      </Box>
    </Box>
  );
};

export default EmptyCart;
