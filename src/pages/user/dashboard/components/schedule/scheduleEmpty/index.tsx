import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import React from 'react';

const ScheduleEmpty = () => {
  return (
    <Box className="ss-py-10">
      <Text className="ss-font-semibold ss-mb-3" variant="paragraphLarge">
        0
      </Text>
      <Text className="ss-mb-7">
        You don’t have any recent transfer schedule. When you schedule a transfer, it shows up here.
      </Text>
    </Box>
  );
};

export default ScheduleEmpty;
