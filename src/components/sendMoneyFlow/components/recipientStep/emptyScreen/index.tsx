import { Box, Button, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import React from 'react';
import { emptyRecipient } from '../../../assets';

interface Props {
  handleOpenModal: () => void;
}

const RecipientEmptyState = ({ handleOpenModal }: Props) => {
  return (
    <Box>
      <Box className="ss-flex ss-flex-col ss-items-center ss-max-w-500 ss-pt-10 md:ss-pt-18 ss-pb-10 ss-mx-auto">
        <Box className="ss-mb-8 md:ss-mb-14">
          <Image alt="Empty recipient list" imgClasses="ss-max-w-300" src={emptyRecipient} />
        </Box>
        <Text variant="h5" className="ss-font-bold ss-mb-4">
          Add a Recipient
        </Text>
        <Text className="ss-text-center ss-mb-8">
          Who would you like to send money to? Add them as a recipient to get started.
        </Text>
        <Box className="ss-w-full">
          <Button label="Add A Recipient" onClick={handleOpenModal} isBlock />
        </Box>
      </Box>
    </Box>
  );
};

export default RecipientEmptyState;
