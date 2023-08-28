import React from 'react';
import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { emptyGift } from '../../../../assets';

const EmptyGiftScreen = () => {
  return (
    <Box className="ss-py-20 ss-flex ss-justify-center ss-col-span-full">
      <Box className="ss-flex ss-flex-col ss-gap-5 ss-items-center">
        <Image alt="" imgClasses="ss-w-300" src={emptyGift} />
        <Text variant="h5">No gifts found</Text>
      </Box>
    </Box>
  );
};

export default EmptyGiftScreen;
