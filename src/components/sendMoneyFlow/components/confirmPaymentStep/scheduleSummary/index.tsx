import { Box, Text } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import { transformString } from '@src/utils/recurring';
import React from 'react';
import EditButton from '../../editButton';
import { TransferScheduleDataI } from '../../scheduleStep/scheduleForm';

interface TransferScheduleDetailsProps {
  transferScheduleData: TransferScheduleDataI | undefined;
  handleEdit?: () => void;
}

const ScheduleSummary: React.FC<TransferScheduleDetailsProps> = ({
  transferScheduleData,
  handleEdit
}) => {
  if (!transferScheduleData) return null;

  const onEdit = () => {
    if (!handleEdit) return;

    handleEdit();
  };

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Schedule details</Text>
        <EditButton label="Edit" onEdit={onEdit} />
      </Box>
      <Box className="ss-space-y-2">
        <Box className="ss-flex ss-justify-between ss-items-center">
          <Text variant="paragraphSmall" className="ss-text-neutral-60">
            Transfer label
          </Text>
          <Text variant="paragraphSmall" className="ss-text-neutral-60 ss-font-bold">
            {transferScheduleData?.name}
          </Text>
        </Box>
        <Box className="ss-flex ss-justify-between ss-items-center">
          <Text variant="paragraphSmall" className="ss-text-neutral-60">
            Frequency
          </Text>
          <Text variant="paragraphSmall" className="ss-text-neutral-60 ss-font-bold">
            {transferScheduleData
              ? transformString(transferScheduleData?.interval as ClientApi.RecurringIntervalI)
              : ''}
          </Text>
        </Box>
        <Box className="ss-flex ss-justify-between ss-items-center">
          <Text variant="paragraphSmall" className="ss-text-neutral-60">
            Duration
          </Text>
          <Text variant="paragraphSmall" className="ss-text-neutral-60 ss-font-bold">
            {transferScheduleData?.duration} Transfers
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleSummary;
