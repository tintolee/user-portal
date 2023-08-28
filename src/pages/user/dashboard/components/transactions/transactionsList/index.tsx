import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const TransactionsListInner = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsListInner'*/ './TransactionsListInner')
);
const TransactionsEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsEmpty'*/ '../transactionsEmpty')
);

interface Props {
  transactions: ClientApi.Transaction[];
}

const TransactionsList = ({ transactions }: Props) => {
  return (
    <>
      {transactions.length ? (
        <TransactionsListInner transactions={transactions} />
      ) : (
        <TransactionsEmpty />
      )}
    </>
  );
};

export default TransactionsList;
