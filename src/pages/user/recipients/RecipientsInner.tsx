import { Button } from '@sendsprint/ui-react';
import { ErrorState } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import { EmptyState, LoadingState, RecipientsContent } from './components';

interface Props {
  recipients: ClientApi.Recipient[];
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  handleOpenModal: () => void;
  handleOpenDetailsModal: () => void;
}

const RecipientsInner = ({
  isError,
  isLoading,
  recipients,
  refetch,
  handleOpenModal,
  handleOpenDetailsModal
}: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <LoadingState />}
          {!isLoading && recipients ? (
            <RecipientsContent
              handleOpenModal={handleOpenModal}
              recipients={recipients}
              handleOpenDetailsModal={handleOpenDetailsModal}
            />
          ) : null}
          {!isLoading && !recipients ? <EmptyState handleOpenModal={handleOpenModal} /> : null}
        </>
      )}
      {isError && (
        <ErrorState
          title="Error fetching recipients"
          content="An error has occurred while fetching recipients. Please try again."
          footer={<Button onClick={refetch} variant="primary" isBlock={true} label="Try again" />}
        />
      )}
    </>
  );
};

export default RecipientsInner;
