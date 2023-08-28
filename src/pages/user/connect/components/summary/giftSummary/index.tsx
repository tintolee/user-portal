import { Box, Text } from '@sendsprint/ui-react';
import EditButton from '@src/components/sendMoneyFlow/components/editButton';
import { State } from '../../../state';
import React from 'react';
import { format } from 'date-fns';

interface Props {
  state: State;
  handleEdit?: () => void;
}

const GiftSummary = ({ state, handleEdit }: Props) => {
  const giftInfo = state.giftInformationData;

  const onEdit = () => {
    if (!handleEdit) return;

    handleEdit();
  };

  if (!giftInfo) return null;

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Gift Information</Text>
        <EditButton label="Edit" onEdit={onEdit} />
      </Box>
      <Box className="ss-space-y-3">
        <InfoBlock label="Purpose" value={giftInfo.purpose} />
        <InfoBlock
          label="Delivery date and time"
          value={format(new Date(giftInfo.deliveryDate), 'dd/MM/yyyy hh:mm a')}
        />
      </Box>
    </Box>
  );
};

interface InfoBlockProps {
  label: string;
  value: string;
}

const InfoBlock = ({ label, value }: InfoBlockProps) => {
  return (
    <Box className="ss-bg-neutral-100 ss-py-2 ss-px-4 ss-rounded ss-flex ss-items-center ss-gap-3">
      <Box>
        <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
          {label}
        </Text>
        <Text>{value}</Text>
      </Box>
    </Box>
  );
};

export default GiftSummary;
