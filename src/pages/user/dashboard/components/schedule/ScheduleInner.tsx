import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { useLoadUserRecurringTransactions } from '@src/hooks/queries/recurring';
import { Path } from '@src/navigations/routes';
import { sortScheduleData } from '@src/pages/user/transferSchedule/utils/sortScheduleData';
import ClientApi from '@src/types/client';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ScheduleContent from './scheduleContent';

const ScheduleInner = () => {
  const [slicedSchedules, setSlicedSchedules] = useState<ClientApi.RecurringTransactionI[]>([]);
  const {
    data: schedules = [],
    isLoading: schedulesLoading,
    isSuccess,
    isError,
    refetch
  } = useLoadUserRecurringTransactions();

  const memoizedSchedules = useMemo(() => schedules, [schedules]);

  useEffect(() => {
    if (memoizedSchedules?.length) {
      const slicedData = sortScheduleData(schedules).slice(0, 3);
      setSlicedSchedules(slicedData);
    }
  }, [memoizedSchedules]);

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-mb-3 ss-justify-between">
        <Text className="ss-font-semibold" variant="paragraphLarge">
          Transfer Schedule
        </Text>
        {isSuccess && slicedSchedules.length ? (
          <Link
            to={Path.TransferSchedule}
            className="ss-text-primary1-500 ss-text-paragraph-small ss-underline">
            See more
          </Link>
        ) : null}
      </Box>
      <Box>
        <ScheduleContent
          isError={isError}
          isLoading={schedulesLoading}
          refetch={refetch}
          schedules={slicedSchedules}
        />
      </Box>
    </Box>
  );
};

export default ScheduleInner;
