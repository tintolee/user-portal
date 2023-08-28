import { Box, Button, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  recipients: ClientApi.Recipient[];
  // eslint-disable-next-line no-unused-vars
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenModal: () => void;
  searchValue: string;
}

const RecipientHead = ({ handleSearch, recipients, handleOpenModal, searchValue }: Props) => {
  return (
    <Box className="ss-mb-6 md:ss-mb-14">
      <Box className="ss-flex ss-gap-3 ss-items-center ss-justify-between">
        <Box className="ss-flex ss-items-center ss-gap-3">
          <Text variant="h5" className="ss-font-bold">
            Recipients
          </Text>
          <Box className="ss-flex ss-items-center ss-justify-center ss-w-9 ss-h-9 ss-bg-primary1-50 ss-rounded-full">
            <p className="ss-font-bold">{recipients.length}</p>
          </Box>
        </Box>
        <Button label="Add" className="ss-block md:ss-hidden" onClick={handleOpenModal} />
        <Box className="ss-hidden md:ss-flex ss-items-center ss-justify-end ss-w-8/12 ss-gap-2">
          <SearchInput
            placeholder="Search for a recipient"
            inputClasses="ss-py-3"
            containerClasses="ss-min--w-220 ss-hidden xl:ss-block ss-flex-1"
            handleChange={handleSearch}
            value={searchValue}
          />
          <Button onClick={handleOpenModal} label="Add a recipient" />
        </Box>
      </Box>
      <Box className="ss-block ss-mt-6 xl:ss-hidden">
        <SearchInput
          placeholder="Search for a recipient"
          containerClasses="ss-min--w-220 ss-flex-1"
          handleChange={handleSearch}
          value={searchValue}
        />
      </Box>
    </Box>
  );
};

export default RecipientHead;
