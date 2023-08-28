import { Box, Text } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResolvedRecipientsBlockI } from '..';
import RecipientRow from '../../recipientRow';

interface Props {
  item: ResolvedRecipientsBlockI;
  handleOpenDetailsModal: () => void;
}

const RecipientBlock = ({ item, handleOpenDetailsModal }: Props) => {
  const { recipients, title } = item;
  const [, setSearchParams] = useSearchParams();

  const handleOpenRecipientModal = (recipient: ClientApi.Recipient) => {
    if (handleOpenDetailsModal) {
      setSearchParams({
        id: recipient.id.toString()
      });
      handleOpenDetailsModal();
    }
  };
  return (
    <Box>
      <Text className="ss-text-primary1-300 ss-font-bold ss-pl-3" variant="paragraphLarge">
        {title}
      </Text>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-2 ss-p-2 md:ss-p-5 ss-rounded-lg">
        {recipients.map((recipient) => (
          <RecipientRow
            key={recipient.id}
            recipient={recipient}
            onClick={() => handleOpenRecipientModal(recipient)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RecipientBlock;
