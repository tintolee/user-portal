import { ErrorState } from '@src/components';
import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const TransactionsLoading = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsLoading'*/ '../transactionsLoading')
);
const TransactionsList = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsList'*/ '../transactionsList')
);
const TransactionsEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsEmpty'*/ '../transactionsEmpty')
);

interface Props {
  transactions: ClientApi.Transaction[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const TransactionsContent = ({ isError, isLoading, refetch, transactions }: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <TransactionsLoading />}
          {!isLoading && transactions && <TransactionsList transactions={transactions} />}
          {!isLoading && !transactions && <TransactionsEmpty />}
        </>
      )}
      {isError && (
        <ErrorState
          iconSize="small"
          errorText="Error fetching scheduled transfers"
          showRetryBtn
          retryFunc={refetch}
        />
      )}
    </>
  );
};

export default TransactionsContent;
