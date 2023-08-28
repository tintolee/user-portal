import { useGetTransactions } from '@src/hooks';
import { DashboardLayout } from '@src/layouts';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransactionDetails } from './components';
import TransactionsInner from './TransactionsInner';

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const txrefQuery = searchParams.get('txref');

  const { data: transactions = [], isLoading, isError, refetch } = useGetTransactions();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (txrefQuery) {
      handleOpenModal();
    }
  }, [txrefQuery]);
  return (
    <DashboardLayout pageTitle="Transactions">
      <TransactionsInner
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
        transactions={transactions}
        handleOpenModal={handleOpenModal}
      />
      <TransactionDetails isOpen={showModal} handleClose={handleCloseModal} />
    </DashboardLayout>
  );
};

export default Transactions;
