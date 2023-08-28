import { Box, Skeleton } from '@sendsprint/ui-react';
import { useLoadUserRecurringIntervals } from '@src/hooks';
import React from 'react';
import ScheduleForm, { TransferScheduleDataI } from './scheduleForm';

export interface TransferScheduleProps {
  formData?: TransferScheduleDataI;
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess: (value: TransferScheduleDataI) => void;
}

const ScheduleStep = ({ onSubmitSuccess, formData }: TransferScheduleProps) => {
  const { data: recurringIntervals, isLoading: isIntervalsLoading } =
    useLoadUserRecurringIntervals();

  return (
    <>
      {isIntervalsLoading && (
        <Box className="ss-flex ss-items-start ss-gap-8">
          <Box className="ss-space-y-5 ss-flex-1">
            <Skeleton className="ss-h-20 ss-rounded-lg" />
            <Skeleton className="ss-h-350 ss-rounded-lg" />
            <Skeleton className="ss-h-20 ss-rounded-lg" />
          </Box>
          <Box className="ss-hidden ss-w-350 xl:ss-block" />
        </Box>
      )}
      {!isIntervalsLoading && recurringIntervals && (
        <Box className="ss-flex ss-items-start ss-gap-8">
          <Box className="ss-flex-1">
            <ScheduleForm
              onSubmitSuccess={onSubmitSuccess}
              formData={formData}
              recurringIntervals={recurringIntervals}
            />
          </Box>
          <Box className="ss-hidden ss-w-350 xl:ss-block" />
        </Box>
      )}
    </>
  );
};

export default ScheduleStep;
