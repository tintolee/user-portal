import ClientApi from '@src/types/client';
import React from 'react';
import EmptyState from '../emptyState';
import TransactionList from '../transactionList';

interface Props {
  transactions: ClientApi.Transaction[];
  handleOpenModal: () => void;
}

const TransactionsContent = ({ transactions, handleOpenModal }: Props) => {
  return (
    <>
      {transactions.length ? (
        <TransactionList transactions={transactions} handleOpenModal={handleOpenModal} />
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default TransactionsContent;
