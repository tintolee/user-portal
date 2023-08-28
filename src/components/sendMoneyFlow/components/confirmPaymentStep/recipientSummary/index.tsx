import { Box, Text } from '@sendsprint/ui-react';
import RecipientRow from '@src/pages/user/recipients/components/recipientRow';
import ClientApi from '@src/types/client';
import React from 'react';
import EditButton from '../../editButton';

interface Props {
  selectedRecipient: ClientApi.Recipient | undefined;
  handleEdit: () => void;
}

const RecipientSummary = ({ selectedRecipient, handleEdit }: Props) => {
  if (!selectedRecipient) return null;

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Recipient</Text>
        <EditButton onEdit={handleEdit} />
      </Box>
      <Box>
        <RecipientRow
          recipient={selectedRecipient}
          disableClick
          iconShown="none"
          showBirthdayTransition={false}
        />
      </Box>
    </Box>
  );
};

export default RecipientSummary;
