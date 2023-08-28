import { Box, Text } from '@sendsprint/ui-react';
import React from 'react';

const EmptyState = () => {
  return (
    <Box className="ss-py-10">
      <Text className="ss-font-semibold ss-mb-3" variant="paragraphLarge">
        0
      </Text>
      <Text className="ss-mb-7">
        You don’t have any card linked. When you link a card, it shows up here.
      </Text>
    </Box>
  );
};

export default EmptyState;
