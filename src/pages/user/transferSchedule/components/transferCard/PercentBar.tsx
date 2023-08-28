import { Box } from '@sendsprint/ui-react';
import React, { useEffect, useState } from 'react';
import cs from 'classnames';

interface Props {
  status: string;
  isCompleted: number;
  Duration: string;
  SentCount: number;
}

const PercentBar = ({ status, isCompleted, Duration, SentCount }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (SentCount && Duration) {
      const percentage = (SentCount / Number(Duration)) * 100;

      setWidth(percentage);
    }
  }, [SentCount, Duration]);
  const outerClasses = cs('ss-h-3 ss-mt-2 ss-relative ss-rounded-lg ss-bg-primary-20', {
    'ss-bg-success-200 ss-bg-opacity-20': isCompleted === 1,
    'ss-bg-neutral-300 ss-bg-opacity-20': status.toLowerCase() === 'cancelled' && isCompleted !== 1,
    'ss-bg-lightBlue ss-bg-opacity-20': status.toLowerCase() === 'active' && isCompleted !== 1,
    'ss-bg-warning-200 ss-bg-opacity-20': status.toLowerCase() === 'paused' && isCompleted !== 1
  });

  const innerClasses = cs('ss-absolute ss-left-0 ss-h-full ss-bg-primary-100 ss-rounded-lg', {
    'ss-bg-success-500': isCompleted === 1,
    'ss-bg-neutral-500': status.toLowerCase() === 'cancelled' && isCompleted !== 1,
    'ss-bg-warning-500': status.toLowerCase() === 'paused' && isCompleted !== 1,
    'ss-bg-darkBlue': status.toLowerCase() === 'active' && isCompleted !== 1
  });
  return (
    <Box className={outerClasses}>
      <Box
        className="ss-absolute ss-rounded-lg ss-w-full"
        style={{
          top: '2px',
          left: '2px',
          right: '20px',
          bottom: '2px'
        }}>
        <Box className="ss-relative ss-h-full ss-w-full">
          <Box
            className={innerClasses}
            style={{
              width: `${width}%`
            }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PercentBar;
