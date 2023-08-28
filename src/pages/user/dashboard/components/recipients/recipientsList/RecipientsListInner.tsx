import Box from '@sendsprint/ui-react/dist/components/Box';
import ClientApi from '@src/types/client';
import React from 'react';
import RecipientRow from '@src/pages/user/recipients/components/recipientRow';

interface Props {
  recipients: ClientApi.Recipient[];
}

const RecipientsListInner = ({ recipients }: Props) => {
  return (
    <Box>
      {recipients.map((recipient) => (
        <RecipientRow as="link" key={recipient.id} recipient={recipient} />
      ))}
    </Box>
  );
};

export default RecipientsListInner;
