import Box from '@sendsprint/ui-react/dist/components/Box';
import { Skeleton } from '@sendsprint/ui-react/dist/components/skeleton';
import React from 'react';

const ScheduleLoading = () => {
  return (
    <Box className="ss-space-y-3">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="ss-rounded-lg ss-h-28" />
      ))}
    </Box>
  );
};

export default ScheduleLoading;
