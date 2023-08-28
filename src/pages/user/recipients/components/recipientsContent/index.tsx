import ClientApi from '@src/types/client';
import React from 'react';
import EmptyState from '../emptyState';
import RecipientList from '../recipientList';

interface Props {
  recipients: ClientApi.Recipient[];
  handleOpenModal: () => void;
  handleOpenDetailsModal: () => void;
}

const RecipientsContent = ({ recipients, handleOpenModal, handleOpenDetailsModal }: Props) => {
  return (
    <>
      {recipients.length ? (
        <RecipientList
          handleOpenDetailsModal={handleOpenDetailsModal}
          recipients={recipients}
          handleOpenModal={handleOpenModal}
        />
      ) : (
        <EmptyState handleOpenModal={handleOpenModal} />
      )}
    </>
  );
};

export default RecipientsContent;
