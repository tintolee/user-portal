import Box from '@sendsprint/ui-react/dist/components/Box';
import { Skeleton } from '@sendsprint/ui-react/dist/components/skeleton';
import React from 'react';

const TransactionsLoading = () => {
  return (
    <Box className="ss-space-y-3">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="ss-rounded-lg ss-h-20" />
      ))}
    </Box>
  );
};

export default TransactionsLoading;
