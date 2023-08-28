import { Box, Text } from '@sendsprint/ui-react';
import cs from 'classnames';

interface Props {
  status: string;
  isCompleted: 0 | 1;
}

const StatusBox = ({ status, isCompleted }: Props) => {
  const classes = cs('ss-py-1 ss-px-2 ss-rounded-full ss-bg-opacity-20 ss-w-max', {
    'ss-bg-lightBlue ss-bg-opacity-100': status.toLowerCase() === 'active' && isCompleted !== 1,
    'ss-bg-warning-100': status.toLowerCase() === 'paused' && isCompleted !== 1,
    'ss-bg-neutral-200': status.toLowerCase() === 'cancelled' && isCompleted !== 1,
    'ss-bg-success-100': isCompleted === 1
  });

  const textClasses = cs('', {
    'ss-text-darkBlue': status.toLowerCase() === 'active' && isCompleted !== 1,
    'ss-text-warning-500': status.toLowerCase() === 'paused' && isCompleted !== 1,
    'ss-text-neutral-500': status.toLowerCase() === 'cancelled' && isCompleted !== 1,
    'ss-text-success-500': isCompleted === 1
  });

  const statusText = isCompleted === 1 ? 'Completed' : status;
  return (
    <Box className={classes}>
      <Text variant="paragraphSmall" className={textClasses}>
        {statusText}
      </Text>
    </Box>
  );
};

export default StatusBox;
