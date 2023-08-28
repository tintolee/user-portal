import { Box, Skeleton } from '@sendsprint/ui-react';
import React from 'react';

const LoadingState = () => {
  return (
    <Box>
      <Box>
        <Skeleton className="ss-w-full ss-h-10 ss-rounded-lg ss-max-w-300 ss-mb-6 md:ss-mb-14" />
        <Skeleton className="ss-w-14 ss-h-14 ss-rounded-full ss-mb-6" />
        <Box className="ss-flex ss-flex-col ss-gap-4 ss-bg-white ss-p-5 ss-rounded-lg">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="ss-rounded-lg ss-h-14 md:ss-h-20" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingState;
