import { Box, ExtraInfo, Text } from '@sendsprint/ui-react';
import { format } from 'date-fns';
import { TransferBreakdownStageData } from './types';
import cs from 'classnames';

interface UpdateInfoProps extends Partial<TransferBreakdownStageData> {
  label: string;
  extraInfo?: string;
  isCurrent?: boolean;
  isFinalStage?: boolean;
}

const UpdateInfo = ({
  label,
  extraInfo,
  dateTimeISO,
  isCurrent,
  // stage,
  status,
  isFinalStage
}: UpdateInfoProps) => {
  const statusIsPending = status === 'pending';
  const statusIsFailed = status === 'failed';
  const statusIsSuccessful = status === 'successful';
  const statusInFinalState = statusIsSuccessful || statusIsFailed; // status in final state of success or fail

  const lineClasses = cs('ss-w-2 ss-h-16 ss-bg-neutral-200 ss-rounded-full', {
    'ss-animate-pulse ss-bg-success-500': statusIsPending,
    'ss-bg-error-500 ': statusIsFailed,
    'ss-bg-success-500': statusInFinalState && isFinalStage,
    'ss-bg-success-100': statusInFinalState && !isFinalStage
  });

  const timeFromDateISO = dateTimeISO ? format(new Date(dateTimeISO), 'hh:mm a') : '';
  const dateFromDateISO = dateTimeISO ? format(new Date(dateTimeISO), 'MMM dd, yyyy') : '';

  return (
    <Box className="ss-flex ss-items-center ss-gap-4">
      <Box className="ss-w-20 md:ss-w-24">
        <Text variant="paragraphSmall" className="ss-text-neutral-400 ss-text-right">
          {timeFromDateISO}
        </Text>
        <Text variant="paragraphSmall" className="ss-text-neutral-400 ss-text-right">
          {dateFromDateISO}
        </Text>
      </Box>
      <Box className={lineClasses} />
      <Box className="ss-flex ss-flex-col ss-flex-1">
        <Text
          className={cs('', {
            'ss-text-primary1-500 ss-font-bold': isCurrent,
            'ss-text-neutral-400': !isCurrent
          })}>
          {label}
        </Text>
        {extraInfo && isCurrent && <ExtraInfo extraInfo={extraInfo} />}
      </Box>
    </Box>
  );
};

export default UpdateInfo;
