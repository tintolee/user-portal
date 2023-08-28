import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { noResult } from '@src/components/sendMoneyFlow/assets';
import React from 'react';

const EmptyRecipientSearch = () => {
  return (
    <Box className="ss-flex ss-flex-col ss-py-16 ss-items-center">
      <Image alt="" src={noResult} imgClasses="ss-w-32 md:ss-w-52 ss-h-32 md:ss-h-52" />
      <Text variant="h5" className="ss-font-bold  ss-my-4">
        Sorry, we couldn&apos;t find any matches
      </Text>
      <Text variant="paragraphLarge">Please check the spelling and try again.</Text>
    </Box>
  );
};

export default EmptyRecipientSearch;
