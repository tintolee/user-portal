import { Box, Text } from '@sendsprint/ui-react';
import { FormError } from '@src/components';
import ClientApi from '@src/types/client';
import { transformString } from '@src/utils/recurring';
import React, { useEffect, useState } from 'react';
import IntervalRow from './IntervalRow';

interface Props {
  recurringIntervals: ClientApi.RecurringIntervalObjI[] | undefined;
}

interface ExtendedRecurringObj extends ClientApi.RecurringIntervalObjI {
  transformedName: string;
  description: string;
}

const IntervalsList = ({ recurringIntervals }: Props) => {
  const [intervals, setIntervals] = useState<ExtendedRecurringObj[]>([]);

  useEffect(() => {
    if (recurringIntervals) {
      const transformedIntervals: ExtendedRecurringObj[] = recurringIntervals.map((interval) => {
        const newObj: ExtendedRecurringObj = {
          ...interval,
          description: '',
          transformedName: transformString(interval.Name)
        };

        switch (interval.Name) {
          case 'hourly':
            newObj.description = 'The transfer will be made every hour';
            break;
          case 'daily':
            newObj.description = 'The transfer will be made once a day';
            break;
          case 'weekly':
            newObj.description = 'The transfer will be made once a week';
            break;
          case 'monthly':
            newObj.description = 'The transfer will be made once a month';
            break;
          case 'yearly':
            newObj.description = 'The transfer will be made once a year';
            break;
          case 'quarterly':
            newObj.description =
              'The transfer will be made four times a year, at intervals of three months';
            break;
          case 'bi-anually':
            newObj.description = 'The transfer will be made twice a year';
            break;
          default:
            newObj.description = '';
            break;
        }

        return newObj;
      });

      setIntervals(transformedIntervals);
    }
  }, [recurringIntervals]);
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Text className="ss-text-neutral-400 ss-mb-4 ss-font-bold">
        When do you want to make this transfer?
      </Text>
      <Box className="ss-space-y-3">
        {intervals.map((interval) => (
          <IntervalRow
            key={interval.Id}
            description={interval.description}
            name="interval"
            title={interval.transformedName}
            value={interval.Name}
          />
        ))}
      </Box>
      <FormError name="interval" />
    </Box>
  );
};

export default IntervalsList;
