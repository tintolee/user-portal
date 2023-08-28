import { Box, Skeleton } from '@sendsprint/ui-react';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box>
      <Skeleton className="ss-h-10 ss-max-w-200 ss-mb-6 ss-rounded" />
      <Box className="ss-grid ss-grid-cols-1 md:ss-grid-cols-2 ss-gap-6">
        {[...Array(9)].map((items, index) => (
          <Skeleton key={index} className="ss-h-300 ss-rounded" />
        ))}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
