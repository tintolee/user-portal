import { Box, Button, Form, FormField, Text } from '@sendsprint/ui-react';
import { BookmarkOutline, StopCircleOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import React from 'react';
import IntervalsList from './IntervalsList';
import * as yup from 'yup';
import { transferScheduleSchema } from '@src/validations';
import { TransferScheduleProps } from '..';
import { useMedia } from '@src/hooks';

interface Props extends TransferScheduleProps {
  recurringIntervals: ClientApi.RecurringIntervalObjI[] | undefined;
}

export interface TransferScheduleDataI {
  transferType: string;
  name: string;
  duration: string;
  interval: string;
}

const initialValues: TransferScheduleDataI = {
  transferType: 'recurring',
  name: '',
  duration: '',
  interval: ''
};

const validationSchema = yup.object().shape({
  transferType: transferScheduleSchema.transferType,
  name: transferScheduleSchema.name,
  duration: transferScheduleSchema.duration,
  interval: transferScheduleSchema.interval
});

const ScheduleForm = ({ recurringIntervals, onSubmitSuccess, formData }: Props) => {
  const { isMobile } = useMedia();
  return (
    <Form
      validationSchema={validationSchema}
      initialValues={formData || initialValues}
      className="ss-space-y-5"
      onSubmit={onSubmitSuccess}>
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
        <Text className="ss-text-neutral-400 ss-mb-4 ss-font-bold">
          What&apos;s this transfer for?
        </Text>
        <FormField icon={BookmarkOutline} name="name" label="Purpose of transfer" />
      </Box>
      <IntervalsList recurringIntervals={recurringIntervals} />
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
        <Text className="ss-text-neutral-400 ss-mb-4 ss-font-bold">
          When do you want this transfer to stop?
        </Text>
        <FormField
          icon={StopCircleOutline}
          name="duration"
          label={isMobile ? 'Number of transfers' : 'Number of transfers (Minimum of 2)'}
        />
      </Box>
      <Box>
        <Button isBlock type="submit" label="Continue" />
      </Box>
    </Form>
  );
};

export default ScheduleForm;
