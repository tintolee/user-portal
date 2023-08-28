import { Box, Button, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import { useSearchRecipients } from '@src/hooks';
import ClientApi from '@src/types/client';
import React from 'react';
import RecipientList from './recipientList';
// eslint-disable-next-line no-unused-vars
interface Props {
  handleFormOpen: () => void;
  recipients: ClientApi.Recipient[];
  // eslint-disable-next-line no-unused-vars
  onSelectRecipient: (recipient: ClientApi.Recipient, fromForm: boolean) => void;
}

const RecipientListView = ({ handleFormOpen, recipients, onSelectRecipient }: Props) => {
  const { filteredRecipients, handleSearch, searchValue } = useSearchRecipients({ recipients });

  return (
    <Box>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">
        Who are you sending money to?
      </Text>
      <Box className="ss-flex ss-flex-col-reverse md:ss-flex-row ss-gap-4 md:ss-gap-8 ss-mb-6 ss-items-center">
        <SearchInput
          placeholder="Search for a recipient"
          value={searchValue}
          containerClasses="ss-w-full md:ss-w-auto md:ss-flex-1"
          handleChange={handleSearch}
        />
        <Button
          onClick={handleFormOpen}
          className="ss-w-full md:ss-w-auto"
          label="Add A Recipient"
        />
      </Box>
      <RecipientList onSelectRecipient={onSelectRecipient} recipients={filteredRecipients} />
    </Box>
  );
};

export default RecipientListView;
