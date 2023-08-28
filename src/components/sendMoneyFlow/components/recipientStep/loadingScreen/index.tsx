import { Box, Skeleton } from '@sendsprint/ui-react';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box>
      <Skeleton className="ss-rounded ss-border ss-h-10 ss-max-w-300 ss-mb-8" />
      <Box className="ss-bg-white ss-p-4 ss-rounded ss-space-y-6">
        {[...Array(3)].map((item, index) => (
          <Skeleton key={index} className="ss-rounded ss-border ss-h-18" />
        ))}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
