import { Box, Button, Text } from '@sendsprint/ui-react';
import EditButton from '@src/components/sendMoneyFlow/components/editButton';
import ClientApi from '@src/types/client';
import React from 'react';
import RecipientCard from '../recipientCard';

type RecipientSelectedViewProps = {
  selectedRecipient: ClientApi.Recipient;
  onEdit: () => void;
  onContinue: () => void;
};

const RecipientSelectedView = ({
  onContinue,
  onEdit,
  selectedRecipient
}: RecipientSelectedViewProps) => {
  return (
    <Box>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">Who are you sending gift to?</Text>
      <Box className="ss-flex ss-items-center ss-mb-2 ss-justify-between">
        <Text variant="paragraphSmall" className="ss-text-neutral-40 ss-font-bold">
          Recipient
        </Text>
        <EditButton onEdit={onEdit} />
      </Box>
      <RecipientCard recipient={selectedRecipient} />
      <div className="ss-mt-8">
        <Button label="Continue" isBlock={true} onClick={onContinue} />
      </div>
    </Box>
  );
};

export default RecipientSelectedView;
