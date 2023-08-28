import { Box } from '@sendsprint/ui-react';
import RecipientRow from '@src/pages/user/recipients/components/recipientRow';
import ClientApi from '@src/types/client';
import React from 'react';
import EmptyRecipientSearch from './EmptyRecipientSearch';
// import RecipientRow from './RecipientRow';

interface Props {
  recipients: ClientApi.Recipient[];
  // eslint-disable-next-line no-unused-vars
  onSelectRecipient: (recipient: ClientApi.Recipient, fromForm: boolean) => void;
}

const RecipientList = ({ recipients, onSelectRecipient }: Props) => {
  if (recipients.length === 0) return <EmptyRecipientSearch />;

  const handleClick = (recipient: ClientApi.Recipient) => {
    if (onSelectRecipient) {
      onSelectRecipient(recipient, false);
    }
  };

  return (
    <Box className="ss-bg-white ss-space-y-2 ss-rounded ss-p-3 ss-py-4 md:ss-p-6">
      {recipients.length &&
        recipients.map((recipient) => (
          <RecipientRow
            key={recipient.id}
            recipient={recipient}
            onClick={() => handleClick(recipient)}
            iconShown="plus"
            showBirthdayTransition={false}
          />
        ))}
    </Box>
  );
};

export default RecipientList;
