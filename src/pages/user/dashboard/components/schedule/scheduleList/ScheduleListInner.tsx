import Box from '@sendsprint/ui-react/dist/components/Box';
import TransferCard from '@src/pages/user/transferSchedule/components/transferCard';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  schedules: ClientApi.RecurringTransactionI[];
}

const ScheduleListInner = ({ schedules }: Props) => {
  return (
    <Box className="ss-space-y-5">
      {schedules.map((schedule) => (
        <TransferCard
          showBottomDetails={false}
          handleRetry={() => undefined}
          key={schedule.Id}
          item={schedule}
        />
      ))}
    </Box>
  );
};

export default ScheduleListInner;
