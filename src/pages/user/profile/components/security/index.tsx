import React from 'react';
import { Box, Text } from '@sendsprint/ui-react';
import TransactionPin from './transactionPin';
import UpdatePassword from './updatePassword';

const Security = () => {
  return (
    <Box>
      <Box className="ss-mb-4 ss-w-full ss-flex ss-justify-between ss-items-center">
        <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-font-bold">
          Security
        </Text>
      </Box>
      <Box className="ss-space-y-3">
        <UpdatePassword />
        <TransactionPin />
      </Box>
    </Box>
  );
};

export default Security;
