import { Box, Text } from '@sendsprint/ui-react';
import { NoResultSvg } from './assets';
import React from 'react';

const NoResult = () => {
  return (
    <Box className="ss-flex ss-flex-col ss-py-16 ss-items-center">
      <NoResultSvg className="ss-w-40 md:ss-w-52 ss-h-40 md:ss-h-52" role="presentation" />
      <Text variant="h5" className="ss-font-bold  ss-mb-4">
        Sorry, we couldn&apos;t find any matches
      </Text>
      <Text variant="paragraphLarge">Please check the spelling and try again.</Text>
    </Box>
  );
};

export default NoResult;
