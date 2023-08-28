import { Box } from '@sendsprint/ui-react';
import { NoResult } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import { useFilterRecipients } from '../../hooks';
import RecipientBlock from './recipientBlock';
import RecipientHead from './recipientHead';

interface Props {
  recipients: ClientApi.Recipient[];
  handleOpenModal: () => void;
  handleOpenDetailsModal: () => void;
}

export interface ResolvedRecipientsBlockI {
  title: string;
  recipients: ClientApi.Recipient[];
}

const RecipientList = ({ handleOpenModal, recipients, handleOpenDetailsModal }: Props) => {
  const { handleSearch, searchValue, showNoResult, recipientsBlockData } = useFilterRecipients({
    recipients
  });

  return (
    <Box>
      <RecipientHead
        handleOpenModal={handleOpenModal}
        handleSearch={handleSearch}
        recipients={recipients}
        searchValue={searchValue}
      />
      <Box className="ss-flex ss-flex-col ss-gap-6">
        {recipientsBlockData.map((item) => (
          <RecipientBlock
            handleOpenDetailsModal={handleOpenDetailsModal}
            key={item.title}
            item={item}
          />
        ))}
        {showNoResult ? <NoResult /> : null}
      </Box>
    </Box>
  );
};

export default RecipientList;
