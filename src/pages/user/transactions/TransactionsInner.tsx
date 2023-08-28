import { Button } from '@sendsprint/ui-react';
import { ErrorState } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import { EmptyState, LoadingState, TransactionsContent } from './components';

interface Props {
  transactions: ClientApi.Transaction[];
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  handleOpenModal: () => void;
}

const TransactionsInner = ({
  isError,
  isLoading,
  refetch,
  transactions,
  handleOpenModal
}: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <LoadingState />}
          {!isLoading && transactions ? (
            <TransactionsContent handleOpenModal={handleOpenModal} transactions={transactions} />
          ) : null}
          {!isLoading && !transactions ? <EmptyState /> : null}
        </>
      )}
      {isError && (
        <ErrorState
          title="Error fetching transactions"
          content="An error has occurred while fetching transactions. Please try again."
          footer={<Button onClick={refetch} variant="primary" isBlock={true} label="Try again" />}
        />
      )}
    </>
  );
};

export default TransactionsInner;
